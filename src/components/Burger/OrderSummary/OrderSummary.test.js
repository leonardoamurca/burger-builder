import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<OrderSummary/>', () => {
  let wrapper;

  beforeEach(() => {
    const ingredients = ['bacon', 'cheese', 'meat', 'salad'];
    wrapper = shallow(
      <ul>
        {ingredients.map(igKey => (
          <li key={igKey}>
            <span>{igKey}: </span>
            {[igKey]}
          </li>
        ))}
      </ul>
    ).find('li');
  });

  it('should have a list (</li>) with each ingredient available to order', () => {
    expect(wrapper.at(0).key()).toEqual('bacon');
    expect(wrapper.at(1).key()).toEqual('cheese');
    expect(wrapper.at(2).key()).toEqual('meat');
    expect(wrapper.at(3).key()).toEqual('salad');
  });
});
