const path = require('path');

const React = require('react');
const { createReactAppExpress, handleUniversalRender } = require('create-react-app-express');

const {default: App} = require('../../src/App');
const clientBuildPath = path.resolve(__dirname, '..', '..', 'build');
const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender(<App />)
});

module.exports = app;
