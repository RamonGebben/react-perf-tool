import React from 'react';
import styled from 'styled-components';
import titleize from '../utils/titleize';

const Header = styled.div`
  display: inline-block;
  padding: 0.8em;
  font-size: 12px;
  max-width: 10em; width: 100%;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  transition: all .2s ease-out;
  user-select: none;

  &:hover {
    background-color: #e5e5e5;
    transition: all .2s ease-out;
  }

  &.left { float: left; }
  &.right { float: right; }

  &.active {
    border-bottom: 1px solid #3879D9;
  }
`;

export default function TabHeader(props) {
  return (
    <Header
      className={`tab-header ${props.isActive ? 'active' : ''} ${props.align}`}
      onClick={props.onClick}
    >
      {titleize(props.title)}
    </Header>);
}
