import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 2.1em; right: 0; bottom: 0; left: 0;
  height: 100%;
`;

export default function Tab(props) {
  return (
    <Wrapper>
      {props.children}
    </Wrapper>);
}
