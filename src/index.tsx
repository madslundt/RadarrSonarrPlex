import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import App from './infrastructure/App';
import Stores from './infrastructure/Stores';
import registerServiceWorker from './infrastructure/registerServiceWorker';
import './infrastructure/common/reset.scss';


render(
    <Provider { ...Stores }>
        <App />
    </Provider>,
    document.getElementById('app') as HTMLElement
);
registerServiceWorker();
