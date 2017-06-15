import {IFilter} from "../components/topbar/Filter";

declare const chrome : any;

const options = {
    api: {
        radarr_url: 'http://localhost:7878',
        radarr_key: '',
        radarr_enabled: true,

        sonarr_url: 'http://localhost:8989',
        sonarr_key: '',
        sonarr_enabled: true
    },
    plexUrls: <string[]>[]
}

const filter: IFilter[] = [
    {
        id: 1,
        name: 'In plex',
        active: false
    },
    {
        id: 2,
        name: 'Available',
        active: true
    },
    {
        id: 3,
        name: 'Coming',
        active: true
    }
];

const ChromeStorage = {
    load: (key: string) => {
        return new Promise<any>(resolve => {
            chrome.storage.sync.get(key, (items: any) => {
                let value;
                if (items && items[key]) {
                    value = items[key];
                } else {
                    value = items;
                }

                resolve(value);
            });
        });
    },
    save: (key: string, value: any) => {
        return new Promise((resolve: any) => {
            chrome.storage.sync.set({[key]: value}, () => {
                resolve(value);
            });
        });
    }
};

const OPTIONS_CHROME_STORE = 'options';
export const getOptions = () => new Promise<typeof options>(resolve => {
    if (process.env.NODE_ENV === 'web') {
        resolve(options);
    } else {
        ChromeStorage.load(OPTIONS_CHROME_STORE).then((value: typeof options) => {
            Object.assign(options, value);
            resolve(options);
        });
    }
});
export const setOptions = (newOptions: typeof options) => new Promise<typeof options>((resolve: any) => {
    if (process.env.NODE_ENV !== 'web') {
        ChromeStorage.save(OPTIONS_CHROME_STORE, newOptions).then(() => {
            resolve(newOptions);
        });
    }
});

const FILTER_CHROME_STORE = 'filter';
export const getFilter = () => new Promise<IFilter[]>(resolve => {
    if (process.env.NODE_ENV === 'web') {
        resolve(filter);
    } else {
        ChromeStorage.load(FILTER_CHROME_STORE).then((value: IFilter[]) => {
            Object.assign(filter, value);
            resolve(filter);
        });
    }
});
export const setFilter = (newFilter: IFilter[]) => new Promise<IFilter[]>((resolve: any) => {
    if (process.env.NODE_ENV !== 'web') {
        ChromeStorage.save(OPTIONS_CHROME_STORE, newFilter).then(() => {
            resolve(newFilter);
        });
    }
});