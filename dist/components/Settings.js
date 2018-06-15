"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _titleize = _interopRequireDefault(require("../utils/titleize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Wrapper = _styledComponents.default.div`
  padding: 1em;

  h4 {
    font-weight: 500;
    font-size: 1.2em;
    margin: 0.5em 0;
  }
`;
const Setting = _styledComponents.default.div`
  margin: 1em;

  & input {
    outline: none;
    border: 1px solid #A3A3A3;
    border-radius: 2px;
    padding: 0.3em;
  }
`;
const Label = _styledComponents.default.label`
  margin-right: 0.5em;
`;

class Settings extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.settings
    };
  }

  onSettingsUpdate() {
    const newSettings = Object.assign({}, this.props.settings);
    this.props.onSettingsUpdate(newSettings);
  }

  onSettingChange(cat, option, e) {
    const tmp = Object.assign({}, this.state.settings);
    tmp[cat][option] = e.currentTarget.value;
    this.setState({
      settings: tmp
    });
  }

  getEditor(cat, option, value) {
    let editor = _react.default.createElement("input", {
      type: "text",
      value: value,
      onChange: this.onSettingChange.bind(this, cat, option)
    });

    if (Array.isArray(value)) {
      editor = _react.default.createElement("select", {
        onChange: this.onSettingChange.bind(this, cat, option)
      }, value.map((o, i) => _react.default.createElement("option", {
        key: `${i * 42}`
      }, o)));
    }

    return editor;
  }

  render() {
    const settings = this.state.settings;
    return _react.default.createElement("div", {
      className: "settings"
    }, Object.keys(settings).map(cat => _react.default.createElement("div", {
      className: "settings-category",
      key: cat
    }, _react.default.createElement("h4", null, (0, _titleize.default)(cat)), _react.default.createElement("ul", {
      className: "settings-list"
    }, Object.keys(settings[cat]).map((option, i) => _react.default.createElement(Setting, {
      key: `${i * 64}`
    }, _react.default.createElement(Label, null, option, ":"), this.getEditor(cat, option, settings[cat][option])))))), _react.default.createElement("button", {
      onClick: this.onSettingsUpdate.bind(this)
    }, "Save settings"));
  }

}

var _default = Settings;
exports.default = _default;