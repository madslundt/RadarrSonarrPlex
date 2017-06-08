import {useStrict, observable, action, computed} from 'mobx';
import ApiStatus from '../../infrastructure/api/apiStatus';
// import { getShows } from './ShowsMockApi';
import { getShows } from './ShowsApi';
import {getStartDate, getEndDate} from "../topbar/TopbarStore";
import * as moment from 'moment';
import * as momentTZ from 'moment-timezone';

export const SHOWS_STORE = 'SHOWS_STORE';

useStrict(true);
export default class ShowsStore {
    @observable private _shows: { [key: string]: IShow[] } = {};
    @observable private _apiStatus: ApiStatus;
    @observable private _error: any;
    @observable private _monthOffset: number = 0;
    @observable private _prefetching: boolean = false;

    constructor() {
        this.fetchShows();
    }

    @computed
    get shows(): IShow[] {
        return this._shows[this._monthOffset];
    }
    @computed
    get apiStatus() {
        return this._apiStatus;
    }
    @computed
    get error() {
        return this._error;
    }

    @action
    fetchShows() {
        const startDate: Date = getStartDate(this._monthOffset);
        const endDate: Date = getEndDate(this._monthOffset);

        if (this._apiStatus !== ApiStatus.Request && !this._prefetching) {
            this._setApiStatus(ApiStatus.Request);
            getShows(startDate, endDate).then(response => {
                this._setShows(response.response, response.url, response.key);
                this._setApiStatus(ApiStatus.Success);
            }, (error: any) => {
                this._setError(error);
                this._setApiStatus(ApiStatus.Error);
            });
        }

        this._prefetchShows();
    }

    @action
    private _prefetchShows() {
        const monthOffset: number = this._monthOffset + 1;

        if (!this._shows[monthOffset]) {
            const startDate: Date = getStartDate(monthOffset);
            const endDate: Date = getEndDate(monthOffset);

            this._setPrefetching(true);
            getShows(startDate, endDate).then(response => {
                this._setPrefetching(false);
                this._setShows(response.response, response.url, response.key, monthOffset);
            }, (error: any) => {
                this._setPrefetching(false);
            });
        }
    }

    @action
    setMonthOffset(monthOffset: number) {
        this._monthOffset = monthOffset;
        if (!this._shows[monthOffset]) {
            this.fetchShows();
        }
        this._prefetchShows();
    }

    @action
    private _filterShows(shows: IShow[]) {
        let result: IShow[] = [];
        let addedNonAvailableShowIds: { [key: string]: boolean } = {};

        shows = shows.sort((a, b) => new Date(a.airDateUtc).getTime() - new Date(b.airDateUtc).getTime());

        for (const show of shows) {
            const available: boolean = isAvailable(show.airDateUtc);
            if (!available && addedNonAvailableShowIds[show.seriesId]) {
                continue;
            }
            if (!available) {
                addedNonAvailableShowIds[show.seriesId] = true;
            }
            result.push(show);
        }

        return result;
    }

    @action
    private _setShows(shows: IShow[], url: string, key: string,  monthOffset?: number) {
        if (shows) {
            for (const show of shows) {
                updateImages(url, key, show.series.images);
            }
            this._shows[monthOffset || this._monthOffset] = this._filterShows(shows);
        }
    }

    @action
    private _setApiStatus(status: ApiStatus) {
        this._apiStatus = status;
    }

    @action
    private _setError(error: any) {
        this._error = error;
    }

    @action
    private _setPrefetching(fetching: boolean) {
        this._prefetching = fetching;
    }
}

const updateImages = (url: string, key: string, images: any[]) => {
    const httpRegex = /https?:\/\//;
    for (const image of images) {
        if (!httpRegex.test(image.url)) {
            image.url = `${url}${image.url.substr(1)}`;
            image.url += (image.url.indexOf('?') !== -1 ? '&' : '?') + `apikey=${key}`;
        }
    }
}

export const isAvailable = (dateString: string): boolean => {
    const date = momentTZ.tz(dateString, momentTZ.tz.guess());
    const result = moment().isSameOrAfter(date);

    return result;
}

export interface Quality2 {
    id: number;
    name: string;
}

export interface Revision {
    version: number;
    real: number;
}

export interface Quality {
    quality: Quality2;
    revision: Revision;
}

export interface EpisodeFile {
    seriesId: number;
    seasonNumber: number;
    relativePath: string;
    path: string;
    size: any;
    dateAdded: string;
    sceneName: string;
    quality: Quality;
    qualityCutoffNotMet: boolean;
    id: number;
}

export interface Image {
    coverType: string;
    url: string;
}

export interface Season {
    seasonNumber: number;
    monitored: boolean;
}

export interface Ratings {
    votes: number;
    value: number;
}

export interface Series {
    title: string;
    sortTitle: string;
    seasonCount: number;
    status: string;
    overview: string;
    network: string;
    airTime: string;
    images: Image[];
    seasons: Season[];
    year: number;
    path: string;
    profileId: number;
    seasonFolder: boolean;
    monitored: boolean;
    useSceneNumbering: boolean;
    runtime: number;
    tvdbId: number;
    tvRageId: number;
    tvMazeId: number;
    firstAired: string;
    lastInfoSync: string;
    seriesType: string;
    cleanTitle: string;
    imdbId: string;
    titleSlug: string;
    genres: string[];
    tags: any[];
    added: string;
    ratings: Ratings;
    qualityProfileId: number;
    id: number;
    certification: string;
}

export interface IShow {
    seriesId: number;
    episodeFileId: number;
    seasonNumber: number;
    episodeNumber: number;
    title: string;
    airDate: string;
    airDateUtc: string;
    overview: string;
    episodeFile: EpisodeFile;
    hasFile: boolean;
    monitored: boolean;
    unverifiedSceneNumbering: boolean;
    series: Series;
    id: number;
    absoluteEpisodeNumber?: number;
    sceneAbsoluteEpisodeNumber?: number;
    sceneEpisodeNumber?: number;
    sceneSeasonNumber?: number;
}