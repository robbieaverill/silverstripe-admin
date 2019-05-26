import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Input, FormGroup, FormFeedback, Label, Row } from 'reactstrap';
import zxcvbn from 'zxcvbn';

/**
 * A map of zxcvbn strength ratings to labels used for the UI
 */
export const scores = {
  0: {
    label: 'Bad',
    class: 'bad',
    icon: 'font-icon-block',
  },
  1: {
    label: 'Bad',
    class: 'bad',
    icon: 'font-icon-block',
  },
  2: {
    label: 'Too weak',
    class: 'weak',
    icon: 'font-icon-block',
  },
  3: {
    label: 'Okay',
    class: 'okay',
    icon: 'font-icon-check-mark-circle',
  },
  4: {
    label: 'Great',
    class: 'great',
    icon: 'font-icon-check-mark-circle',
  },
};

// eslint-disable-next-line react/prefer-stateless-function
class ConfirmedPasswordField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
      confirmPassword: null,
      strength: 0,
    };
  }

  /**
   * @returns {string|null}
   */
  getPasswordValue() {
    return this.state.password;
  }

  /**
   * @returns {string|null}
   */
  getConfirmPasswordValue() {
    return this.state.confirmPassword;
  }

  /**
   * @param {object} event
   */
  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  /**
   * @param {object} event
   */
  handleChangeConfirmPassword(event) {
    this.setState({
      confirmPassword: event.target.value,
    });
  }

  /**
   * @returns {boolean}
   */
  passwordsMatch() {
    return this.getPasswordValue() === this.getConfirmPasswordValue();
  }

  /**
   * @returns {boolean}
   */
  isPasswordValid() {
    const { password } = this.state;
    const { data } = this.props;

    if (!password) {
      return false;
    }

    if (data.minLength && password.length < data.minLength) {
      return false;
    }

    if (data.maxLength && password.length > data.maxLength) {
      return false;
    }

    if (data.minTestScore > 0) {
      let score = 0;
      for (const [testName, testPattern] of Object.entries(data.tests)) {
        const regex = new RegExp(testPattern.slice(1, -1)); // remove / from either end
        if (!regex.test(password)) {
          return false;
        }
        score++;
      }

      if (score < data.minTestScore) {
        return false;
      }
    }

    return true;
  }

  renderPasswordField() {
    const { id, name } = this.props;

    return (
      <FormGroup>
        <Label for={id}>New password</Label>
        <Input
          id={id}
          type="password"
          name={name}
          onChange={(event) => this.handleChangePassword(event)}
        />
      </FormGroup>
    );
  }

  renderConfirmPasswordField() {
    const { id, name } = this.props;

    const confirmId = `${id}-confirm`;
    const confirmName = `${name}-confirm`;
    const isInvalid = this.getPasswordValue() && this.getConfirmPasswordValue() && !this.passwordsMatch();

    return (
      <FormGroup>
        <Label for={confirmId}>Confirm password</Label>
        <Input
          id={confirmId}
          type="password"
          invalid={isInvalid}
          name={confirmName}
          onChange={(event) => this.handleChangeConfirmPassword(event)}
        />
        { isInvalid && <FormFeedback invalid>Passwords must match</FormFeedback> }
      </FormGroup>
    );
  }

  renderRules() {
    const { data } = this.props;

    if (!data.minLength && !data.maxLength && !data.minTestScore) {
      return;
    }

    let rules = [];
    if (data.minLength > 0) {
      rules.push(`min. ${data.minLength} characters`);
    }

    if (data.maxLength > 0) {
      rules.push(`max. ${data.maxLength} characters`);
    }

    const testsKeys = Object.keys(data.tests);
    if (data.minTestScore > 0 && testsKeys.length) {
      rules.push(`at least ${data.minTestScore} of: ${testsKeys.join(', ')}`);
    }

    const rulesJoined = rules.join(', ');
    const rulesText = rulesJoined.charAt(0).toUpperCase() + rulesJoined.slice(1);

    return (
      <Row>
        <p>
          New password should include:<br/>
          <i>{rulesText}</i>
        </p>
      </Row>
    )
  }

  renderStrengthIndicator() {
    const { password } = this.state;

    if (!password) {
      return null;
    }

    // Override with invalid SilverStripe rules if set
    // let score = this.isPasswordValid() ? zxcvbn(password).score : 0;
    const score = zxcvbn(password).score;
    const strengthRatingData = scores[score];
    const iconClassName = classnames(
      'confirmed-password-field__strength-icon',
      `confirmed-password-field__strength-icon--${strengthRatingData.class}`,
      strengthRatingData.icon,
    );

    return (
      <div className="confirmed-password-field__strength input-group-append">
        <i className={iconClassName} aria-hidden={true} />
        { strengthRatingData.label }
      </div>
    )
  }

  render() {
    const { extraClass } = this.props;

    return (
      <div className={classnames('confirmed-password-field', extraClass)}>
        { this.renderRules() }
        <Row>
          <div className="input-group">
            { this.renderPasswordField() }
            { this.renderStrengthIndicator() }
          </div>
        </Row>
        <Row>
          { this.renderConfirmPasswordField() }
        </Row>
      </div>
    )
  }
}

ConfirmedPasswordField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  extraClass: PropTypes.string,
  data: PropTypes.shape({
    // Whether to show the fields on click of the title link, or show by default
    showOnClick: PropTypes.bool,
    // Title for "Change Password" button/link
    showOnClickTitle: PropTypes.string,
    // Optional: minimum password length
    minLength: PropTypes.number,
    // Optional: maximum password length
    maxLength: PropTypes.number,
    // Optional: key => regex pattern tests, see PHP PasswordValidator
    tests: PropTypes.object,
    // Optional: if using tests, minimum score required
    minTestScore: PropTypes.number,
  }),
};

export { ConfirmedPasswordField as Component };

export default ConfirmedPasswordField;
