import React, { Component } from 'react';
import { connect } from 'react-redux';
import UnionButton from '../../shared/burger/button/UnionButton';
import UnionInput from '../../shared/input/UnionInput';
import FormValidation from '../../helpers/FormValidation';
import { animateScroll as scroll } from 'react-scroll';

import {
  formatPesos,
  getAmmortization,
  getTotalAmount,
} from '../../helpers/utility';

import './union-calculator.scss';
const arrowDown = require('../../assets/images/arrow-down.svg');
const pesoSign = '\u20B1';
class UnionCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      middleName: '',
      monthlySalary: 0,
      downpayment: 0,
      loanTenure: 0,
      ammortization: 0,
      totalAmount: 0,
    };
  }

  formComputation = () => {
    const { monthlySalary, downpayment, loanTenure } = this.state;

    //AMORTIZATION
    let ammortization = getAmmortization(monthlySalary);
    this.setState({ ammortization });
    //TOTAL AMOUNT
    let ta, z, totalAmount;
    ta = ammortization * (loanTenure * 12);
    z = ta * (downpayment / 100);
    totalAmount = ta - z;
    this.setState({ totalAmount });
  };

  handleInputChange = e => {
    this.formComputation();
    let change = {};
    if (
      e.target.name === 'phone' &&
      e.target.value &&
      e.target.value.indexOf('+') === -1
    ) {
      e.target.value = `+${e.target.value}`;
    }
    change[e.target.name] = e.target.value;
    this.setState(change);
    if (e.target.name === 'firstName') {
      this.props.validateFirstName(e.target.value);
    } else if (e.target.name === 'lastName') {
      this.props.validateLastName(e.target.value);
    } else if (e.target.name === 'middleName') {
      this.props.validateMiddleName(e.target.value);
    }
  };

  onFormSend = () => {
    const {
      validateFirstName,
      validateLastName,
      validateMiddleName,
    } = this.props;
    const { firstName, lastName, middleName } = this.state;

    validateFirstName(firstName);
    validateLastName(lastName);
    validateMiddleName(middleName);

    if (
      validateFirstName(firstName) &&
      validateLastName(lastName) &&
      validateMiddleName(middleName)
    ) {
      this.props.history.push('/results');
    } else {
      console.log('HERE HERE');
      this.props.history.push('/results');
    }
  };

  render() {
    const {
      ammortization,
      monthlySalary,
      loanTenure,
      downpayment,
    } = this.state;
    return (
      <div className="unionCalculator">
        <div className="unionCalculator__firstSection">
          <div className="unionCalculator__info">
            <div className="unionCalculator__title">
              <div className="unionCalculator__number">
                <span>1</span>
              </div>
              <h1>Calculator</h1>
            </div>
            <div className="unionCalculator__description">
              <p>We'll help you calculate how much is your approvable loan</p>
            </div>
          </div>
          <UnionInput
            name="monthlySalary"
            onChange={e => {
              this.handleInputChange(e);
            }}
            label="Monthly Salary"
            placeholder="0.00"
          />
          <UnionInput
            name="downpayment"
            onChange={e => {
              this.handleInputChange(e);
            }}
            label="Down Payment"
            placeholder="0.00%"
          />
          <UnionInput
            name="loanTenure"
            onChange={e => {
              this.handleInputChange(e);
            }}
            label="Loan Tenure"
            placeholder="0"
          />
          <div className="unionCalculator__summary">
            <span className="unionCalculator__summaryLabel">
              Total Loanable Property Amount
            </span>
            <h1 className="unionCalculator__summaryTotal">
              {pesoSign}{' '}
              {formatPesos(
                getTotalAmount(ammortization, loanTenure, downpayment)
              )}
            </h1>
            <br />
            <span className="unionCalculator__summaryLabel">Interest Rate</span>
            <p>8%</p>
            <br />
            <span className="unionCalculator__summaryLabel">
              Monthly Ammortization
            </span>
            <p>
              {pesoSign} {formatPesos(getAmmortization(monthlySalary))}
            </p>
          </div>
          <span className="unionCalculator__summarySmall">
            *This may increase if you're including a co-borrower on your actual
            application
          </span>
        </div>
        <div
          onClick={() => scroll.scrollToBottom()}
          className="unionCalculator__continueButton"
        >
          <img src={arrowDown} alt="arrow-down" />
          <span className="unionCalculator__arrowDown">Continue</span>
        </div>
        <div className="unionCalculator__form">
          <div className="unionCalculator__info">
            <div className="unionCalculator__title">
              <div className="unionCalculator__number">
                <span>2</span>
              </div>
              <h1>We want to know more about you</h1>
            </div>
          </div>
          <UnionInput
            name="firstName"
            style={{ backgroundColor: 'white' }}
            label="First Name"
            placeholder="Enter First Name"
            onChange={e => this.handleInputChange(e)}
            // errorMessage={this.props.errorFirstName}
          />
          <UnionInput
            name="middleName"
            style={{ backgroundColor: 'white' }}
            label="Middle Name"
            placeholder="Enter Middle Name"
            onChange={e => this.handleInputChange(e)}
            // errorMessage={this.props.errorMiddleName}
          />
          <UnionInput
            name="lastName"
            style={{ backgroundColor: 'white' }}
            label="Last Name"
            placeholder="Enter Last Name"
            onChange={e => this.handleInputChange(e)}
            // errorMessage={this.props.errorLastName}
          />
          <UnionInput
            name="birthDate"
            style={{ backgroundColor: 'white', marginBottom: '2em' }}
            label="Birth Date"
            placeholder="Enter Birth Date"
            onChange={e => this.handleInputChange(e)}
          />
          <UnionButton
            onClick={() => this.onFormSend()}
            color="union"
            text="SEND"
          />
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({}),
  {}
)(FormValidation(UnionCalculator));
