# Create React App Universal CLI

[![npm version](https://badge.fury.io/js/cra-universal.svg)](https://badge.fury.io/js/cra-universal)
[![Build Status](https://travis-ci.org/antonybudianto/cra-universal.svg?branch=master)](https://travis-ci.org/antonybudianto/cra-universal)

<img width="838" alt="zero" src="https://user-images.githubusercontent.com/7658554/41818741-0330390c-77df-11e8-82b2-7906b4facd4f.png">

Create React App companion for universal app. No eject, zero config with customization, supports string and node stream API

Please also visit [create-react-app-express](https://github.com/antonybudianto/create-react-app-express) monorepo for the core and addons packages.

> [Live Demo](https://cra-universal.now.sh/), hosted by [Now](https://zeit.co/)

## Features:

* **No [eject](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject)** needed!
* **Zero config** by default and **customizable**
* **Server-side rendering** for your SEO
* **Code-splitting** that works universally
* The core middleware is fully **unit-tested**

## Installation

```sh
# Create new cra
create-react-app myapp
cd myapp

# Install new cra-universal
yarn add -D cra-universal

# Start with no config at all!
# npx is not required, you can also save the command as npm script
npx cra-universal start
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
npx cra-universal start
```

## Production

```sh
# Change directory to your project root first, and run:
npx cra-universal build

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
