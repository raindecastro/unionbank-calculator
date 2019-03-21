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
import UnionCheckBox from '../../shared/burger/button/UnionCheckBox';

import {
  formatPesos,
  getAmmortization,
  getTotalAmount,
} from '../../helpers/utility';
import './union-calculator.scss';
import UnionRadioButton from '../../shared/burger/button/UnionRadioButton';
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
      downpayment: 10,
      loanTenure: 1,
      ammortization: 0,
      totalAmount: 0,
      focused: false,
      advancedSettingsIsOpen: false,
      confirmation: false,
      showError: false,
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
    let change = {};
    if (
      e.target.name === 'phone' &&
      e.target.value &&
      e.target.value.indexOf('+') === -1
    ) {
      e.target.value = `+${e.target.value}`;
    }
    change[e.target.name] = e.target.value;
    this.setState(change, () => this.formComputation());
    this.setState({ showError: false });
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
      confirmation,
      showError,
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
          <span className="scout-input__label">Downpayment</span>
          <div className="unionCalculator__downpayment">
            <UnionRadioButton
              onClick={() => {
                this.setState({ downpayment: 10 }, () =>
                  this.formComputation()
                );
              }}
              color="union"
              text="10%"
              selected={downpayment === 10}
            />
            <UnionRadioButton
              onClick={() =>
                this.setState({ downpayment: 20 }, () => this.formComputation())
              }
              color="union"
              text="20%"
              selected={downpayment === 20}
            />
          </div>
          <br />
          <span className="scout-input__label">Length of Loan (Years)</span>
          <div className="unionCalculator__loanYears">
            <UnionRadioButton
              onClick={() =>
                this.setState({ loanTenure: 1 }, () => this.formComputation())
              }
              color="union"
              text="1"
              selected={loanTenure === 1}
            />
            <UnionRadioButton
              onClick={() =>
                this.setState({ loanTenure: 3 }, () => this.formComputation())
              }
              color="union"
              text="3"
              selected={loanTenure === 3}
            />
            <UnionRadioButton
              onClick={() =>
                this.setState({ loanTenure: 5 }, () => this.formComputation())
              }
              color="union"
              text="5"
              selected={loanTenure === 5}
            />
          </div>
          <div className="unionCalculator__loanYears">
            <UnionRadioButton
              onClick={() =>
                this.setState({ loanTenure: 10 }, () => this.formComputation())
              }
              color="union"
              text="10"
              selected={loanTenure === 10}
            />
            <UnionRadioButton
              onClick={() =>
                this.setState({ loanTenure: 15 }, () => this.formComputation())
              }
              color="union"
              text="15"
              selected={loanTenure === 15}
            />
            <UnionRadioButton
              onClick={() =>
                this.setState({ loanTenure: 20 }, () => this.formComputation())
              }
              color="union"
              text="20"
              selected={loanTenure === 20}
            />
          </div>
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
              isOutsideRange={() => false}
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
          <div className="unionCalculator__confirmation">
            <UnionCheckBox
              checked={confirmation}
              onCheckedBox={() =>
                this.setState({ confirmation: !confirmation, showError: false })
              }
            />
            <p>
              I confirm that all information provided are true and correct. I
              accept that the use of this app may require processing of my data
              for the purposes of credit scoring and credit checks (i.e. NFIS).
              — will be reworded
            </p>
          </div>
          {showError && (
            <div>
              <span className="unionCalculator__error">
                Confirmation is required
              </span>
            </div>
          )}
          <br />
          <UnionButton
            onClick={() => {
              if (confirmation) {
                this.onFormSend();
              } else {
                this.setState({ showError: true });
              }
            }}
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
