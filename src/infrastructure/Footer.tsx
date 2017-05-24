import * as React from 'react';
import styled from 'styled-components';
import {useStrict, observable, action} from 'mobx';
import {inject, observer} from 'mobx-react';

export const FOOTER_STORE = 'FOOTER_STORE';

@inject(FOOTER_STORE) @observer
class Footer extends React.Component<{}, void> {
    private footerStore: FooterStore;

    constructor(props: { FOOTER_STORE: FooterStore }) {
        super(props);

        this.footerStore = props[FOOTER_STORE];
    }

    render() {
        const Container = styled.footer `
            width: 100%;
            padding: 10px;
            text-align: center;
            box-sizing: border-box;
        `;

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

    @action
    setShowText(showText: boolean) {
        this._showText = showText;
    }
}

export default Footer;
