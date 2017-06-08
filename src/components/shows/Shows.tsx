import * as React from 'react';
import { inject, observer } from 'mobx-react';
import ShowsStore from "./ShowsStore";
import ApiStatus from '../../infrastructure/api/apiStatus';
import Show from './show/Show';
import TopbarStore, {TOPBAR_STORE} from "../topbar/TopbarStore";
import {MediaList, MediaElement, Center, Error, Button} from '../media/MediaStyles';
import {autorun} from "mobx";

interface IProps {
    store: ShowsStore
}

@inject(TOPBAR_STORE) @observer
class Shows extends React.Component<IProps, void> {
    private ShowsStore: ShowsStore;
    private TopbarStore: TopbarStore;

    constructor(props: IProps & {TOPBAR_STORE: TopbarStore}) {
        super(props);

        this.update = this.update.bind(this);

        this.ShowsStore  = props.store;
        this.TopbarStore = props[TOPBAR_STORE];
    }

    update() {
        this.ShowsStore.fetchShows();
    }

    componentWillMount() {
        autorun(() => {
            this.ShowsStore.setMonthOffset(this.TopbarStore.monthOffset);
        });
    }

    private _renderRequest() {
        return <Center>Requesting...</Center>;
    }
    private _renderSuccess() {
        const { shows } = this.ShowsStore;

        if (!shows || !shows.length) {
            return <Center>No tv shows in {this.TopbarStore.currentMonth}</Center>;
        } else {
            return (
                <MediaList>
                    {shows.map(show =>
                        <MediaElement key={show.id}>
                            <Show show={show} />
                        </MediaElement>
                    )}
                </MediaList>
            );
        }
    }
    private _renderError() {
        const { error } = this.ShowsStore;
        return (
            <Center>
                <p>Error retrieving tv shows.</p>
                {!!error ? <div><Error>{error}</Error></div> : ''}
                <Button className="btn btn-lg btn-default" onClick={this.update}>Try again</Button>
            </Center>
        );
    }

    render() {
        const { apiStatus } = this.ShowsStore;

        switch (apiStatus) {
            case ApiStatus.Request:
                return this._renderRequest();
            case ApiStatus.Success:
                return this._renderSuccess();
            default:
                return this._renderError();
        };
    }
}

export default Shows;