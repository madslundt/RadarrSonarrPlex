import {IShow} from './ShowsStore';
import {IResponse} from './ShowsApi';
import delay from '../../infrastructure/api/apiMockDelay';

const showsMockData: IShow[] = require('./ShowsMockData.json');

export const getShows = (startDate : Date, endDate : Date) : Promise<IResponse> => {
    startDate.setUTCFullYear(0);
    endDate.setUTCFullYear(0);

    const result = showsMockData.filter(show => {
        const date = new Date(show.airDateUtc);
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