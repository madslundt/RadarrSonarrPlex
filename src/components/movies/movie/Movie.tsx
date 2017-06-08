import * as React from 'react';
import Poster from '../../poster/Poster';
import { IMovie } from '../MoviesStore';
import {MediaInfo} from '../../media/MediaStyles';
import * as moment from 'moment';
import * as momentTZ from 'moment-timezone';

interface IProps {
    movie: IMovie;
}

const Movie = (props: IProps) => {
    const { movie } = props;

    let content;
    if (hasBeenShown(movie.inCinemas)) {
        content = 'In theaters';
    } else {
        content = getHumanTime(movie.inCinemas);
    }

    return (
        <div>
            <Poster
                isAvailable={false}
                status={movie.status}
                images={movie.images}
                downloaded={movie.downloaded}
                content={content}
            />
            <MediaInfo>
                <p className="title movie-title">
                    {movie.title}
                </p>
            </MediaInfo>
        </div>
    );
};

const getHumanTime = (dateString: string) => {
    const date = moment(dateString);

    if (date.day() === moment().day()) {
        return 'Theaters today';
    } else if (moment().diff(date, 'month') >= 0) {
        return `Theaters ${date.fromNow()}`;
    } else {
        return date.format('dddd D.');
    }
};

const hasBeenShown = (dateString: string): boolean => {
    const date = momentTZ.tz(dateString, momentTZ.tz.guess());
    const result = moment().isSameOrAfter(date);

    return result;
}

export default Movie;