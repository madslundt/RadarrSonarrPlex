import * as React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import Home from '../pages/HomePage';
import Switch from './Switch';

const Routes = () => (
    <MemoryRouter>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </MemoryRouter>
);

export default Routes;