import * as React from 'react';
import styled from 'styled-components';
import {useStrict, observable, action} from "mobx";
import {inject, observer} from "mobx-react";

const Container = styled.footer `
    width: 100%;
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
`;

@inject('footerStore') @observer
class Footer extends React.Component<any, void> {
    private footerStore: FooterStore;

    constructor(props: { footerStore: FooterStore }) {
        super(props);

        this.footerStore = props.footerStore;
    }

    render() {
        return (
            <Container>
                { this.footerStore.showText ? 'Footer' : '' }
            </Container>
        );
    }
}

useStrict(true);
export class FooterStore {
    @observable private _showText: boolean = true;

    get showText() {
        return this._showText;
    }

    set showText(showText) {
        this._showText = showText;
    }

    @action
    setShowText(showText: boolean) {
        this._showText = showText;
    }
}

export default Footer;
