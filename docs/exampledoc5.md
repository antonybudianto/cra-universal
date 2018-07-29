---
id: cra-express-core-api
title: API
---

> This is API doc for **upcoming v4**

## createReactAppExpress

- `clientBuildPath`
  - used in production bundle, for public path
- `universalRender`
  - Handler that accepts express `req` and `res` object and must return React element or Promise of React element
- `handleRender`
  - Handler for which rendering stragegy used. You can choose `stringRenderer` or `streamRenderer` from `@cra-express/universal-loader`. Default to `stringRenderer`

### Example
```js
const path = require('path');
const React = require('react');
import { createReactAppExpress } from '@cra-express/core';

let App = require('../src/App').default;
const clientBuildPath = path.resolve(__dirname, '../client');

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: (req, res) => <App />
});
```
