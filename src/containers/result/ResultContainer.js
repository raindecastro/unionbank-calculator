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
            Your Pre-qualification Results
          </h1>
        </div>
        <div className="resultsContainer__secondSection">
          <div>
            <p style={{ color: '#666666', marginBottom: '1em' }}>
              If results are ok: “You are pre-qualified! To proceed with your
              application, go to XXXX….”
            </p>
            <p style={{ color: '#666666', marginBottom: '2em' }}>
              If results are not ok: “We’re almost there! The bank would like to
              get some more information. Please contact XXXX…”
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
