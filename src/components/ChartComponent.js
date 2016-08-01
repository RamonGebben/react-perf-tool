import React, { Component } from 'react';
import Chart from 'chart.js';

class ChartComponent extends Component {

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
    this.chart = new Chart(document.getElementById('perf-tool-chart-ctx'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          label: this.props.label,
          backgroundColor: 'rgba(75,192,192,0.4)',
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

  render() {
    return (<div className="chart-container" style={{ maxWidth: '900px' }}>
      <canvas id="perf-tool-chart-ctx" style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }} />
    </div>);
  }
}

export default ChartComponent;
