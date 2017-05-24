import {useStrict, observable, action} from 'mobx';
import {getProfile} from "./api/ProfileMockApi";
import ApiStatus from '../../infrastructure/api/apiStatus';

useStrict(true);

export interface IProfile {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
}

export default class ProfileStore {
    @observable private _profile: IProfile;
    @observable private _apiStatus: ApiStatus;
    @observable private _error: any;

    constructor(id: string) {
        this._setApiStatus(ApiStatus.Request);
        getProfile(id).then(profile => {
            this._setApiStatus(ApiStatus.Success);
            this._setProfile(profile);
        }, error => {
            this._setApiStatus(ApiStatus.Error);
            this._setError(error);
        });
    }

    @action
    private _setProfile(profile: IProfile) {
        this._profile = profile;
    }

    @action
    private _setApiStatus(status: ApiStatus) {
        this._apiStatus = status;
    }

    @action
    private _setError(error: any) {
        this._error = error;
    }

    get firstName() {
        if (this._profile) {
            return this._profile.firstName;
        } else {
            return '';
        }
    }
    get lastName() {
        if (this._profile) {
            return this._profile.lastName;
        } else {
            return '';
        }
    }

    get error() {
        return this._error;
    }

    get apiStatus() {
        return this._apiStatus;
    }
}