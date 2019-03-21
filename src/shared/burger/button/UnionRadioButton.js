import React from 'react';
import './union-radio-button.scss';

const UnionRadioButton = ({
  text,
  color,
  onClick,
  disabled,
  style,
  selected,
}) => {
  return (
    <button
      style={style}
      disabled={disabled}
      className={`union-radio-button${selected ? '__selected' : ''} ${color}`}
      onClick={onClick}
    >
      <span className="union-button__text">{text}</span>
    </button>
  );
};

export default UnionRadioButton;
