/* global jest, describe, it, expect */

import React from 'react';
import ConfirmedPasswordField from '../ConfirmedPasswordField';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('ConfirmedPasswordField', () => {
  describe('render()', () => {
    it('has a temporary unit test', () => {
      const wrapper = shallow(
        <ConfirmedPasswordField />
      );

      expect(wrapper.text()).toContain('Coming soon');
    });
  });
});
