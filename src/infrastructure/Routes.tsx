import * as React from 'react';
import {MemoryRouter, Route, Switch} from 'react-router-dom';
import Home from '../pages/HomePage';

const Routes = () => (
    <MemoryRouter>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </MemoryRouter>
);

export default Routes;