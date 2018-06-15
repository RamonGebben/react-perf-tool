import React, { Component } from 'react';
import styled from 'styled-components';
import titleize from '../utils/titleize';

const Wrapper = styled.div`
  padding: 1em;

  h4 {
    font-weight: 500;
    font-size: 1.2em;
    margin: 0.5em 0;
  }
`;

const Setting = styled.div`
  margin: 1em;

  & input {
    outline: none;
    border: 1px solid #A3A3A3;
    border-radius: 2px;
    padding: 0.3em;
  }
`;

const Label = styled.label`
  margin-right: 0.5em;
`;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.settings,
    };
  }

  onSettingsUpdate() {
    const newSettings = Object.assign({}, this.props.settings);
    this.props.onSettingsUpdate(newSettings);
  }

  onSettingChange(cat, option, e) {
    const tmp = Object.assign({}, this.state.settings);
    tmp[cat][option] = e.currentTarget.value;
    this.setState({ settings: tmp });
  }

  getEditor(cat, option, value) {
    let editor = (<input type="text" value={value} onChange={this.onSettingChange.bind(this, cat, option)} />);

    if (Array.isArray(value)) {
      editor = (
        <select onChange={this.onSettingChange.bind(this, cat, option)}>
          {value.map((o, i) => <option key={`${i * 42}`}>{o}</option>)}
        </select>);
    }
    return editor;
  }

  render() {
    const { settings } = this.state;
    return (
      <div className="settings">
        {Object.keys(settings).map(cat => (
          <div className="settings-category" key={cat}>
            <h4>{titleize(cat)}</h4>
            <ul className="settings-list">
              {Object.keys(settings[cat]).map((option, i) => (
                <Setting key={`${i * 64}`}>
                  <Label>{option}:</Label>
                  {this.getEditor(cat, option, settings[cat][option])}
                </Setting>))}
            </ul>
          </div>
        ))}
        <button onClick={this.onSettingsUpdate.bind(this)}>Save settings</button>
      </div>);
  }
}

export default Settings;
