import {IShow} from './ShowsStore';
import delay from '../../infrastructure/api/apiMockDelay';

const showsMockData: IShow[] = require('./ShowsMockData.json');

export const getShows = (startDate : Date, endDate : Date) : Promise < IShow[] > => {
    startDate.setUTCFullYear(0);
    endDate.setUTCFullYear(0);

    // const start = startDate.toISOString(); const end   = endDate.toISOString();

    const result = showsMockData.filter(show => {
        const date = new Date(show.airDateUtc);
        date.setUTCFullYear(0);

        return date >= startDate && date <= endDate;
    });

    return new Promise<IShow[]>(resolve => {
        setTimeout(() => {
            resolve(result);
        }, delay);
    });
}