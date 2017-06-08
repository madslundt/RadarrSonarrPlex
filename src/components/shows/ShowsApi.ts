import {IShow} from './ShowsStore';

declare const chrome: any;

export interface IResponse {
    response: IShow[];
    url: string;
    key: string;
    error?: any;
}

export const getShows = (startDate: Date, endDate: Date): Promise<IResponse> => {
    const params = {
        start: startDate.toISOString(),
        end: endDate.toISOString()
    };

    const endpoint = `calendar?start=${params.start}&end=${params.end}`;

    return new Promise<IResponse>((resolve, reject) => {
        chrome.runtime.sendMessage({
            media: 'sonarr',
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