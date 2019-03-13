import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import WelcomeContainer from './containers/welcome/WelcomeContainer';
import ResultsContainer from './containers/result/ResultContainer';
import NotFoundContainer from './containers/404/NotFoundContainer';
import UnionHeader from './shared/header/UnionHeader';
import UnionCalculator from './containers/calculator/UnionCalculator';

class PublicRoutes extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <UnionHeader />
            <Switch>
              <Route exact path="/" component={WelcomeContainer} />
              <Route exact path="/calculator" component={UnionCalculator} />
              <Route exact path="/results" component={ResultsContainer} />
              <Route component={NotFoundContainer} path="/404" />
              <Redirect from="*" to="/404" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.Auth.toJS(),
  }),
  {}
)(PublicRoutes);
