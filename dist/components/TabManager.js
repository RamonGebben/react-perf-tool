"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _TabHeader = _interopRequireDefault(require("./TabHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Wrapper = _styledComponents.default.div`
  position: relative;
`;
const TabBar = _styledComponents.default.div`
  position: absolute;
  top: 0; right: 0; left: 0;
  background-color: #F3F3F3;
  border-bottom: 1px solid #CCCCCC;
`;

class TabManager extends _react.Component {
  constructor(props) {
    super(props);
    this.children = [].concat(props.children);
    this.state = {
      activeTab: this.children[0].key
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.children = [].concat(nextProps.children);
  }

  onTabClick(key) {
    this.setState({
      activeTab: key
    });
  }

  render() {
    const tabs = this.children.map((tab, i) => _react.default.createElement(_TabHeader.default, {
      title: tab.key,
      isActive: tab.key === this.state.activeTab,
      key: i,
      align: tab.props.align,
      onClick: this.onTabClick.bind(this, tab.key)
    }));
    return _react.default.createElement(Wrapper, null, _react.default.createElement(TabBar, {
      className: "tab-bar"
    }, tabs), this.children.find(child => child.key === this.state.activeTab));
  }

}

var _default = TabManager;
exports.default = _default;