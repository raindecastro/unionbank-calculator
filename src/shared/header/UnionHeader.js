import React from 'react';
import UnionBurger from '../burger/UnionBurger';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './header.scss';
const logo = require('../../assets/images/logo.png');

const UnionHeader = ({ showLoginModal }) => {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__image" src={logo} alt="unionbank-logo" />
      </Link>
      <UnionBurger />
    </header>
  );
};

export default withRouter(UnionHeader);
