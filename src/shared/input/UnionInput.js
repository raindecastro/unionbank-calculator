import React from 'react';

import './union-input.scss';
const alertIcon = require('../../assets/images/alert-icon.svg');
const UnionInput = ({
  label,
  disabled,
  placeholder,
  onChange,
  value,
  errorMessage,
  name,
  type,
  style,
}) => {
  return (
    <div className="scout-input__container">
      {!!label && <span className="scout-input__label">{label}</span>}
      <input
        name={name}
        type={type}
        disabled={disabled}
        onChange={onChange}
        value={value}
        className={`scout-input ${
          !!errorMessage === true ? 'scout-input--error' : ''
        }`}
        placeholder={placeholder}
        style={style}
      />
      {!!errorMessage && (
        <div className="scout-input__error">
          <img
            className="scout-input__error__icon"
            src={alertIcon}
            alt="alert-icon"
          />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default UnionInput;
