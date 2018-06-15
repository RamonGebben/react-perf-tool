"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabHeader;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _titleize = _interopRequireDefault(require("../utils/titleize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Header = _styledComponents.default.div`
  display: inline-block;
  padding: 0.8em;
  font-size: 12px;
  max-width: 10em; width: 100%;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  transition: all .2s ease-out;
  user-select: none;

  &:hover {
    background-color: #e5e5e5;
    transition: all .2s ease-out;
  }

  &.left { float: left; }
  &.right { float: right; }

  &.active {
    border-bottom: 1px solid #3879D9;
  }
`;

function TabHeader(props) {
  return _react.default.createElement(Header, {
    className: `tab-header ${props.isActive ? 'active' : ''} ${props.align}`,
    onClick: props.onClick
  }, (0, _titleize.default)(props.title));
}