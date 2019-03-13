import React, { Component } from 'react';

export default function FormValidation(View) {
  class FormValidation extends Component {
    constructor(props) {
      super(props);

      this.state = {
        errorEmail: '',
        errorPassword: '',
        errorUsername: '',
        errorConfirmPassword: '',
      };
    }

    validateEmail = email => {
      const regexEmailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

      if (email === '') {
        this.setState({ errorEmail: 'Email is required' });
        return false;
      } else if (!regexEmailValidation.test(String(email).toLowerCase())) {
        this.setState({ errorEmail: 'Please enter a valid email address' });
        return false;
      } else {
        this.setState({ errorEmail: '' });
        return true;
      }
    };

    validatePassword = password => {
      if (password === '') {
        this.setState({ errorPassword: 'Password is required' });
        return false;
      } else {
        this.setState({ errorPassword: '' });
        return true;
      }
    };

    validateConfirmPassword = (password, confirmPassword) => {
      if (password === '') {
        this.setState({ errorPassword: 'Password is required' });
      }
      if (confirmPassword === '') {
        this.setState({ errorConfirmPassword: 'Confirm password is required' });
        return false;
      } else if (password !== confirmPassword) {
        this.setState({
          errorPassword: 'Passwords do not match',
          errorConfirmPassword: '',
        });
      } else {
        this.setState({ errorPassword: '', errorConfirmPassword: '' });
        return true;
      }
    };

    validateFirstName = firstName => {
      if (firstName === '') {
        this.setState({ errorFirstName: 'First Name is required' });
        return false;
      } else {
        this.setState({ errorFirstName: '' });
        return true;
      }
    };

    validateLastName = lastName => {
      if (lastName === '') {
        this.setState({ errorLastName: 'Last Name is required' });
        return false;
      } else {
        this.setState({ errorLastName: '' });
        return true;
      }
    };

    validateMiddleName = middleName => {
      if (middleName === '') {
        this.setState({ errorMiddleName: 'Middle Name is required' });
        return false;
      } else {
        this.setState({ errorMiddleName: '' });
        return true;
      }
    };

    render() {
      return (
        <View
          validateEmail={this.validateEmail}
          validatePassword={this.validatePassword}
          validateConfirmPassword={this.validateConfirmPassword}
          validateUsername={this.validateUsername}
          validateFirstName={this.validateFirstName}
          validateLastName={this.validateLastName}
          validateMiddleName={this.validateMiddleName}
          {...this.state}
          {...this.props}
        />
      );
    }
  }

  return FormValidation;
}
