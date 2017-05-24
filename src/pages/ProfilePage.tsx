import { observer } from 'mobx-react';
import NotFound from '../infrastructure/404';
import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import ProfileStore from '../components/profile/ProfileStore';
import ApiStatus from '../infrastructure/api/apiStatus';

@observer
export default class ProfilePage extends React.Component<RouteComponentProps<{id : string}>, void> {
    private ProfileStore: ProfileStore;

    constructor(props: RouteComponentProps<{id : string}>) {
        super(props);

        const {id} = props.match.params;

        this.ProfileStore = new ProfileStore(id);
    }

    private _renderRequest() {
        return <div>Loading</div>;
    }

    private _renderError() {
        return <NotFound />;
    }

    private _renderSuccess() {
        const {firstName, lastName} = this.ProfileStore;

        return (
            <div>{firstName} {lastName}</div>
        );
    }

    render() {
        switch (this.ProfileStore.apiStatus) {
            case ApiStatus.Error:
                return this._renderError();
            case ApiStatus.Success:
                return this._renderSuccess();
            default:
                return this._renderRequest();
        };
    }
}
