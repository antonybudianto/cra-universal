---
id: integrate-react-router
title: Integrate React Router
---

This is how you integrate [React Router](https://github.com/ReactTraining/react-router) into server side rendering:

```js
// server/app.js

// you can use `async` function too
function handleUniversalRender(req, res) {
  const context = {};
  const stream = ReactDOMServer.renderToNodeStream(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(301, context.url);
    return;
  }

  return stream;
}

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender
});
```

**Note:** Make sure `App.js` didn't render `BrowserRouter`, but put it on `src/index.js` or outer files

```js
// src/index.js

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```
