import React, { Component } from 'react';
import TabHeader from './TabHeader';

class TabManager extends Component {

  constructor(props) {
    super(props);
    this.children = [].concat(props.children);
    this.state = {
      activeTab: this.children[0].key,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.children = [].concat(nextProps.children);
  }

  onTabClick(key) {
    this.setState({ activeTab: key });
  }

  render() {
    const tabs = this.children.map((tab, i) => (
      <TabHeader
        title={tab.key}
        isActive={tab.key === this.state.activeTab}
        key={i}
        align={tab.props.align}
        onClick={this.onTabClick.bind(this, tab.key)}
      />
    ));

    return (<div className="tab-manager">
      <div className="tab-bar">
        {tabs}
      </div>
      {this.children.find(child => child.key === this.state.activeTab)}
    </div>);
  }
}

export default TabManager;
