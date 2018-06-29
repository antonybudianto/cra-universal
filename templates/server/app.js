const path = require('path');

const React = require('react');
import {
  createReactAppExpress,
  handleUniversalRender
} from '@cra-express/core';

const { default: App } = require('../src/App');
const clientBuildPath = path.resolve(__dirname, 'client');

let AppClass = App;

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: () => handleUniversalRender(<AppClass />)()
});

if (module.hot) {
  module.hot.accept('../src/App', () => {
    const { default: App } = require('../src/App');
    AppClass = App;
    console.log('✅ Server hot reloaded App');
  });
}

module.exports = app;
