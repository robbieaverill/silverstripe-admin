import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, setAddon } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import JSXAddon from 'storybook-addon-jsx';

import { Component as ConfirmedPasswordField } from '../ConfirmedPasswordField';
import TextField from '../../TextField/TextField';

setAddon(JSXAddon);

storiesOf('Admin/ConfirmedPasswordField', module)
  .addDecorator(story => <div>{story()}</div>)
  .addDecorator(withKnobs)
  // See Badge-story.js for an example of how to use the "knobs" feature to control the story
  // book example component
  .addWithJSX('ConfirmedPasswordField', () => (
    <ConfirmedPasswordField
      id="password"
      name="my-password"
      data={{
        showOnClick: true,
        showOnClickTitle: 'Change password',
        minLength: 6,
        maxLength: 20,
        tests: {
          lowercase: '/[a-z]/',
          uppercase: '/[A-Z]/',
          digits: '/[0-9]/',
          punctuation: '/[^A-Za-z0-9]/',
        },
        minTestScore: 3,
      }}
      TextFieldComponent={TextField}
    />
  ));
