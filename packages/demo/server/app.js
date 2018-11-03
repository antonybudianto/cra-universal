import { getLoadableState } from 'loadable-components/server';
import thunk from 'redux-thunk';
import { createReactAppExpress } from '@cra-express/core';
import { getInitialData } from '@cra-express/router-prefetcher';
import { HelmetProvider } from 'react-helmet-async';

import routes from '../src/routes';
const path = require('path');
const React = require('react');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router');
const { createStore, applyMiddleware } = require('redux');

const { default: App } = require('../src/App');
const { default: reducer } = require('../src/reducers');
const clientBuildPath = path.resolve(__dirname, '../client');
let tag = '';
let store;
let AppClass = App;
let serverData;
let helmetCtx;
const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender,
  onFinish(req, res, html) {
    const { helmet } = helmetCtx;
    const helmetTitle = helmet.title.toString();
    const helmetMeta = helmet.meta.toString();
    const newHtml = html
      .replace('{{HELMET_TITLE}}', helmetTitle)
      .replace('{{HELMET_META}}', helmetMeta);
    res.send(newHtml);
  },
  onEndReplace(html) {
    const state = store.getState();
    return html.replace(
      '{{SCRIPT}}',
      `${tag}<script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
        /</g,
        '\\u003c'
      )};
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
  helmetCtx = {};
  store = createStore(reducer, applyMiddleware(thunk));
  return getInitialData(req, res, routes)
    .then(data => {
      serverData = data;
      const app = (
        <HelmetProvider context={helmetCtx}>
          <StaticRouter location={req.url} context={context}>
            <Provider store={store}>
              <AppClass routes={routes} initialData={data} />
            </Provider>
          </StaticRouter>
        </HelmetProvider>
      );
      return getLoadableState(app).then(loadableState => {
        tag = loadableState.getScriptTag();
        return app;
      });
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
}

if (module.hot) {
  module.hot.accept('../src/App', () => {
    const { default: App } = require('../src/App');
    AppClass = App;
    console.log('✅ Server hot reloaded App');
  });
  module.hot.accept('../src/routes', () => {
    console.log('✅ Server hot reloaded routes');
  });
}

export default app;
