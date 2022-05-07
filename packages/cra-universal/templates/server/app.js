import path from 'path';
import React from 'react';
import { createReactAppExpress } from '@cra-express/core';

import { createData, DataProvider } from '../src/data';

let App = require('../src/App').default;
const clientBuildPath = path.resolve(__dirname, '../client');

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: (req, res) => {
    return (
      <DataProvider streaming data={createData()}>
        <App />
      </DataProvider>
    );
  },
});

if (module.hot) {
  module.hot.accept('../src/App', () => {
    App = require('../src/App').default;
    console.log('✅ Server hot reloaded App');
  });
}

export default app;
