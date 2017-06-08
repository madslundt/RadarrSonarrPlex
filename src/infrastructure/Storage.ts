declare const chrome: any;

const options = {
    api: {
        radarr_url: 'http://192.168.0.30:7878/api/',
        radarr_base: '',
        radarr_key: '',

        sonarr_url: 'http://192.168.0.30:8989/api/',
        sonarr_base: '',
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