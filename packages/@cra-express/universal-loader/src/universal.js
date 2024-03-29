const path = require('path');
const fs = require('fs');
const http = require('http');
// const stringRenderer = require('./renderer/string-renderer').default;
const pipeStreamRenderer = require('./renderer/pipe-stream-renderer').default;

const craServiceName = process.env.CRA_SERVICE_NAME || 'localhost';
const craClientPort = process.env.CRA_CLIENT_PORT || 3000;
const defaultHtmlFilename = 'index.html';

function resolveHtmlFilenameByRequest(req, options) {
  if (!options.resolveHtmlFilenameByRequest) {
    return defaultHtmlFilename;
  }

  return options.resolveHtmlFilenameByRequest(req) || defaultHtmlFilename;
}

function handleDevMode(req, res, options) {
  var url = `http://${craServiceName}:${craClientPort}/${resolveHtmlFilenameByRequest(
    req,
    options
  )}`;
  http
    .get(url, function (result) {
      result.setEncoding('utf8');
      let htmlData = '';
      result.on('data', (chunk) => {
        htmlData += chunk;
      });
      result.on('end', () => {
        processRequest(req, res, htmlData, options);
      });
    })
    .on('error', function (e) {
      console.error(e.message);
      return res.status(404).end();
    });
}

function createUniversalMiddleware(options) {
  const { clientBuildPath } = options;

  function universalLoader(req, res) {
    if (process.env.NODE_ENV === 'development') {
      handleDevMode(req, res, options);
      return;
    }

    const filePath = path.resolve(
      clientBuildPath,
      resolveHtmlFilenameByRequest(req, options)
    );

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      if (err) {
        console.error('read err', err);
        return res.status(404).end();
      }

      processRequest(req, res, htmlData, options);
    });
  }

  return universalLoader;
}

function processRequest(req, res, htmlData, options) {
  const { universalRender, handleRender = pipeStreamRenderer } = options;
  const data = universalRender(req, res);

  if (data === undefined) {
    return;
  }

  if (data instanceof Promise) {
    data.then((resolvedData) => {
      if (resolvedData === undefined) {
        return;
      }
      handleRender(req, res, resolvedData, htmlData, options);
    });
    return;
  }

  handleRender(req, res, data, htmlData, options);
}

export default createUniversalMiddleware;
