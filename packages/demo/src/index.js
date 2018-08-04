import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadComponents } from 'loadable-components';

import './index.css';
import App from './App';
import reducer from './reducers';
// import registerServiceWorker from './registerServiceWorker';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState, applyMiddleware(thunk));

loadComponents().then(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
  // registerServiceWorker();
});

if (module.hot) {
  module.hot.accept();
}
