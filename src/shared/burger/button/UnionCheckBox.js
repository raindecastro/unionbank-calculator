import React from 'react';
import './union-checkbox.scss';

const PahiramCheckBox = ({ checked, onCheckedBox }) => {
  return (
    <label className="container">
      <input
        onClick={e => {
          onCheckedBox(e.target.checked);
        }}
        type="checkbox"
        checked={checked}
      />
      <span className="checkmark" />
    </label>
  );
};

export default PahiramCheckBox;
