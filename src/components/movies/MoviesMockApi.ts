import {IMovie} from './MoviesStore';
import {IResponse} from './MoviesApi';
import delay from '../../infrastructure/api/apiMockDelay';

const moviesMockData: IMovie[] = require('./MoviesMockData.json');

export const getMovies = (startDate: Date, endDate: Date): Promise<IResponse> => {
    startDate.setUTCFullYear(0);
    endDate.setUTCFullYear(0);

    const result = moviesMockData.filter(movie => {
        const date = new Date(movie.inCinemas);
        date.setUTCFullYear(0);

        return date >= startDate && date <= endDate;
    });

    return new Promise<IResponse>(resolve => {
        setTimeout(() => {
            resolve({
                response: result,
                url: '',
                key: ''
            });
        }, delay);
    });
}