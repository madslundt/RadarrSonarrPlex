declare const chrome: any;

const options = {
    api: {
        radarr_url: 'http://localhost:7878',
        radarr_key: '',

        sonarr_url: 'http://localhost:8989',
        sonarr_key: ''
    },
    plexUrls: []
}

const Storage = {
    load: (key: string) => {
        return new Promise<any>(resolve => {
            chrome.storage.sync.get(key, (items: any) => {
                let value;
                if (items && items[key]) {
                    value = items[key];
                } else {
                    value = items;
                }

                if (key === 'options') {
                    Object.assign(options, value);
                    resolve(options);
                } else {
                    resolve(value);
                }
            });
        });
    },
    save: (key: string, value: any) => {
        return new Promise((resolve: any) => {
            chrome.storage.sync.set({[key]: value}, () => {
                resolve(value);
            });
        });
    },
    get: () => {
        return options;
    }
};

export default Storage;