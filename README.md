# Create React App Universal CLI

[![npm version](https://badge.fury.io/js/cra-universal.svg)](https://badge.fury.io/js/cra-universal)
[![Build Status](https://travis-ci.org/antonybudianto/cra-universal.svg?branch=master)](https://travis-ci.org/antonybudianto/cra-universal)

Simple express server for your Create React App projects with Server-side rendering and Code-splitting

Why you must use this?
- No [eject](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject) needed!
- **Server-side rendering** for your SEO
- **Code-splitting** that works universally
- Server code is given to you, no black-box

> [Live Demo](https://cra-universal.now.sh/) using [Now](https://zeit.co/)

## Installation
```sh
# Install global CLI
npm install -g cra-universal

# Change dir to your app and init CRA server
cd ./my-create-react-app
cra-universal init

# Install server dependencies
cd ./server
npm install
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
# Recommended when developing client side
npm start

# or you can run dev server when developing server side
## make sure you've started CRA client
## then change directory to server
cd ./server

## start server, you can open http://localhost:3001
npm start
```

## Production
```sh
# Change directory to your project root first, and run:
cra-universal build

# This command will build both client and server and put them into `./dist`
```

## Deployment
1. First, follow the Production guide above
2. Since the bundle used [Webpack Node Externals](https://www.npmjs.com/package/webpack-node-externals), you need to run `npm install --production` on the copied `/dist`, but this time you don't need to install its `devDependencies`
3. Use process manager like [PM2](https://github.com/Unitech/pm2) to run your server, your run target is ./dist/build/bundle.js

## Credit
- Create React App https://github.com/facebookincubator/create-react-app
- Thanks for https://github.com/ayroblu/ssr-create-react-app-v2 for the base!

## License
MIT
