import React, { Component } from 'react';
import ChartComponent from './ChartComponent';
import excludedComponents from '../constants/excludedComponents';
import formatTime from '../utils/formatTime';

class TimeWasted extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      measurements: [],
      activeMeasurement: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  onMeasurementChange(measurement) {
    const measurementIndex = this.state.measurements.findIndex(m => m.createdAt === measurement.createdAt);
    this.setState({ activeMeasurement: measurementIndex });
  }

  toggleRecord() {
    if (!this.state.recording) {
      this.props.perf.start();
    } else {
      this.props.perf.stop();
      this.printResults();
    }
    this.setState({ recording: !this.state.recording });
  }

  printResults() {
    const getMeasurements = this.props.perf.getWasted ? this.props.perf.getWasted : this.props.perf.getMeasurementsSummaryMap;
    const measurements = getMeasurements(this.props.perf._allMeasurements)
      .filter(measurement => {
        const label = measurement.key.split(' > ').pop();
        return !excludedComponents.includes(label);
      });

    const timeWasted = {
      measurements,
      createdAt: new Date().getTime(),
    };

    const nState = this.state.measurements.concat(timeWasted);
    this.setState({ measurements: nState, activeMeasurement: (nState.length - 1) });
  }


  removeMeasurement(measurement) {
    const index = this.state.measurements.findIndex(m => m.createdAt === measurement.createdAt);
    const measurements = Object.assign([], this.state.measurements);
    measurements.splice(index, 1);
    this.setState({ measurements });
  }

  render() {
    return (<div className="time-wasted">
      <div className="left-hand">
        <div className="tools">
          <button
            onClick={this.toggleRecord.bind(this)}
            className={`recButton ${this.state.recording ? 'active' : null}`}
          />
        </div>
        {this.state.measurements.length > 0 ?
          <ul className="measurements">
            {this.state.measurements.map((measurement, i) => (<li
              className={`measurement ${i === this.state.activeMeasurement ? 'active' : ''}`}
              key={i}
              onClick={this.onMeasurementChange.bind(this, measurement)}
            >
              {formatTime(measurement.createdAt)}
              <button className="removeMeasurement x-button" onClick={this.removeMeasurement.bind(this, measurement)}>×</button>
            </li>)
          )}
          </ul> : <div className="no-measurements">No measurements yet, record to view some results</div>}
      </div>
      <div className="right-hand">
        {this.state.measurements[this.state.activeMeasurement] &&
          <ChartComponent
            width={10}
            height={10}
            label="Time wasted in miliseconds"
            measurement={this.state.measurements[this.state.activeMeasurement]}
          />
        }
      </div>
    </div>);
  }
}

export default TimeWasted;
