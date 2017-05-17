'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _dropdown = require('../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _menu = require('../menu');

var _menu2 = _interopRequireDefault(_menu);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SelectionCheckboxAll = function (_React$Component) {
    (0, _inherits3["default"])(SelectionCheckboxAll, _React$Component);

    function SelectionCheckboxAll(props) {
        (0, _classCallCheck3["default"])(this, SelectionCheckboxAll);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.handleSelectAllChagne = function (e) {
            var checked = e.target.checked;
            _this.props.onSelect(checked ? 'all' : 'removeAll', 0, null);
        };
        _this.defaultSelections = [{
            key: 'all',
            text: props.locale.selectAll,
            onSelect: function onSelect() {}
        }, {
            key: 'invert',
            text: props.locale.selectInvert,
            onSelect: function onSelect() {}
        }];
        _this.state = {
            checked: _this.getCheckState(props),
            indeterminate: _this.getIndeterminateState(props)
        };
        return _this;
    }

    SelectionCheckboxAll.prototype.componentDidMount = function componentDidMount() {
        this.subscribe();
    };

    SelectionCheckboxAll.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.setCheckState(nextProps);
    };

    SelectionCheckboxAll.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    };

    SelectionCheckboxAll.prototype.subscribe = function subscribe() {
        var _this2 = this;

        var store = this.props.store;

        this.unsubscribe = store.subscribe(function () {
            _this2.setCheckState(_this2.props);
        });
    };

    SelectionCheckboxAll.prototype.checkSelection = function checkSelection(data, type, byDefaultChecked) {
        var _props = this.props,
            store = _props.store,
            getCheckboxPropsByItem = _props.getCheckboxPropsByItem,
            getRecordKey = _props.getRecordKey;
        // type should be 'every' | 'some'

        if (type === 'every' || type === 'some') {
            return byDefaultChecked ? data[type](function (item, i) {
                return getCheckboxPropsByItem(item, i).defaultChecked;
            }) : data[type](function (item, i) {
                return store.getState().selectedRowKeys.indexOf(getRecordKey(item, i)) >= 0;
            });
        }
        return false;
    };

    SelectionCheckboxAll.prototype.setCheckState = function setCheckState(props) {
        var checked = this.getCheckState(props);
        var indeterminate = this.getIndeterminateState(props);
        if (checked !== this.state.checked) {
            this.setState({ checked: checked });
        }
        if (indeterminate !== this.state.indeterminate) {
            this.setState({ indeterminate: indeterminate });
        }
    };

    SelectionCheckboxAll.prototype.getCheckState = function getCheckState(props) {
        var store = props.store,
            data = props.data;

        var checked = void 0;
        if (!data.length) {
            checked = false;
        } else {
            checked = store.getState().selectionDirty ? this.checkSelection(data, 'every', false) : this.checkSelection(data, 'every', false) || this.checkSelection(data, 'every', true);
        }
        return checked;
    };

    SelectionCheckboxAll.prototype.getIndeterminateState = function getIndeterminateState(props) {
        var store = props.store,
            data = props.data;

        var indeterminate = void 0;
        if (!data.length) {
            indeterminate = false;
        } else {
            indeterminate = store.getState().selectionDirty ? this.checkSelection(data, 'some', false) && !this.checkSelection(data, 'every', false) : this.checkSelection(data, 'some', false) && !this.checkSelection(data, 'every', false) || this.checkSelection(data, 'some', true) && !this.checkSelection(data, 'every', true);
        }
        return indeterminate;
    };

    SelectionCheckboxAll.prototype.renderMenus = function renderMenus(selections) {
        var _this3 = this;

        return selections.map(function (selection, index) {
            return _react2["default"].createElement(
                _menu2["default"].Item,
                { key: selection.key || index },
                _react2["default"].createElement(
                    'div',
                    { onClick: function onClick() {
                            _this3.props.onSelect(selection.key, index, selection.onSelect);
                        } },
                    selection.text
                )
            );
        });
    };

    SelectionCheckboxAll.prototype.render = function render() {
        var _props2 = this.props,
            disabled = _props2.disabled,
            prefixCls = _props2.prefixCls,
            selections = _props2.selections;
        var _state = this.state,
            checked = _state.checked,
            indeterminate = _state.indeterminate;

        var selectionPrefixCls = prefixCls + '-selection';
        var customSelections = null;
        if (selections) {
            var newSelections = Array.isArray(selections) ? this.defaultSelections.concat(selections) : this.defaultSelections;
            var menu = _react2["default"].createElement(
                _menu2["default"],
                { className: selectionPrefixCls + '-menu', selectedKeys: [] },
                this.renderMenus(newSelections)
            );
            customSelections = _react2["default"].createElement(
                _dropdown2["default"],
                { overlay: menu, getPopupContainer: function getPopupContainer(trigger) {
                        return trigger.parentNode;
                    } },
                _react2["default"].createElement(
                    'div',
                    { className: selectionPrefixCls + '-down' },
                    _react2["default"].createElement(_icon2["default"], { type: 'down' })
                )
            );
        }
        return _react2["default"].createElement(
            'div',
            { className: selectionPrefixCls },
            _react2["default"].createElement(_checkbox2["default"], { className: (0, _classnames2["default"])((0, _defineProperty3["default"])({}, selectionPrefixCls + '-select-all-custom', customSelections)), checked: checked, indeterminate: indeterminate, disabled: disabled, onChange: this.handleSelectAllChagne }),
            customSelections
        );
    };

    return SelectionCheckboxAll;
}(_react2["default"].Component);

exports["default"] = SelectionCheckboxAll;
module.exports = exports['default'];