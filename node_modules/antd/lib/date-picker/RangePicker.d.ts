/// <reference types="react" />
import React from 'react';
import moment from 'moment';
export default class RangePicker extends React.Component<any, any> {
    static contextTypes: {
        antLocale: any;
    };
    static defaultProps: {
        prefixCls: string;
        allowClear: boolean;
        showToday: boolean;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    clearSelection: (e: any) => void;
    handleChange: (value: moment.Moment[]) => void;
    handleOpenChange: (open: any) => void;
    handleShowDateChange: (showDate: any) => void;
    setValue(value: any): void;
    renderFooter: () => JSX.Element | null;
    render(): JSX.Element;
}
