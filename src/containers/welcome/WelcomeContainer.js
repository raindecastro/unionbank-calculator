import React, { Component } from 'react';
import { connect } from 'react-redux';

import './welcome-container.scss';
import UnionButton from '../../shared/burger/button/UnionButton';

class WelcomeContainer extends Component {
  render() {
    return (
      <div className="welcomeContainer">
        <div className="welcomeContainer__firstSection">
          <h1 className="welcomeContainer__header">
            Motivate User To Use Pre-Qual
          </h1>
        </div>
        <div className="welcomeContainer__secondSection">
          <div>
            <p style={{ color: '#666666', marginBottom: '2em' }}>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              pretium commodo magna id sagittis. Nullam non ipsum dolor. Donec
              blandit gravida ex.
            </p>
          </div>
          <div className="welcomeContainer__infoList">
            <span>> Get faster approval after you apply</span>
            <br />
            <span>> Get faster approval after you apply</span>
            <br />
            <span>> Get faster approval after you apply</span>
          </div>
          <UnionButton
            onClick={() => {
              this.props.history.push('/calculator');
            }}
            color="union"
            text={'GET PRE-QUALIFIED'}
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
