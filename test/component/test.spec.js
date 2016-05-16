import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

function Foo(props) {
  return (<div></div>);
}

describe('<Foo />', () => {
  it('should not be undefined', () => {
    const wrapper = mount(<Foo />);
    expect(wrapper).to.not.be.undefined;
  });
});
