import Storage from './infrastructure/Storage';

const urlRegex = /.+_url/;
const httpRegex = /https?:\/\//;

Storage.load('options').then(options => {
    const inputs = {
        radarr_url: document.querySelector('#radarr_url'),
        radarr_base: document.querySelector('#radarr_base'),
        radarr_key: document.querySelector('#radarr_key'),
        sonarr_url: document.querySelector('#sonarr_url'),
        sonarr_base: document.querySelector('#sonarr_base'),
        sonarr_key: document.querySelector('#sonarr_key')
    };

    const submit: any = document.querySelector('#save');
    const status: any = document.querySelector('#status');

    const setInputs = (options: any) => {
        for (const name in inputs) {
            if (options.api[name]) {
                inputs[name].value = options.api[name];
            }
        }
    }
    setInputs(options);

    const correctUrl = (url: string) => {
        let result = url;
        if (url.substr(-1) !== "/") {
            result += '/';
        }

        if (url.indexOf('/api/') === -1) {
            result += 'api/';
        }

        if (!httpRegex.test(url)) {
            result = 'http://' + result;
        }

        return result;
    }

    const plexUrlList: any = document.querySelector('#plex-url-list');
    const plexUrls = {
        list: options.plexUrls,
        add: (url: string) => {
            plexUrls.list.push(url);
            plexUrls.update();
        },
        remove: (url: string) => {
            const index = plexUrls.list.indexOf(url);
            if(index > -1) {
                plexUrls.list.splice(index, 1);
            }
            plexUrls.update();
        },
        update: () => {
            while(plexUrlList.hasChildNodes()) {
                plexUrlList.removeChild(plexUrlList.lastChild);
            }
            for(let u in plexUrls.list) {
                const item = document.createElement('li');
                item.textContent = options.plexUrls[u];
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'x';
                removeBtn.addEventListener('click', plexUrls.remove.bind(null, plexUrls.list[u]));
                item.appendChild(removeBtn);
                plexUrlList.appendChild(item);
            }
        }
    };
    plexUrls.update();

    const newPlexUrl: any = document.querySelector('#new-plex-url');
    const plexUrlBtn: any = document.querySelector('#add-plex-url');
    plexUrlBtn.addEventListener('click', () => {
        plexUrls.add(newPlexUrl.value);
        newPlexUrl.value = '';
    });

    if (!submit) {
        return;
    }


    submit.addEventListener('click', (e: any) => {
        for (const name in inputs) {
            let value = inputs[name].value;
            if (urlRegex.test(name)) {
                value = correctUrl(value);
            }

            options.api[name] = value;
        }

        Storage.save('options', options).then(() => {
            status.textContent = 'Options saved.';

            setInputs(options);

            // window.setTimeout(() => {
            //     tick.remove();
            // }, 1000);
        });
    });
    document.body.appendChild(submit);
});