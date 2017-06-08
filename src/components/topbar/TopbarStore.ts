import {useStrict, observable, action, computed} from 'mobx';

export const TOPBAR_STORE = 'TOPBAR_STORE';

useStrict(true);
export default class MoviesStore {
    @observable private _monthOffset: number = 0;

    constructor() {
    }

    @action
    nextMonth() {
        this._monthOffset++;
    }
    @action
    previousMonth() {
        this._monthOffset--;
    }

    @computed
    get monthOffset(): number {
        return this._monthOffset;
    }

    @computed
    get currentMonth(): string {
        const now = new Date();
        const currentMonth = now.getMonth() + this._monthOffset;

        const date = new Date();
        date.setMonth(currentMonth);

        const result = date.toLocaleString(navigator.language, { month: "long" });

        return result;
    }
}

export const getStartDate = (monthOffset: number): Date => {
    const now = new Date();
    const result = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);

    return result;
}
export const getEndDate = (monthOffset: number): Date => {
    const now = new Date();
    const result = new Date(now.getFullYear(), now.getMonth() + monthOffset + 1, 1);

    return result;
}