import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { NavLink as Link } from 'react-router-dom';

import routes from './routes';
import './App.css';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
          <div>
            <Link exact className="App-nav" to="/" activeClassName="active">
              Home
            </Link>
            <Link className="App-nav" to="/feature" activeClassName="active">
              Feature
            </Link>
          </div>
        </div>
        <div className="App-content">
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
