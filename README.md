# Create React App Universal CLI

[![npm version](https://badge.fury.io/js/cra-universal.svg)](https://badge.fury.io/js/cra-universal)
[![Build Status](https://travis-ci.org/antonybudianto/cra-universal.svg?branch=master)](https://travis-ci.org/antonybudianto/cra-universal)

Create React App companion for universal app. No eject, zero config, supports string and node stream API

Please also visit [create-react-app-express](https://github.com/antonybudianto/create-react-app-express) monorepo for the core and addons packages.

> [Live Demo](https://cra-universal.now.sh/) using [Now](https://zeit.co/)

## Features:

* **No [eject](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject)** needed!
* **Zero config** by default and customizable
* **Server-side rendering** for your SEO
* **Code-splitting** that works universally
* Server code is given to you, **no black-box**
* The core middleware is fully **unit-tested**

## Installation

```sh
# Install global CLI (also works as a package)
npm install -g cra-universal
```

## Client code change

Please update your render method on `src/index.js`

```js
// before
ReactDOM.render(...)

// after
ReactDOM.hydrate(...)
```

## Development

```sh
# Start your CRA client
npm start

## Start CRA server, then you can open http://localhost:3001
cra-universal start
```

## Production

```sh
# Change directory to your project root first, and run:
cra-universal build

# This command will build both client and server and put them into `./dist`
```

## Deployment

1.  First, follow the Production guide mentioned above.
2.  Since the bundle used [Webpack Node Externals](https://www.npmjs.com/package/webpack-node-externals), you need to run `npm install --production` on the copied `/dist`, but this time you don't need to install its `devDependencies`
3.  Use process manager like [PM2](https://github.com/Unitech/pm2) to run your server, your run target is ./dist/server/bundle.js

## Credit

* Create React App https://github.com/facebookincubator/create-react-app
* Thanks for https://github.com/ayroblu/ssr-create-react-app-v2 for the base!

## License

MIT
