# @cra-express/router-prefetcher

> Simple utility to map your routes and prefetch your data on server

> You might want to wait for React Suspense, [demo](https://github.com/acdlite/suspense-ssr-demo/)

> :warning: **Alpha** stage. API may change, don't use on production yet!

## Prerequisites

- React Router with array config
- Promise support

## Start

```
npm i @cra-express/router-prefetcher
```

## Setup and Usage

- Add `{{SCRIPT}}` to public/index.html

```html
<div id="root"></div>
{{SCRIPT}}
```

```js
// server/app.js

import { createReactAppExpress } from '@cra-express/core';
import { getInitialData } from '@cra-express/router-prefetcher';
import routes from '../src/routes';
const path = require('path');
const React = require('react');
const { StaticRouter } = require('react-router');

const { default: App } = require('../src/App');
const clientBuildPath = path.resolve(__dirname, '../client');
let AppClass = App;
let serverData;
const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender,
  onEndReplace(html) {
    const state = store.getState();
    return html.replace(
      '{{SCRIPT}}',
      `<script>
        window.__INITIAL_DATA__ = ${JSON.stringify(serverData).replace(
          /</g,
          '\\u003c'
        )};
      </script>`
    );
  }
});

function handleUniversalRender(req, res) {
  const context = {};
  return getInitialData(req, res, routes)
    .then(data => {
      serverData = data;
      const app = (
        <StaticRouter location={req.url} context={context}>
          <AppClass routes={routes} initialData={data} />
        </StaticRouter>
      );
      return app;
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
}

export default app;
```

```js
// src/index.js

import routes from './routes';

const data = window.__INITIAL_DATA__;
ReactDOM.hydrate(
  <BrowserRouter>
    <App routes={routes} initialData={data} />
  </BrowserRouter>,
  document.getElementById('root')
);
```

```js
// src/App.js

import React from 'react';
import { Route, Switch } from 'react-router';

const App = ({ routes, initialData }) => {
  return (
    <Switch>
      {routes.map((route, index) => {
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
```

```js
// src/routes/DemoPage/AboutView.js

import React from 'react';

import withSSR from '../../components/withSSR';

class AboutView extends React.Component {
  static getInitialData({ match, req, res }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          article: `
This text is ALSO server rendered if and only if it's the initial render.
          `,
          currentRoute: match.pathname
        });
      }, 500);
    });
  }

  render() {
    const { isLoading, article, error } = this.props;
    return (
      <div>
        <h1>About</h1>
        {isLoading && <div>Loading from client...</div>}
        {error && <div>{JSON.stringify(error, null, 2)}</div>}
        {article && <div>{article}</div>}
      </div>
    );
  }
}

export default withSSR(AboutView);
```

Please get the `withSSR` code [here](https://github.com/jaredpalmer/react-router-nextjs-like-data-fetching/blob/master/src/components/withSSR.js)

## License

MIT
