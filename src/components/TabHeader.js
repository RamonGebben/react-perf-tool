import React from 'react';
import titleize from '../utils/titleize';

export default function TabHeader(props) {
  return (<div className={`tab-header ${props.isActive ? 'active' : ''}`} onClick={props.onClick}>
    {titleize(props.title)}
  </div>);
}
