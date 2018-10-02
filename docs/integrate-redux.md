---
id: integrate-redux
title: Integrate Redux
---

```jsx
// src/index.js

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(thunk)
)
```

```js
// server/src/app.js

import path from "path";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { Provider } from "react-redux";
import { createReactAppExpress } from "@cra-express/core";

import App from "../../src/App";
import configureStore from "../../src/store/index.js";
const clientBuildPath = path.resolve(__dirname, "client");

function handleUniversalRender(req, res) {
  const initialState = {};
  const store = configureStore(initialState);
  const stream = renderToNodeStream(
    <Provider store={store}>
      <App />
    </Provider>
  );
  return stream;
}

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender,
  onFinish(req, res, html) {
    const state = store.getState();
    const finalHtml = html.replace('{{SCRIPT}}', `<script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};
    </script>`);
    return finalHtml;
  }
});

module.exports = app;
```

References:
https://redux.js.org/recipes/server-rendering
