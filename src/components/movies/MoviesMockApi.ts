import {IMovie} from './MoviesStore';
import delay from '../../infrastructure/api/apiMockDelay';

const moviesMockData: IMovie[] = require('./MoviesMockData.json');

export const getMovies = (startDate: Date, endDate: Date): Promise <IMovie[]> => {
    startDate.setUTCFullYear(0);
    endDate.setUTCFullYear(0);

    // const start = startDate.toISOString(); const end   = endDate.toISOString();

    const result = moviesMockData.filter(movie => {
        const date = new Date(movie.inCinemas);
        date.setUTCFullYear(0);

        return date >= startDate && date <= endDate;
    });

    return new Promise<IMovie[]> (resolve => {
        setTimeout(() => {
            resolve(result);
        }, delay);
    });
}