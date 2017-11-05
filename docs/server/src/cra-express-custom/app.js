const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');

function createReactAppExpress(options) {
  const { clientBuildPath } = options;
  const universalLoader = require('./universal')(options);

  const app = express();

  // Support Gzip
  app.use(compression());

  // Support post requests with body data (doesn't support multipart, use multer)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Setup logger
  app.use(morgan('combined'));

  // Serve static assets
  if (process.env.NODE_ENV === 'development') {
    // Connect proxy to Create React App dev server
    const proxy = require('http-proxy-middleware');
    app.use(['/static','/sockjs-node'], proxy({
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true
    }));
    console.log('Connected to CRA Client dev server');
  } else {
    app.use(express.static(clientBuildPath, { index: false }));
  }

  // Always return the main index.html, so react-router render the route in the client
  app.use('/', universalLoader);

  return app;
}

module.exports = createReactAppExpress;
