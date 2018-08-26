const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");

function staticLoader(app, options) {
  const { clientBuildPath } = options;

  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Serve static assets
  if (process.env.NODE_ENV === "development") {
    // Connect proxy to Create React App dev server
    const proxy = require("http-proxy-middleware");
    var craServiceName = process.env.CRA_SERVICE_NAME || 'localhost';
    var craClientPort = process.env.CRA_CLIENT_PORT || 3000;
    app.use(
      ["**/*.*", "/static", "/sockjs-node"],
      proxy({
        target: `http://${craServiceName}:${craClientPort}`,
        changeOrigin: true,
        ws: true
      })
    );
    console.log("Connected to CRA Client dev server");
  } else {
    app.use(express.static(clientBuildPath, { index: false }));
  }

  return app;
}

export default staticLoader;
