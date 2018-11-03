import React from 'react';
import { Route, Switch } from 'react-router';
import Helmet from 'react-helmet-async';

import './App.css';
import 'basscss/css/basscss.css';
import 'font-awesome/css/font-awesome.css';

const App = ({ routes, initialData }) => {
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Create React App companion for universal app. No eject, Zero config, HMR support"
        />
        <meta
          name="keywords"
          content="cra, universal, ssr, cli, react, create-react-app"
        />
        <meta
          name="google-site-verification"
          content="WNcBL13IjFpiVkI6Tu86Kc0kLsXr5Hv5kkOKYixCxfs"
        />
        <title>
          CRA Universal - Create React App companion for universal app
        </title>
      </Helmet>
      <Switch>
        {routes.map((route, index) => {
          // pass in the initialData from the server or window.DATA for this
          // specific route
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={props =>
                React.createElement(route.component, {
                  ...props,
                  routes: route.routes,
                  initialData: initialData[index] || null
                })
              }
            />
          );
        })}
      </Switch>
    </div>
  );
};

export default App;
