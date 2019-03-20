import React, { Component } from 'react';
import { connect } from 'react-redux';
import UnionButton from '../../shared/burger/button/UnionButton';
import UnionInput from '../../shared/input/UnionInput';
import FormValidation from '../../helpers/FormValidation';
import { animateScroll as scroll } from 'react-scroll';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import UnionSwitch from '../../shared/input/UnionSwitch';
import { Collapse } from 'react-collapse';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

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
      birthDate: null,
      monthlySalary: 0,
      downpayment: 0,
      loanTenure: 0,
      ammortization: 0,
      totalAmount: 0,
      focused: false,
      advancedSettingsIsOpen: false,
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

  renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <select
            value={month.month()}
            onChange={e => onMonthSelect(month, e.target.value)}
          >
            {moment.months().map((label, value) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={month.year()}
            onChange={e => onYearSelect(month, e.target.value)}
          >
            {this.returnYears()}
          </select>
        </div>
      </div>
    );
  };
  returnYears = () => {
    let years = [];
    for (let i = moment().year() - 100; i <= moment().year(); i++) {
      years.push(<option value={i}>{i}</option>);
    }
    return years;
  };

  render() {
    const {
      ammortization,
      monthlySalary,
      loanTenure,
      downpayment,
      advancedSettingsIsOpen,
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
              <p>Let us help you compute your approvable loan amount</p>
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
            label="Downpayment (%)"
            placeholder="0.00%"
          />
          <UnionInput
            name="loanTenure"
            onChange={e => {
              this.handleInputChange(e);
            }}
            label="Length of Loan (Years)"
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
            {/* <span className="unionCalculator__summaryLabel">Interest Rate</span>
            <p>8%</p>
            <br /> */}
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
          {/* <UnionInput
            name="birthDate"
            style={{ backgroundColor: 'white', marginBottom: '2em' }}
            label="Birth Date"
            placeholder="Enter Birth Date"
            onChange={e => this.handleInputChange(e)}
          /> */}
          <div className="unionCalculator__birthDiv">
            <span className="scout-input__label">Birth Date</span>
            <SingleDatePicker
              date={this.state.birthDate} // momentPropTypes.momentObj or null
              onDateChange={date => this.setState({ birthDate: date })} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              id="your_unique_id" // PropTypes.string.isRequired,
              small={true}
              numberOfMonths={1}
              placeholder="Enter Birth Date"
              renderMonthElement={this.renderMonthElement}
            />
          </div>
          <div className="unionCalculator__switchDiv">
            <UnionSwitch
              checked={advancedSettingsIsOpen}
              onChange={() =>
                this.setState({
                  advancedSettingsIsOpen: !advancedSettingsIsOpen,
                })
              }
            />
            <span>SHOW MORE</span>
          </div>
          <Collapse isOpened={advancedSettingsIsOpen}>
            <UnionInput
              name="firstName"
              style={{ backgroundColor: 'white' }}
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              onChange={e => this.handleInputChange(e)}
              // errorMessage={this.props.errorFirstName}
            />
            <UnionInput
              name="firstName"
              style={{ backgroundColor: 'white' }}
              label="Project Name"
              placeholder="Enter Project Name"
              onChange={e => this.handleInputChange(e)}
              // errorMessage={this.props.errorFirstName}
            />
          </Collapse>
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
