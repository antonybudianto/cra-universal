import React from 'react';
import { Route, Switch } from 'react-router';
import { Helmet } from 'react-helmet-async';

import './App.css';
import 'basscss/css/basscss.css';
import 'font-awesome/css/font-awesome.css';

const meta = {
  title: 'CRA Universal - Create React App companion for universal app',
  desc:
    'Create React App companion for universal app. No eject, Zero config, HMR support'
};

const App = ({ routes, initialData }) => {
  return (
    <div>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.desc} />
        <meta
          name="keywords"
          content="cra, universal, ssr, cli, react, create-react-app"
        />
        <meta
          name="google-site-verification"
          content="WNcBL13IjFpiVkI6Tu86Kc0kLsXr5Hv5kkOKYixCxfs"
        />
        <meta property="og:description" content={meta.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CRA Universal" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:url" content="https://cra-universal.now.sh/" />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/7658554/42420108-261a1c5a-82eb-11e8-8ac0-ce2e0245e0ff.png"
        />

        <meta name="robots" content="index, follow" />
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
