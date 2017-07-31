import * as React from 'react'
import { inject, observer } from "mobx-react";
import TopbarStore, { TOPBAR_STORE } from "./TopbarStore";
import {Button} from "../media/MediaStyles";
import styled from 'styled-components';

@inject(TOPBAR_STORE) @observer
class Topbar extends React.Component<{}, {}> {
    private TopbarStore: TopbarStore;

    constructor(props: { TOPBAR_STORE: TopbarStore }) {
        super(props);

        this.nextMonth = this.nextMonth.bind(this);
        this.previousMonth = this.previousMonth.bind(this);

        this.TopbarStore  = props[TOPBAR_STORE];
    }

    nextMonth() {
        this.TopbarStore.nextMonth();
    }
    previousMonth() {
        this.TopbarStore.previousMonth();
    }

    render() {
        return (
            <Nav>
                <Button className="btn btn-sm btn-default" onClick={this.previousMonth}>Previous month</Button>
                <div>
                    <Month>{this.TopbarStore.currentMonth}</Month>
                    <Year>{this.TopbarStore.currentYear}</Year>
                </div>
                <Button className="btn btn-sm btn-default" onClick={this.nextMonth}>Next month</Button>
            </Nav>
        );
    }
}

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
`;
const Month = styled.div`
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 26px;
    text-align: center;
`;
const Year = styled.div`
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 14px;
    text-align: center;
`;


export default Topbar;