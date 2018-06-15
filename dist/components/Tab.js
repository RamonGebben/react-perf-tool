"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tab;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Wrapper = _styledComponents.default.div`
  position: absolute;
  top: 2.1em; right: 0; bottom: 0; left: 0;
  height: 100%;
`;

function Tab(props) {
  return _react.default.createElement(Wrapper, null, props.children);
}