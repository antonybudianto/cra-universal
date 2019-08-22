# cra-universal
### Create React App Universal CLI

[![npm version](https://badge.fury.io/js/cra-universal.svg)](https://badge.fury.io/js/cra-universal)
[![Build Status](https://travis-ci.org/antonybudianto/cra-universal.svg?branch=master)](https://travis-ci.org/antonybudianto/cra-universal)

<p align="center">
<img width="500" height="350" alt="zero" src="https://user-images.githubusercontent.com/7658554/42420108-261a1c5a-82eb-11e8-8ac0-ce2e0245e0ff.png">
</p>


Create React App companion for universal app. No eject, zero config with customization, supports string and node stream API

> [Live Demo](https://cra-universal.now.sh/) | [Official Doc](https://antonybudianto.github.io/cra-universal)

## Features

* **No [eject](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject)** needed!
* **Zero config** by default and **customizable**
* **Server-side rendering** for your SEO
* **Code-splitting** that works universally
* The core middleware is fully **unit-tested**
* Works alongside `react-scripts`, not as replacement

## Prerequisites

- Node >= 8.6 recommended
- npx is required

## Installation

```sh
# Create new cra
create-react-app myapp
cd myapp

# Install new cra-universal
yarn add -D cra-universal

# Install peer dependency
yarn add @cra-express/core
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
# Start CRA client
npm start

## Start CRA server, then open http://localhost:3001 in your browser
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

* Create React App https://github.com/facebook/create-react-app
* Thanks for https://github.com/ayroblu/ssr-create-react-app-v2 for the base!

## Support

If you like this project, please kindly support it by becoming a patron at my [Patreon](https://www.patreon.com/antonybudianto) page. Thanks!

## Sponsors

- Stan Day (stan@auraside.com)

## License

MIT
