import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import PublicRoutes from './routes';
import * as serviceWorker from './serviceWorker';
import './index.scss';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <PublicRoutes history={history} />
        </Provider>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
