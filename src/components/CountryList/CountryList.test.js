import React from 'react';
import { shallow } from 'enzyme';
import CountryList from './CountryList';

describe('test CountryList component', () => {
  it('renders without crashing', () => {
    shallow(<CountryList />);
  });
});
