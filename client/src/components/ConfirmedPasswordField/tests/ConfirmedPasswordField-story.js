import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, setAddon } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import JSXAddon from 'storybook-addon-jsx';

import ConfirmedPasswordField from '../ConfirmedPasswordField';


setAddon(JSXAddon);

storiesOf('Admin/ConfirmedPasswordField', module)
  .addDecorator(story => <div>{story()}</div>)
  .addDecorator(withKnobs)
  // See Badge-story.js for an example of how to use the "knobs" feature to control the story
  // book example component
  .addWithJSX('ConfirmedPasswordField', () => (
    <ConfirmedPasswordField />
  ));
