---
id: intro-getting-started
title: Getting started
sidebar_label: Getting started
---

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

# Start with no config at all!
# npx is not required, you can also save the command as npm script
npx cra-universal start
```

### Client code change

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