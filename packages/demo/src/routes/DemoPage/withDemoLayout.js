import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

function withDemoLayout(Page) {
  class DemoLayout extends Component {
    render() {
      return (
        <div className="App">
          <div className="App-header">
            <h2>Welcome to React</h2>
            <div>
              <Link exact className="App-nav" to="/" activeClassName="active">
                Landing
              </Link>
              <Link
                exact
                className="App-nav"
                to="/demo"
                activeClassName="active"
              >
                Home
              </Link>
              <Link
                className="App-nav"
                to="/demo/about"
                activeClassName="active"
              >
                About
              </Link>
            </div>
          </div>
          <div className="App-content">
            <Page {...this.props} />
          </div>
        </div>
      );
    }
  }

  DemoLayout.displayName = `DemoLayout(${getDisplayName(Page)})`;
  DemoLayout.getInitialData = Page.getInitialData;
  return DemoLayout;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withDemoLayout;
