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
    }
  }

  startOrStopRecording() {
    if (!this.state.recording) {
      this.props.perf.start();
    } else {
      this.props.perf.stop();
      this.printResults();
    }
    this.setState({ recording: !this.state.recording });
  }

  printResults() {
    const measurements = Perf.getWasted(Perf._allMeasurements)
      .filter(measurement => {
        const label = measurement['Owner > component']
          .split(' > ').pop();
        return !excludedComponents.includes(label);
      });

    const timeWasted = {
      measurements,
      createdAt: new Date().getTime(),
    }

    const nState = this.state.measurements.concat(timeWasted);
    this.setState({ measurements: nState });
  }

  onMeasurementChange(measurement) {
    const measurementIndex = this.state.measurements.findIndex(m => m.createdAt === measurement.createdAt);
    this.setState({ activeMeasurement: measurementIndex });
  }

  render() {
    return (<div className="time-wasted">
      <div className="left-hand">
        <div className="tools">
          <button
            onClick={this.startOrStopRecording.bind(this)}
            className={`recButton ${this.state.recording ? 'active' : null}`}
          />
        </div>
        {this.state.measurements.length > 0 ?
        <ul className="measurements">
          {this.state.measurements.map((measurement, i) => {
            return (<li
              className="measurement"
              key={i}
              onClick={this.onMeasurementChange.bind(this, measurement)}
            >
              {formatTime(measurement.createdAt)}
            </li>);
          })}
        </ul> : <div className="no-measurements">No measurements yet, record to view some results</div>}
      </div>
      <div className="right-hand">
        {this.state.measurements[this.state.activeMeasurement] &&
          <ChartComponent
            width={10}
            height={10}
            measurement={this.state.measurements[this.state.activeMeasurement]}
          />
        }
      </div>
    </div>);
  }
}

export default TimeWasted;
