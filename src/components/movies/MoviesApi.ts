import {IMovie} from './MoviesStore';

declare const chrome: any;

export const getMovies = (startDate: Date, endDate: Date): Promise<{response: IMovie[], url: string, key: string}> => {
    const params = {
        start: startDate.toISOString(),
        end: endDate.toISOString()
    };
    const endpoint = `calendar?start=${params.start}&end=${params.end}`;


    return new Promise<{response: IMovie[], url: string, key: string}>((resolve, reject) => {
        chrome.runtime.sendMessage({
            media: 'radarr',
            endpoint: endpoint
        }, (response: {response: IMovie[], url: string, key: string, error?: any}) => {
            if (!response.error) {
                resolve(response);
            } else {
                reject(response.error);
            }
        });
    });
}