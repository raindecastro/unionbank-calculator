import React, { Component } from 'react';
import { connect } from 'react-redux';

import './welcome-container.scss';
import UnionButton from '../../shared/burger/button/UnionButton';

class WelcomeContainer extends Component {
  render() {
    return (
      <div className="welcomeContainer">
        <div className="welcomeContainer__firstSection">
          <h1 className="welcomeContainer__header">Get Pre-qualified now!</h1>
        </div>
        <div className="welcomeContainer__secondSection">
          <div>
            <p style={{ color: '#666666', marginBottom: '2em' }}>
              You're one step closer to getting that dream home!
            </p>
          </div>
          <UnionButton
            onClick={() => {
              this.props.history.push('/calculator');
            }}
            color="union"
            text={"LET'S BEGIN"}
          />
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({}),
  {}
)(WelcomeContainer);
