import * as React from 'react';
import Counter from '../features/counter/Counter';
import {observable} from "mobx";
import CounterStore from "../features/counter/CounterStore";
import DevTools from 'mobx-react-devtools';
import { random } from 'lodash'; // todo

const counterStore = observable(new CounterStore);
const counterStore2 = observable(new CounterStore(random(0, 100)));

const CounterPage = () => (
    <div>
        <Counter store={counterStore} />
        <Counter store={counterStore} />
        <Counter store={counterStore2} />

        <DevTools />
    </div>
);

export default CounterPage;
