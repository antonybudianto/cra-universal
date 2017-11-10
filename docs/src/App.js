import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import loadable from 'loadable-components'

import HomeView from './pages/HomeView';
import './App.css';

const LoadableFeatView = loadable(() => import('./pages/FeatureView'));

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Link className="App-nav" to="/">Home</Link>
          <Link className="App-nav" to="/feature">Feature</Link>
        </div>
        <div className="App-content">
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/feature" component={LoadableFeatView} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
