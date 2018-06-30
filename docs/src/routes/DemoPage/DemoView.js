import React, { Component } from 'react';
import { Switch, Route, NavLink as Link } from 'react-router-dom';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

class DemoView extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
          <div>
            <Link exact className="App-nav" to="/demo" activeClassName="active">
              Home
            </Link>
            <Link
              className="App-nav"
              to="/demo/feature"
              activeClassName="active"
            >
              Feature
            </Link>
          </div>
        </div>
        <div className="App-content">
          <Switch>
            {this.props.routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

export default DemoView;
