const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router');
const { createStore } = require('redux');
const { createReactAppExpress } = require('./cra-express-custom');

const {default: App} = require('../../src/App');
const {default: reducer} = require('../../src/reducers');
const clientBuildPath = path.resolve(__dirname, 'client');
const preloadedState = {
  app: {
    appName: 'CRA Universal',
    news: [
      'This is news from server'
    ]
  }
};
const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender,
  replaceMap: {
    '<!--{{SCRIPT}}-->': `
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
    `
  }
});

const store = createStore(reducer, preloadedState);

function handleUniversalRender(req, res) {
  const context = {};
  const stream = ReactDOMServer.renderToNodeStream(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(301, context.url);
    return;
  }

  return stream;
}

module.exports = app;
