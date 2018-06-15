"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.split");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ChartComponent = _interopRequireDefault(require("./ChartComponent"));

var _excludedComponents = _interopRequireDefault(require("../constants/excludedComponents"));

var _formatTime = _interopRequireDefault(require("../utils/formatTime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Wrapper = _styledComponents.default.div``;
const Measurement = _styledComponents.default.li`
  padding: 1em;
  border-bottom: 1px solud #ccc;
  cursor: pointer;
  position: relative;

  &:hover, &.active {
    background-color: #e5e5e5;
    transition: all .2s ease-out;
  }
`;
const LeftHand = _styledComponents.default.div`
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 200px;
  border-right: 1px solid #ccc;
  background-color: #F3F3F3;
  min-height: 400px;
`;
const RightHand = _styledComponents.default.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 200px;
`;
const RecordButton = _styledComponents.default.button`
  padding: 1em;
  width: 8px; height: 8px;
  border-radius: 50%;
  outline: none;
  border: 1px solid #ddd;
  text-align: left;
  cursor: pointer;

  &.active {
    border: 1px solid red;
    background-color: red;
    box-shadow: 0 0 10px red;
  }
`;
const RemoveMeasurementButton = _styledComponents.default.button`
  display: block;
  width: 1em; height: 1em;
  border: none; outline: none;
  padding: 0;
  background-color: transparent;
  font-size: 30px;
  line-height: 1;
  color: #5A5A5A;

  cursor: pointer;
  position: absolute;
  top: 0.2em; right: 0;
  transition: all .2s ease-out;

  &:hover {
    transform: scale(1.3);
    transition: all .2s ease-out;
  }
`;
const Tools = _styledComponents.default.div`
  padding: 0.5em;
  border-bottom: 1px solid #ccc;
  color: #5A5A5A;
`;
const NoMeasurements = _styledComponents.default.div`
  padding: 1em;
`;

class TimeWasted extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      measurements: [],
      activeMeasurement: 0
    };
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  onMeasurementChange(measurement) {
    const measurementIndex = this.state.measurements.findIndex(m => m.createdAt === measurement.createdAt);
    this.setState({
      activeMeasurement: measurementIndex
    });
  }

  toggleRecord() {
    if (!this.state.recording) {
      this.props.perf.start();
    } else {
      this.props.perf.stop();
      this.printResults();
    }

    this.setState({
      recording: !this.state.recording
    });
  }

  printResults() {
    const getMeasurements = this.props.perf.getWasted ? this.props.perf.getWasted : this.props.perf.getMeasurementsSummaryMap;
    const measurements = getMeasurements(this.props.perf._allMeasurements).filter(measurement => {
      const label = measurement.key.split(' > ').pop();
      return !_excludedComponents.default.includes(label);
    });
    const timeWasted = {
      measurements,
      createdAt: new Date().getTime()
    };
    const nState = this.state.measurements.concat(timeWasted);
    this.setState({
      measurements: nState,
      activeMeasurement: nState.length - 1
    });
  }

  removeMeasurement(measurement) {
    const index = this.state.measurements.findIndex(m => m.createdAt === measurement.createdAt);
    const measurements = Object.assign([], this.state.measurements);
    measurements.splice(index, 1);
    this.setState({
      measurements
    });
  }

  render() {
    return _react.default.createElement(Wrapper, {
      className: "time-wasted"
    }, _react.default.createElement(LeftHand, null, _react.default.createElement(Tools, null, _react.default.createElement("button", {
      onClick: this.toggleRecord.bind(this),
      className: `recButton ${this.state.recording ? 'active' : null}`
    })), this.state.measurements.length > 0 ? _react.default.createElement("ul", {
      className: "measurements"
    }, this.state.measurements.map((measurement, i) => _react.default.createElement(Measurement, {
      className: `measurement ${i === this.state.activeMeasurement ? 'active' : ''}`,
      key: `${i * 23}`,
      onClick: this.onMeasurementChange.bind(this, measurement)
    }, (0, _formatTime.default)(measurement.createdAt), _react.default.createElement(RemoveMeasurementButton, {
      onClick: this.removeMeasurement.bind(this, measurement)
    }, "\xD7")))) : _react.default.createElement(NoMeasurements, null, "No measurements yet, record to view some results")), _react.default.createElement(RightHand, null, this.state.measurements[this.state.activeMeasurement] && _react.default.createElement(_ChartComponent.default, {
      width: 10,
      height: 10,
      label: "Time wasted in miliseconds",
      measurement: this.state.measurements[this.state.activeMeasurement]
    })));
  }

}

var _default = TimeWasted;
exports.default = _default;