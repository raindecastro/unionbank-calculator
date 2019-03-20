import React from 'react';

import './union-switch.css';
const UnionSwitch = ({ checked, onChange, name }) => {
  return (
    <div>
      <label className="union-switch">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          value={checked}
          onChange={onChange}
        />
        <i />
      </label>
    </div>
  );
};

export default UnionSwitch;
