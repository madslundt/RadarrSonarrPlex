import * as React from 'react';
import styled from 'styled-components';
import FooterStore, {FOOTER_STORE} from './FooterStore';
import {inject, observer} from 'mobx-react';

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

export default Footer;
