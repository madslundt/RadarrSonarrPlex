import { FooterStore } from '../../infrastructure/Footer';
import * as React from 'react'
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import {observable, useStrict, action} from "mobx";
import CounterStore from "./CounterStore";

@inject('footerStore') @observer
export default class Counter extends React.Component<{ store: CounterStore, footerStore?: FooterStore }, void> {
    private counterStore: CounterStore;
    private footerStore: FooterStore;

    constructor(props: { store: CounterStore, footerStore: FooterStore }) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);

        this.counterStore = props.store;
        this.footerStore  = props.footerStore;
    }

    increment() {
        this.counterStore.increment();
        this.footerStore.setShowText(true);
    }
    decrement() {
        this.counterStore.decrement();
        this.footerStore.setShowText(false);
    }

    render() {
        const { number } = this.counterStore;

        return (
            <div>
                <p>Counter: {number}</p>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        );
    }
}