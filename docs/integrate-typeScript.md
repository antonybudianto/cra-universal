---
id: integrate-typescript
title: TypeScript
---

> Credits: @Zummer, @janjachacz

Installation

```sh
# Create new cra
yarn create react-app my-app --typescript
cd my-app

# Install new cra-universal
yarn add -D cra-universal

# Install peer dependency
yarn add @cra-express/core

```

Install required dep:

```sh
yarn add -D webpack-merge
```

Create `crau.config.js` in cra root folder

```
touch crau.config.js
```

In `crau.config.js`

```ts
const webpackMerge = require("webpack-merge");

const tsConfig = {
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loaders: "babel-loader",
        options: {
          babelrc: false,
          extends: "./node_modules/cra-universal/src/config/server/.babelrc"
        }
      }
    ]
  }
};

module.exports = {
  webpackPlugins: [],
  modifyWebpack: config => webpackMerge(config, tsConfig)
};
```

Update your render method on `src/index.js`

```ts
// before
ReactDOM.render(...)

// after
ReactDOM.hydrate(...)
```

Fix image hydratation waring in `src/App.tsx`'s image, add `suppressHydrationWarning`

```tsx
// before
...
<img src={logo} className="App-logo" alt="logo" />

// after
...
<img suppressHydrationWarning src={logo} className="App-logo" alt="logo" />
```

Prevent React from openning browser on server start

```sh
echo "BROWSER=none" >> .env.local
```

Run the servers

```sh
npx cra-universal start --both
```

Open the browser

```sh
open http://localhost:3001
```
