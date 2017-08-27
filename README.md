# Create React App Universal CLI

[![npm version](https://badge.fury.io/js/cra-universal.svg)](https://badge.fury.io/js/cra-universal)
[![Build Status](https://travis-ci.org/antonybudianto/cra-universal.svg?branch=master)](https://travis-ci.org/antonybudianto/cra-universal)

Simple express server for your Create React App projects with Server-side rendering and Code-splitting

Why you must use this?
- No [eject](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject) needed!
- **Server-side rendering** for your SEO
- **Code-splitting** that works universally
- Server code is given to you, no black-box

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

## Development
```sh
# Start your CRA client
# Recommended when developing client side
npm start

# or you can run dev server when developing server side
## make sure you've started CRA client
## then change dir to server
cd ./server

## start server, you can open http://localhost:3001
npm start
```

## Production
```sh
# Build your CRA client
npm run build

# Build your CRA server
cd ./server
npm run build

# Test drive your CRA server build
cd ./server
npm run start:prod
```

## Deployment
1. After you build both CRA and CRA server, you need to copy `/build` and `/server` into your server (Note: They **must be** side-to-side).
   As for `/server`, actually you only need to copy `/server/build` and `/server/package.json`, the rest is not needed.
2. Since the bundle used [Webpack Node Externals](https://www.npmjs.com/package/webpack-node-externals), you need to run `npm install --production` on the copied `/server`, but this time you don't need to install its `devDependencies`
3. Use process manager like [PM2](https://github.com/Unitech/pm2) to run your server, your run target is ./server/build/bundle.js

## Credit
- Create React App https://github.com/facebookincubator/create-react-app
- Thanks for https://github.com/ayroblu/ssr-create-react-app-v2 for the base!

## License
MIT
