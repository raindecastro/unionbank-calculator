import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './burger.scss';
const logo = require('../../assets/images/logo.png');
class UnionBurger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <Menu isOpen={menuOpen} width={'100%'} right>
        <img src={logo} alt="logo" />
        <br />
        <br />
        <Link onClick={() => this.closeMenu()} to="/">
          <span id="home" className="menu-item" href="/">
            Home
          </span>
        </Link>
        <Link onClick={() => this.closeMenu()} to="/calculator">
          <span id="about" className="menu-item" href="/about">
            Calculator
          </span>
        </Link>
        <Link onClick={() => this.closeMenu()} to="/results">
          <span id="contact" className="menu-item" href="/contact">
            Results
          </span>
        </Link>
      </Menu>
    );
  }
}

export default UnionBurger;
