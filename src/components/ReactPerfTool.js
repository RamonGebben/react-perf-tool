import React, { Component } from 'react';
import styled from 'styled-components';
import keymaster from 'keymaster';

import defaultSettings from '../constants/defaultSettings';
import getUserSettings from '../utils/getUserSettings';
import setUserSettings from '../utils/setUserSettings';

import TimeWasted from './TimeWasted';
import TabManager from './TabManager';
import Tab from './Tab';

import Settings from './Settings';

const Shell = styled.div`
`;

const Container = styled.div`
  position: fixed;
  width: 100%; height: 200px;
  border: 1px solid #ddd;
  background-color: #fff;
  z-index: 50000000;
  font-family: 'Helvetica', sans-serif;

  &.bottom {
    right: 0px; bottom: 0px; left: 0px;
  }

  &.hidden {
    bottom: -200px;
  }
`;

const ResizeHandler = styled.div`
  width: 100%; height: 10px;
  position: absolute;
  top: -3px; right: 0; left: 0;
  cursor: row-resize;
`;

const CloseButton = styled.button`
  display: block;
  width: 1em; height: 1em;
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;
  font-size: 30px;
  line-height: 1;
  color: #5A5A5A;
  cursor: pointer;
`;

class ReactPerfTool extends Component {
  constructor(props) {
    super(props);

    const userSettings = getUserSettings(window.localStorage);

    this.state = {
      showing: true,
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
    Object.keys(settings.keybindings).forEach((func) => {
      keymaster(settings.keybindings[func], this[func].bind(this));
    });
  }

  unbindKeys() {
    const { settings } = this.state;
    Object.keys(settings.keybindings).forEach((func) => {
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
    return (
      <Shell className="perf-app-shell">
        <Container
          className={`perf-tool container bottom ${this.state.showing ? null : 'hidden'}`}
          style={{
            height: `${this.state.toolHeight}px`,
            bottom: `${this.state.showing ? 0 : -this.state.toolHeight}px`,
          }}
        >
          <ResizeHandler onDrag={this.handleResize.bind(this)} />
          <CloseButton
            onClick={this.toggleVisibility.bind(this)}
            className="toggleCloseButton x-CloseButton"
          >
          ×
          </CloseButton>
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
        </Container>
      </Shell>
    );
  }
}

export default ReactPerfTool;
