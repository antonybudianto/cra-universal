import { getLoadableState } from 'loadable-components/server';
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router');
const { createStore } = require('redux');
const { createReactAppExpress } = require('create-react-app-express');

const {default: App} = require('../../src/App');
const {default: reducer} = require('../../src/reducers');
const clientBuildPath = path.resolve(__dirname, 'client');
let tag = ''
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
  onEndReplace(html) {
    return html.replace('{{SCRIPT}}', `${tag}<script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>`
    )
  }
});

const store = createStore(reducer, preloadedState);

function handleUniversalRender(req, res) {
  const context = {};
  const app = (
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
  return getLoadableState(app).then(loadableState => {
    tag = loadableState.getScriptTag();
    return ReactDOMServer.renderToNodeStream(app);
  });
}

module.exports = app;
