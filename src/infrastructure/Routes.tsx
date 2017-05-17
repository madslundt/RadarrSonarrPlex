import * as React from 'react';
import {Router, Route, Switch} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import NotFoundPage from './404';
import Counter from '../pages/CounterPage';

const history = createBrowserHistory()

const Routes = () => (
    <Router history={history}>
        {/*<Switch>
            <Route exact path="/" component={Counter} />
            <Route component={NotFoundPage}/>
        </Switch>*/}
    </Router>
);

export default Routes;
