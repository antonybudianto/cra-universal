import { getLoadableState } from 'loadable-components/server';
import thunk from 'redux-thunk';
import { createReactAppExpress } from '@cra-express/core';
import routes from '../../src/routes';
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router');
const { matchPath } = require('react-router-dom');
const { createStore, applyMiddleware } = require('redux');

const { default: App } = require('../../src/App');
const { default: reducer } = require('../../src/reducers');
const clientBuildPath = path.resolve(__dirname, 'client');
let tag = '';
let store;
const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender,
  onEndReplace(html) {
    const state = store.getState();
    return html.replace(
      '{{SCRIPT}}',
      `${tag}<script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
        /</g,
        '\\u003c'
      )};
    </script>`
    );
  }
});

function getInitialData(ctx, store, routes) {
  const promises = routes
    .filter(route => matchPath(ctx.req.url, route))
    .map(route => route.component)
    .filter(component => component.getInitialProps)
    .map(component => component.getInitialProps(ctx, store));
  return Promise.all(promises);
}

function handleUniversalRender(req, res) {
  const context = {};
  store = createStore(reducer, applyMiddleware(thunk));
  const expressCtx = { req, res };
  return getInitialData(expressCtx, store, routes)
    .then(result => {
      const app = (
        <StaticRouter location={req.url} context={context}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>
      );
      return getLoadableState(app).then(loadableState => {
        tag = loadableState.getScriptTag();
        return ReactDOMServer.renderToNodeStream(app);
      });
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
}

module.exports = app;
