Create React App Universal
===========================================

[![Build Status](https://travis-ci.org/antonybudianto/create-react-app-universal.svg?branch=master)](https://travis-ci.org/antonybudianto/create-react-app-universal)

> Based on https://github.com/ayroblu/ssr-create-react-app-v2

> Have **existing** Create React App project?
> Just copy `./server` folder into your existing CRA and it's done!

Visit [wiki](https://github.com/antonybudianto/create-react-app-universal/wiki) for documentation

## Install
```bash
# Install your CRA
npm install

# Install your CRA server
cd ./server
npm install
```

## Development
```bash
# Just running normally is OK!
# Recommended when developing client side
npm start

# or you can run dev server when developing server side
## build client first
npm run build

## change dir to server
cd ./server

## start server, you can open http://localhost:3001
npm start
```

## Production
```bash
# Build your CRA
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
