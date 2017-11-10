const path = require('path');
const fs = require('fs');
const http = require('http');

const CRA_CLIENT_PORT = process.env.CRA_CLIENT_PORT || 3000;

function handleDevMode(req, res, options) {
  http.get(`http://localhost:${CRA_CLIENT_PORT}/index.html`, function (result) {
    result.setEncoding('utf8');
    let htmlData = '';
    result.on('data', (chunk) => { htmlData += chunk; });
    result.on('end', () => {
      processRequest(req, res, htmlData, options);
    });
  }).on('error', function(e) {
    console.error(e.message);
    return res.status(404).end();
  });
}

function universalMiddleware(options) {
  const { clientBuildPath } = options;

  function universalLoader(req, res) {
    if (process.env.NODE_ENV === 'development') {
      handleDevMode(req, res, options);
      return;
    }

    const filePath = path.resolve(clientBuildPath, 'index.html');

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

function handleStream(req, res, stream, htmlData, options) {
  const segments = htmlData.split(`<div id="root">`);
  res.write(segments[0] + `<div id="root">`);
  stream.pipe(res, { end: false })
  stream.on('end', () => {
    if (options.onEndReplace) {
      segments[1] = options.onEndReplace(segments[1])
    }
    res.write(segments[1]);
    res.end();
  });
}

function processRequest(req, res, htmlData, options) {
  const { universalRender } = options
  const stream = universalRender(req, res);

  if (stream === undefined) {
    return;
  }

  if (stream instanceof Promise) {
    stream.then((stream) => {
      if (stream === undefined) {
        return;
      }
      handleStream(req, res, stream, htmlData, options);
    });
    return;
  }

  handleStream(req, res, stream, htmlData, options);
}

module.exports = universalMiddleware;
