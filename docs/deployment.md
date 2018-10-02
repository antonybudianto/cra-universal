---
id: deployment
title: Deployment
---

Here are some deployment services you can try:

These tutorials assumed that you've build your app using `cra-universal build`

### [Now by Zeit](https://zeit.co/now)
- Edit `package.json`, remove `build`, and `test` scripts
- and update your npm `start` script to `node build/bundle.js`
- Run command `now` inside `./dist`
- Optional: you might need to remove your sourcemaps for free plan

___

### [Firebase Functions by Google](https://firebase.google.com)
https://medium.com/@antonybudianto/server-side-rendering-with-react-and-firebase-functions-cd67fdb2b605
- Copy `./dist` inside your `./functions/` and rename it to `./functions/server`
- Update your rewrite on `firebase.json`
  ```json
  {
    "source": "**",
    "function": "app"
  }
  ```
- Update your `webpack.config.js`
  ```js
  module.exports = {
  // For Firebase function/package bundle
  entry: './src/app.js', // Initially, it's ./src/index.js
  ```
- Update your `index.js`
  ```js
  const functions = require('firebase-functions');

  // Copy your `dist` into here and rename it into `server`
  const app = require('./server/build/bundle');

  exports.app = functions.https.onRequest(app);
  ```
- Add your server dependencies into your function `package.json`
- Remove `./build/index.html` (let firebase function serve it)
- Deploy using Firebase CLI `firebase deploy`
