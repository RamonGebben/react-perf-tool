import React, { Component } from 'react';
import titleize from '../utils/titleize';

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
      editor = (<select onChange={this.onSettingChange.bind(this, cat, option)}>
        {value.map((o, i) => <option key={i}>{o}</option>)}
      </select>);
    }
    return editor;
  }

  render() {
    const { settings } = this.state;
    return (<div className="settings">
        {Object.keys(settings).map(cat => (
          <div className="settings-category" key={cat}>
            <h4>{titleize(cat)}</h4>
            <ul className="settings-list">
              {Object.keys(settings[cat]).map((option, i) => (
                <li key={i}>
                  <label>{option}:</label>
                  {this.getEditor(cat, option, settings[cat][option])}
                </li>)
              )}
            </ul>
          </div>
        ))}
      <button onClick={this.onSettingsUpdate.bind(this)}>Save settings</button>
    </div>);
  }
}

export default Settings;
