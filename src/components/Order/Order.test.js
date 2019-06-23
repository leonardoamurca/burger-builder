import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Order from './Order';

configure({ adapter: new Adapter() });
let wrapper;

describe('<Order/>', () => {
  beforeEach(() => {
    wrapper = mount(<Order ingredients="ola" />);
    // const ings = [{name: 'bacon'}]
  });
  it('should have four ingredients', () => {
    expect(wrapper.prop('ingredients')).toEqual('ola');
  });
});
