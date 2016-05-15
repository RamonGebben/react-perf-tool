import React, { Component } from 'react';

import TimeWasted from './TimeWasted';
import TabManager from './TabManager';
import Tab from './Tab';

class PerfTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: true,
      toolHeight: 400,
    };

    window.Perf = props.perf;
  }

  componentDidMount() {
  }


  hideOrShow() {
    this.setState({ showing: !this.state.showing });
  }

  handleResize(e) {
    const windowHeight = window.innerHeight;
    const toolHeight =  windowHeight - e.screenY
    if (toolHeight < windowHeight && toolHeight > 300) this.setState({ toolHeight });
  }

  render() {
    return (<div className="perf-app-shell">
      <div
        className={`perf-tool container bottom ${this.state.showing ? null : 'hidden' }`}
        style={{
          height: `${this.state.toolHeight}px`,
          bottom: `${this.state.showing ? 0 : -this.state.toolHeight}px`,
        }}
      >
      <div className="resize-handler" onDrag={this.handleResize.bind(this)} />
        <button
          onClick={this.hideOrShow.bind(this)}
          className="toggleButton"
        >
        {this.state.showing ? 'Close' : 'Open'}
        </button>
        <TabManager>
          <Tab key="wastedChart">
            <TimeWasted perf={this.props.perf} />
          </Tab>

        </TabManager>
      </div>
    </div>);
  }
}

export default PerfTool;
