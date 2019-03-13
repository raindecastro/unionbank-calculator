import React from 'react';
import './union-button.scss';

const UnionButton = ({ text, color, onClick, disabled, style }) => {
  return (
    <button
      style={style}
      disabled={disabled}
      className={`union-button ${color}`}
      onClick={onClick}
    >
      <span className="union-button__text">{text}</span>
    </button>
  );
};

export default UnionButton;
