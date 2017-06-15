import * as React from 'react';
import { inject, observer } from "mobx-react";
import TopbarStore, { TOPBAR_STORE } from "./TopbarStore";
import styled from 'styled-components';


@inject(TOPBAR_STORE) @observer
class Filter extends React.Component<{}, void> {
    private TopbarStore: TopbarStore;

    constructor(props: { TOPBAR_STORE: TopbarStore }) {
        super(props);

        this.TopbarStore  = props[TOPBAR_STORE];

        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter(id: number) {
        this.TopbarStore.toggleFilter(id);
    }

    getActiveCount(filter: IFilter[]) {
        const result = filter.filter(f => f.active);

        return result.length;
    }

    render() {
        const { filter } = this.TopbarStore;

        return (
            <FilterContainer>
                {filter.map(f => (
                    <FilterElement key={f.id}>
                        <input
                            type="checkbox"
                            checked={f.active}
                            onChange={() => this.toggleFilter(f.id)}
                            id={f.id.toString()}
                            disabled={this.getActiveCount(filter) <= 1 && f.active}
                        />
                        <Label htmlFor={f.id.toString()}>{f.name}</Label>
                    </FilterElement>
                ))}
            </FilterContainer>
        )
    }
};

const FilterContainer = styled.ul`
    list-style: none;
    margin: 10px 0;
    padding: 0;
`;

const FilterElement = styled.li`
    padding: 10px;
    display: inline-block;

    &
`;

const Label = styled.label`
`;

export enum FilterStatus {
    inPlex = 1,
    available = 2,
    coming = 3
}

export interface IFilter {
    id: FilterStatus;
    active: boolean;
    name: string;
}

export default Filter;