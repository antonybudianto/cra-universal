const path = require('path');
const React = require('react');
import { createReactAppExpress } from '@cra-express/core';

let App = require('../src/App').default;
const clientBuildPath = path.resolve(__dirname, '../client');

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: (req, res) => <App />
});

if (module.hot) {
  module.hot.accept('../src/App', () => {
    App = require('../src/App').default;
    console.log('✅ Server hot reloaded App');
  });
}

export default app;
