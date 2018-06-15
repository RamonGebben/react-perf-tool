"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _keymaster = _interopRequireDefault(require("keymaster"));

var _defaultSettings = _interopRequireDefault(require("../constants/defaultSettings"));

var _getUserSettings = _interopRequireDefault(require("../utils/getUserSettings"));

var _setUserSettings = _interopRequireDefault(require("../utils/setUserSettings"));

var _TimeWasted = _interopRequireDefault(require("./TimeWasted"));

var _TabManager = _interopRequireDefault(require("./TabManager"));

var _Tab = _interopRequireDefault(require("./Tab"));

var _Settings = _interopRequireDefault(require("./Settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Shell = _styledComponents.default.div`
`;
const Container = _styledComponents.default.div`
  position: fixed;
  width: 100%; height: 200px;
  border: 1px solid #ddd;
  background-color: #fff;
  z-index: 50000000;
  font-family: 'Helvetica', sans-serif;

  &.bottom {
    right: 0px; bottom: 0px; left: 0px;
  }

  &.hidden {
    bottom: -200px;
  }
`;
const ResizeHandler = _styledComponents.default.div`
  width: 100%; height: 10px;
  position: absolute;
  top: -3px; right: 0; left: 0;
  cursor: row-resize;
`;
const CloseButton = _styledComponents.default.button`
  display: block;
  width: 1em; height: 1em;
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;
  font-size: 30px;
  line-height: 1;
  color: #5A5A5A;
  cursor: pointer;
`;

class ReactPerfTool extends _react.Component {
  constructor(props) {
    super(props);
    const userSettings = (0, _getUserSettings.default)(window.localStorage);
    this.state = {
      showing: true,
      toolHeight: 400,
      settings: Object.assign({}, _defaultSettings.default, userSettings)
    };
    window.Perf = props.perf;
  }

  componentDidMount() {
    this.enableKeyBindings();
  }

  componentWillUnmount() {
    this.unbindKeys();
  }

  onSettingsUpdate(settings) {
    (0, _setUserSettings.default)(settings, window.localStorage);
    this.setState({
      settings
    });
    this.reloadSettings();
  }

  enableKeyBindings() {
    const settings = this.state.settings;
    Object.keys(settings.keybindings).forEach(func => {
      (0, _keymaster.default)(settings.keybindings[func], this[func].bind(this));
    });
  }

  unbindKeys() {
    const settings = this.state.settings;
    Object.keys(settings.keybindings).forEach(func => {
      _keymaster.default.unbind(settings.keybindings[func]);
    });
  }

  handleResize(e) {
    const windowHeight = window.innerHeight;
    const toolHeight = windowHeight - e.screenY;
    if (toolHeight < windowHeight && toolHeight > 300) this.setState({
      toolHeight
    });
  }

  reloadSettings() {
    this.unbindKeys();
    this.enableKeyBindings();
  }

  toggleVisibility() {
    this.setState({
      showing: !this.state.showing
    });
  }

  render() {
    return _react.default.createElement(Shell, {
      className: "perf-app-shell"
    }, _react.default.createElement(Container, {
      className: `perf-tool container bottom ${this.state.showing ? null : 'hidden'}`,
      style: {
        height: `${this.state.toolHeight}px`,
        bottom: `${this.state.showing ? 0 : -this.state.toolHeight}px`
      }
    }, _react.default.createElement(ResizeHandler, {
      onDrag: this.handleResize.bind(this)
    }), _react.default.createElement(CloseButton, {
      onClick: this.toggleVisibility.bind(this),
      className: "toggleCloseButton x-CloseButton"
    }, "\xD7"), _react.default.createElement(_TabManager.default, null, _react.default.createElement(_Tab.default, {
      key: "wastedChart",
      align: "left"
    }, _react.default.createElement(_TimeWasted.default, {
      perf: this.props.perf
    })), _react.default.createElement(_Tab.default, {
      key: "settings",
      align: "right"
    }, _react.default.createElement(_Settings.default, {
      settings: this.state.settings,
      onSettingsUpdate: this.onSettingsUpdate.bind(this)
    })))));
  }

}

var _default = ReactPerfTool;
exports.default = _default;