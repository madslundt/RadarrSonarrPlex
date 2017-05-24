import * as React from 'react'
import {FooterStore, FOOTER_STORE} from '../../infrastructure/Footer';
import { inject, observer } from "mobx-react";
import CounterStore from "./CounterStore";

interface IProps {
    store: CounterStore
}

@inject(FOOTER_STORE) @observer
export default class Counter extends React.Component<IProps, void> {
    private CounterStore: CounterStore;
    private FooterStore: FooterStore;

    constructor(props: IProps & {FOOTER_STORE: FooterStore}) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);

        this.CounterStore = props.store;
        this.FooterStore  = props[FOOTER_STORE];
    }

    increment() {
        this.CounterStore.increment();
        this.FooterStore.setShowText(true);
    }
    decrement() {
        this.CounterStore.decrement();
        this.FooterStore.setShowText(false);
    }

    render() {
        const { number } = this.CounterStore;

        return (
            <div>
                <p>Counter: {number}</p>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        );
    }
}