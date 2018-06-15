import React, { Component } from 'react';
import styled from 'styled-components';
import ChartComponent from './ChartComponent';
import excludedComponents from '../constants/excludedComponents';
import formatTime from '../utils/formatTime';

const Wrapper = styled.div``;

const Measurement = styled.li`
  padding: 1em;
  border-bottom: 1px solud #ccc;
  cursor: pointer;
  position: relative;

  &:hover, &.active {
    background-color: #e5e5e5;
    transition: all .2s ease-out;
  }
`;

const LeftHand = styled.div`
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 200px;
  border-right: 1px solid #ccc;
  background-color: #F3F3F3;
  min-height: 400px;
`;

const RightHand = styled.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 200px;
`;

const RecordButton = styled.button`
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

const RemoveMeasurementButton = styled.button`
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

const Tools = styled.div`
  padding: 0.5em;
  border-bottom: 1px solid #ccc;
  color: #5A5A5A;
`;

const NoMeasurements = styled.div`
  padding: 1em;
`;

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
      .filter((measurement) => {
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
    return (
      <Wrapper className="time-wasted">
        <LeftHand>
          <Tools>
            <button
              onClick={this.toggleRecord.bind(this)}
              className={`recButton ${this.state.recording ? 'active' : null}`}
            />
          </Tools>
          {this.state.measurements.length > 0 ?
            <ul className="measurements">
              {this.state.measurements.map((measurement, i) => (
                <Measurement
                  className={`measurement ${i === this.state.activeMeasurement ? 'active' : ''}`}
                  key={`${i * 23}`}
                  onClick={this.onMeasurementChange.bind(this, measurement)}
                >
                  {formatTime(measurement.createdAt)}
                  <RemoveMeasurementButton
                    onClick={this.removeMeasurement.bind(this, measurement)}
                  >
                    ×
                  </RemoveMeasurementButton>
                </Measurement>))
              }
            </ul> : <NoMeasurements>No measurements yet, record to view some results</NoMeasurements>}
        </LeftHand>
        <RightHand>
          {this.state.measurements[this.state.activeMeasurement] &&
            <ChartComponent
              width={10}
              height={10}
              label="Time wasted in miliseconds"
              measurement={this.state.measurements[this.state.activeMeasurement]}
            />
          }
        </RightHand>
      </Wrapper>);
  }
}

export default TimeWasted;
