import {getOptions, setOptions} from './infrastructure/Storage';

const urlRegex = /.+_url/;
const httpRegex = /https?:\/\//;

getOptions().then(options => {
    const inputs: any = {
        radarr_enabled: document.querySelector('#radarr_enabled'),
        radarr_url: document.querySelector('#radarr_url'),
        radarr_key: document.querySelector('#radarr_key'),

        sonarr_enabled: document.querySelector('#sonarr_enabled'),
        sonarr_url: document.querySelector('#sonarr_url'),
        sonarr_key: document.querySelector('#sonarr_key')
    };

    const radarr_details: any = document.querySelector('.container.radarr .input-details');
    const sonarr_details: any = document.querySelector('.container.sonarr .input-details');

    const submit: any = document.querySelector('#save');
    const status: any = document.querySelector('#status');

    const toggleDetails = () => {
        if (!inputs.radarr_enabled || !inputs.radarr_enabled.checked) {
            radarr_details.style.display = 'none';
        } else {
            radarr_details.style.display = 'block';
        }
        if (!inputs.sonarr_enabled || !inputs.sonarr_enabled.checked) {
            sonarr_details.style.display = 'none';
        } else {
            sonarr_details.style.display = 'block';
        }
    }

    const setInputs = (options: any) => {
        for (const name in inputs) {
            if (options.api[name]) {
                if (name.indexOf('_enabled') !== -1) {
                    inputs[name].checked = options.api[name];
                } else {
                    inputs[name].value = options.api[name];
                }
            }
        }

        toggleDetails();
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

    inputs.sonarr_enabled.addEventListener('click', (e: any) => {
        toggleDetails();
    });
    inputs.radarr_enabled.addEventListener('click', (e: any) => {
        toggleDetails();
    });


    submit.addEventListener('click', (e: any) => {
        for (const name in inputs) {
            let value;
            if (name.indexOf('_enabled') !== -1) {
                value = inputs[name].checked;
            } else {
                value = inputs[name].value;
            }
            if (urlRegex.test(name)) {
                value = correctUrl(value);
            }

            options.api[name] = value;
        }

        setOptions(options).then(() => {
            status.textContent = 'Options saved.';

            setInputs(options);

            // window.setTimeout(() => {
            //     tick.remove();
            // }, 1000);
        });
    });
    document.body.appendChild(submit);
});