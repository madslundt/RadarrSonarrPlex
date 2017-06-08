import Storage from './infrastructure/Storage';

declare const chrome: any;

chrome.tabs.onUpdated.addListener((tabId: string, changeInfo: any, tab: any) => {
    Storage.load('options').then(options => {
        const isInUserList = (url: string) => {
            for(let u in options.plexUrls) {
                if(url.indexOf(options.plexUrls[u]) > -1) {
                    return true;
                }
            }

            return false;
        };

        if(changeInfo.status == 'complete' && isInUserList(tab.url)) {
            chrome.tabs.executeScript(tabId, { file: 'main.js' });
        }
    });
});

chrome.runtime.onMessage.addListener((request: any, sender: any, sendResponse: any) => {
    if (request.options) {
        return chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
    }



    Storage.load('options').then(options => {
        let url: string = '';
        let key: string = '';

        if (!options || !Object.keys(options).length) {
            sendResponse({error: 'Options has not been defined', options: options});
        } else if (!request || !request.media) {
            sendResponse({error: 'Media has to be specified'});
        } else if (!request.endpoint) {
            sendResponse({error: 'Endpoint has to be specified'});
        } else if (request.media.toLowerCase() === 'sonarr') {
            url = options.api.sonarr_url;
            key = options.api.sonarr_key;
        } else if (request.media.toLowerCase() === 'radarr') {
            url = options.api.radarr_url;
            key = options.api.radarr_key;
        } else {
            sendResponse({error: 'Media unknown'});
        }


        if (url && key) {
            fetch(url + request.endpoint, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-Api-Key': key
                })
            }).then(response => response.json()).then(response => {
                sendResponse({ response, url, key });
            }).catch(error => {
                sendResponse({ error });
            });
        } else if (!url) {
            sendResponse({error: `Empty url`});
        } else {
            sendResponse({error: `Empty key`});
        }
    });

    return true;
});

// Open options page on first install
chrome.runtime.onInstalled.addListener((details: any) => {
    if (details.reason == 'install') {
        chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
    }
});
