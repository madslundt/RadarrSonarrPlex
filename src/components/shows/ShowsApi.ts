import {IShow} from './ShowsStore';

declare const chrome: any;

export const getShows = (startDate: Date, endDate: Date): Promise<{response: IShow[], url: string, key: string}> => {
    const params = {
        start: startDate.toISOString(),
        end: endDate.toISOString()
    };

    const endpoint = `calendar?start=${params.start}&end=${params.end}`;

    return new Promise<{response: IShow[], url: string, key: string}>((resolve, reject) => {
        chrome.runtime.sendMessage({
            media: 'sonarr',
            endpoint: endpoint
        }, (response: {response: IShow[], url: string, key: string, error?: any}) => {
            if (!response.error) {
                resolve(response);
            } else {
                reject(response.error);
            }
        });
    });
}