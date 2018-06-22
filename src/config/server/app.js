import path from 'path';
import React from 'react';
import {
  createReactAppExpress,
  handleUniversalRender
} from '@cra-express/core';
import App from 'appbase/src/App';

const clientBuildPath = path.resolve(__dirname, '../client');
const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender(<App />)
});

module.exports = app;
