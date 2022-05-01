import express from 'express';
import staticLoader from '@cra-express/static-loader';
import universalLoader from '@cra-express/universal-loader';

function createReactAppExpress(options) {
  const app = express();
  staticLoader(app, options);
  universalLoader(app, options);
  return app;
}

export default createReactAppExpress;
