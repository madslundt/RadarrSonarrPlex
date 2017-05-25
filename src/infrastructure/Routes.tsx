import * as React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import NotFound from '../pages/NotFoundPage';
import Counter from '../pages/CounterPage';
import Profile from '../pages/ProfilePage';
import Switch from './Switch';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Counter} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;