import {useStrict, observable, action, computed} from 'mobx';
import { IFilter } from './Filter';
import {getFilter} from "../../infrastructure/Storage";

export const TOPBAR_STORE = 'TOPBAR_STORE';

useStrict(true);
export default class MoviesStore {
    @observable private _monthOffset: number = 0;
    @observable private _filter: IFilter[] = [];

    constructor() {
        getFilter().then(filter => {
            this._setFilter(filter);
        });
    }

    @action
    nextMonth() {
        this._monthOffset++;
    }
    @action
    previousMonth() {
        this._monthOffset--;
    }

    @action
    private _setFilter(filter: IFilter[]) {
        this._filter = filter;
    }

    @action
    toggleFilter(filterId: number) {
        const filter = this._filter.find(filter => filter.id === filterId);

        if (filter) {
            filter.active = !filter.active;
        }
    }

    @computed
    get monthOffset(): number {
        return this._monthOffset;
    }

    @computed
    get filter() {
        return this._filter;
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