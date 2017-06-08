import {IMovie} from './MoviesStore';

declare const chrome: any;

export interface IResponse {
    response: IMovie[];
    url: string;
    key: string;
    error?: any;
}

export const getMovies = (startDate: Date, endDate: Date): Promise<IResponse> => {
    const params = {
        start: startDate.toISOString(),
        end: endDate.toISOString()
    };
    const endpoint = `calendar?start=${params.start}&end=${params.end}`;


    return new Promise<IResponse>((resolve, reject) => {
        chrome.runtime.sendMessage({
            media: 'radarr',
            endpoint: endpoint
        }, (response: IResponse) => {
            if (!response.error) {
                resolve(response);
            } else {
                reject(response.error);
            }
        });
    });
}