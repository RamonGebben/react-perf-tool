import React, { Component } from 'react';
import keymaster from 'keymaster';

import defaultSettings from '../constants/defaultSettings';
import getUserSettings from '../utils/getUserSettings';
import setUserSettings from '../utils/setUserSettings';

import TimeWasted from './TimeWasted';
import TabManager from './TabManager';
import Tab from './Tab';

import Settings from './Settings';

class ReactPerfTool extends Component {
  constructor(props) {
    super(props);

    const userSettings = getUserSettings(window.localStorage);

    this.state = {
      showing: true,
      recording: false,
      toolHeight: 400,
      settings: Object.assign({}, defaultSettings, userSettings),
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
    setUserSettings(settings, window.localStorage);
    this.setState({ settings });
    this.reloadSettings();
  }

  enableKeyBindings() {
    const { settings } = this.state;
    Object.keys(settings.keybindings).forEach(func => {
      keymaster(settings.keybindings[func], this[func].bind(this));
    });
  }

  unbindKeys() {
    const { settings } = this.state;
    Object.keys(settings.keybindings).forEach(func => {
      keymaster.unbind(settings.keybindings[func]);
    });
  }

  handleResize(e) {
    const windowHeight = window.innerHeight;
    const toolHeight = windowHeight - e.screenY;
    if (toolHeight < windowHeight && toolHeight > 300) this.setState({ toolHeight });
  }

  reloadSettings() {
    this.unbindKeys();
    this.enableKeyBindings();
  }

  toggleVisibility() {
    this.setState({ showing: !this.state.showing });
  }

  render() {
    return (<div className="perf-app-shell">
      <div
        className={`perf-tool container bottom ${this.state.showing ? null : 'hidden'}`}
        style={{
          height: `${this.state.toolHeight}px`,
          bottom: `${this.state.showing ? 0 : -this.state.toolHeight}px`,
        }}
      >
        <div className="resize-handler" onDrag={this.handleResize.bind(this)} />
        <button
          onClick={this.toggleVisibility.bind(this)}
          className="toggleButton x-button"
        >
        ×
        </button>
        <TabManager>
          <Tab
            key="wastedChart"
            align="left"
          >
            <TimeWasted perf={this.props.perf} />
          </Tab>
          <Tab
            key="settings"
            align="right"
          >
            <Settings
              settings={this.state.settings}
              onSettingsUpdate={this.onSettingsUpdate.bind(this)}
            />
          </Tab>
        </TabManager>
      </div>
    </div>);
  }
}

export default ReactPerfTool;
