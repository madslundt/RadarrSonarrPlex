import {useStrict, observable, action} from 'mobx/lib/mobx';

export const FOOTER_STORE = 'FOOTER_STORE';

useStrict(true);
export default class FooterStore {
    @observable private _showText: boolean = true;

    get showText() {
        return this._showText;
    }

    @action
    setShowText(showText: boolean) {
        this._showText = showText;
    }
}