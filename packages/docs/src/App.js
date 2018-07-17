import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

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
      <Switch>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </Switch>
    );
  }
}

export default App;
