const path = require('path');

const React = require('react');
import { createReactAppExpress } from '@cra-express/core';

const { default: App } = require('appbase/src/App');
const clientBuildPath = path.resolve(__dirname, '../client');

let AppEl = App;

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: () => <AppEl />
});

if (module.hot) {
  module.hot.accept('appbase/src/App', () => {
    const { default: App } = require('appbase/src/App');
    AppEl = App;
    console.log('✅ Server hot reloaded App');
  });
}

export default app;
