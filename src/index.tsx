import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import App from './infrastructure/App';
import Stores from './infrastructure/Stores';
import './infrastructure/common/reset.scss';


render(
    <Provider { ...Stores }>
        <App />
    </Provider>,
    document.getElementById('app')
);
