---
id: guide-deployment
title: Deployment
---

Here are some deployment services you can try:

> These tutorials assumed that you've built your app using `cra-universal build`

### [Now by Zeit](https://zeit.co/now)
- Edit `package.json`, remove `build`, and `test` scripts
- and update your npm `start` script to `node build/bundle.js`
- Run command `now` inside `./dist`
- Optional: you might need to remove your sourcemaps for free plan

___

### [Firebase Functions by Google](https://firebase.google.com)

> I also published the full article on Medium, check it out [here](https://medium.com/@antonybudianto/server-side-rendering-with-react-and-firebase-functions-cd67fdb2b605)

- Copy `./dist` inside your `./functions/` and rename it to `./functions/crau-dist`
- Update your rewrite on `firebase.json`
  ```json
  {
    "source": "**",
    "function": "app"
  }
  ```
- Update your `crau.config.js`
  ```js
  module.exports = {
    modifyWebpack: config => {
      const newConfig = {
        ...config,
        output: {
          ...config.output,
          libraryTarget: 'commonjs2'
        },
        entry: env ? './server/index.js' : './server/app.js'
      };
      return newConfig;
    }
  };
  ```
- Update your `./functions/index.js`
  ```js
  const functions = require('firebase-functions');

  const app = require('./crau-dist/server/bundle');

  exports.app = functions.https.onRequest(app);
  ```
- Add your server dependencies into your function `package.json`
- Remove `./build/index.html` (let firebase function serve it)
- Deploy using Firebase CLI `firebase deploy`
