import {useStrict, observable, action, computed} from 'mobx';
import ApiStatus from '../../infrastructure/api/apiStatus';
import {getStartDate, getEndDate} from "../topbar/TopbarStore";
// import { getMovies } from './MoviesApi';
import { getMovies } from './MoviesMockApi';
export const MOVIES_STORE = 'MOVIES_STORE';

useStrict(true);
export default class MoviesStore {
    @observable private _movies: { [key: string]: IMovie[] } = {};
    @observable private _apiStatus: ApiStatus;
    @observable private _error: any;
    @observable private _monthOffset: number = 0;
    @observable private _prefetching: boolean = false;

    constructor() {
        this.fetchMovies();
    }

    @computed
    get movies(): IMovie[] {
        return this._movies[this._monthOffset] || [];
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
    fetchMovies() {
        const startDate: Date = getStartDate(this._monthOffset);
        const endDate: Date = getEndDate(this._monthOffset);

        this._setApiStatus(ApiStatus.Request);
        getMovies(startDate, endDate).then(response => {
            this._setMovies(response.response, response.url, response.key);
            this._setApiStatus(ApiStatus.Success);
        }, (error: any) => {
            this._setError(error);
            this._setApiStatus(ApiStatus.Error);
        });

        this._prefetchMovies();
    }

    @action
    private _prefetchMovies() {
        const monthOffset: number = this._monthOffset + 1;

        if (!this._movies[monthOffset]) {
            const startDate: Date = getStartDate(monthOffset);
            const endDate: Date = getEndDate(monthOffset);

            this._setPrefetching(true);
            getMovies(startDate, endDate).then(response => {
                this._setPrefetching(false);
                this._setMovies(response.response, response.url, response.key, monthOffset);
            }, (error: any) => {
                this._setPrefetching(false);
            });
        }
    }

    @action
    setMonthOffset(monthOffset: number) {
        this._monthOffset = monthOffset;
        if (!this._movies[monthOffset]) {
            this.fetchMovies();
        }
        this._prefetchMovies();
    }


    @action
    private _setMovies(movies: IMovie[], url: string, key: string, monthOffset?: number) {
        if (!movies) {
            return;
        }

        const result = movies.sort((a, b) => {
            const aDate = new Date(a.inCinemas);
            const bDate = new Date(b.inCinemas);

            if (a.status === 'released') {
                aDate.setMonth(aDate.getMonth() - 2);
            }
            if (a.downloaded) {
                aDate.setMonth(aDate.getMonth() - 1);
            }
            if (b.status === 'released') {
                bDate.setMonth(bDate.getMonth() - 2);
            }
            if (b.downloaded) {
                bDate.setMonth(bDate.getMonth() - 1);
            }

            if ((a.status === b.status) ||
                (a.downloaded === b.downloaded)) {
                return aDate.getTime() - bDate.getTime();
            } else if (a.status === 'released' || a.downloaded) {
                return -1;
            } else if (aDate < bDate) {
                return 1;
            } else {
                return 2;
            }
        });

        for (const movie of movies) {
            updateImages(url, key, movie.images);
        }

        this._movies[monthOffset || this._monthOffset] = result;
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

export interface Image {
    coverType: string;
    url: string;
}

export interface Ratings {
    votes: number;
    value: number;
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

export interface MediaInfo {
    videoCodec: string;
    videoBitrate: number;
    videoBitDepth: number;
    width: number;
    height: number;
    audioFormat: string;
    audioBitrate: number;
    runTime: string;
    audioStreamCount: number;
    audioChannels: number;
    audioChannelPositions: string;
    audioChannelPositionsText: string;
    audioProfile: string;
    videoFps: number;
    audioLanguages: string;
    subtitles: string;
    scanType: string;
    schemaRevision: number;
}

export interface MovieFile {
    movieId: number;
    relativePath: string;
    size: any;
    dateAdded: string;
    releaseGroup: string;
    quality: Quality;
    mediaInfo: MediaInfo;
    id: number;
    edition: string;
}

export interface IMovie {
    title: string;
    sortTitle: string;
    sizeOnDisk: any;
    status: string;
    overview: string;
    inCinemas: string;
    physicalRelease: string;
    images: Image[];
    website: string;
    downloaded: boolean;
    year: number;
    hasFile: boolean;
    youTubeTrailerId: string;
    studio: string;
    path: string;
    profileId: number;
    pathState: string;
    monitored: boolean;
    minimumAvailability: string;
    isAvailable: boolean;
    folderName: string;
    runtime: number;
    lastInfoSync: string;
    cleanTitle: string;
    imdbId: string;
    tmdbId: number;
    titleSlug: string;
    genres: string[];
    tags: any[];
    added: string;
    ratings: Ratings;
    alternativeTitles: string[];
    movieFile: MovieFile;
    qualityProfileId: number;
    id: number;
}