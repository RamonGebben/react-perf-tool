import React, { Component } from 'react';
import styled from 'styled-components';
import TabHeader from './TabHeader';

const Wrapper = styled.div`
  position: relative;
`;

const TabBar = styled.div`
  position: absolute;
  top: 0; right: 0; left: 0;
  background-color: #F3F3F3;
  border-bottom: 1px solid #CCCCCC;
`;

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

    return (
      <Wrapper>
        <TabBar className="tab-bar">
          {tabs}
        </TabBar>
        {this.children.find(child => child.key === this.state.activeTab)}
      </Wrapper>);
  }
}

export default TabManager;
