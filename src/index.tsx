import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import App from './infrastructure/App';
import Stores from './infrastructure/Stores';
import insertIntoPlexNavbar, {NAVBAR_HREF} from './infrastructure/Navbar';
import Storage from './infrastructure/Storage';

const contentId = 'content';

const renderPage = () => {
    const content = document.getElementById(contentId);
    if (window.location.hash === NAVBAR_HREF) {
        render(
            <Provider { ...Stores }>
                <App />
            </Provider>,
            content as HTMLElement
        );

        if (!content) {
            return;
        }

        const row: any = content.querySelector('.row-padded');

        if (!row) {
            return;
        }

        row.style.marginTop = 0;
    }
}

window.onhashchange = () => {
    insertIntoPlexNavbar();
    renderPage();
};

Storage.load('options').then(() => {
    insertIntoPlexNavbar();
    renderPage();
});

(function() {
    insertIntoPlexNavbar();
    renderPage();
});
