import React, { Component } from 'react';
import { connect } from 'react-redux';

import './results-container.scss';
import UnionButton from '../../shared/burger/button/UnionButton';

class ResultsContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="resultsContainer">
        <div className="resultsContainer__firstSection">
          <h1 className="resultsContainer__header">
            Pre-qualififcation Result
          </h1>
        </div>
        <div className="resultsContainer__secondSection">
          <div>
            <p style={{ color: '#666666', marginBottom: '1em' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
            <p style={{ color: '#666666', marginBottom: '2em' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
          <div className="resultsContainer__infoList">
            <span className="resultsContainer__referenceNo">
              Prequal Reference No: 909090998
            </span>
          </div>
          <UnionButton
            onClick={() => {
              this.props.history.push('/');
            }}
            color="union"
            text={'CONTINUE'}
          />
          <div className="resultsContainer__footer">
            <span className="resultsContainer__footerSmall">
              Any inquiries regarding your pre-qualification?
            </span>
            <span className="resultsContainer__referenceNo">CLICK HERE</span>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({}),
  {}
)(ResultsContainer);
