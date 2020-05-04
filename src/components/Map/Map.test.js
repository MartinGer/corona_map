import React from 'react';
import { shallow } from 'enzyme';
import Map from './map';

describe('test Map component', () => {
  it('renders without crashing', () => {
    shallow(<Map />);
  });
});
