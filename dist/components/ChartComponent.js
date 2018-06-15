"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _chart = _interopRequireDefault(require("chart.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class ChartComponent extends _react.Component {
  componentDidMount() {
    this.renderChart(this.props.measurement.measurements);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.measurement.createdAt !== this.props.measurement.createdAt) {
      this.updateChart(nextProps.measurement.measurements);
    }
  }

  updateChart(measurements) {
    this.chart.destroy();
    this.renderChart(measurements);
  }

  renderChart(measurements) {
    const data = measurements.map(measurement => measurement.inclusiveRenderDuration);
    const labels = measurements.map(measurement => measurement.key);
    this.chart = new _chart.default(document.getElementById('perf-tool-chart-ctx'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          label: this.props.label,
          backgroundColor: 'rgba(75,192,192,0.4)'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  render() {
    return _react.default.createElement("div", {
      className: "chart-container",
      style: {
        maxWidth: '900px'
      }
    }, _react.default.createElement("canvas", {
      id: "perf-tool-chart-ctx",
      style: {
        width: `${this.props.width}px`,
        height: `${this.props.height}px`
      }
    }));
  }

}

var _default = ChartComponent;
exports.default = _default;