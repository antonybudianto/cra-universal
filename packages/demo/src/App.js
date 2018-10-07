import React from 'react';
import { Route, Switch } from 'react-router';

import './App.css';
import 'basscss/css/basscss.css';
import 'font-awesome/css/font-awesome.css';

const App = ({ routes, initialData }) => {
  return (
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
  );
};

export default App;
