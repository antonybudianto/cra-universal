# @cra-express/redux-prefetcher (deprecated)

> DEPRECATED! No support/PR accepted for this package anymore.
> Alpha stage, API may change, don't use on production yet!
> Simple utility to map your routes and prefetch your data on server using Redux as store

## Prerequisites

- Redux
- React Router with array config
- Promise support

## Start

```
npm i @cra-express/redux-prefetcher
```

## Use

```js
// server.js
import { getInitialData } from '@cra-express/redux-prefetcher'
import { renderToNodeStream } = from 'react-dom/server';

import routes from './my-app-routes'
import reducer from './my-app-reducer'

function handleUniversalRender (req, res) {
  const ctx = { req, res }
  const store = createStore(reducer);
  return getInitialData(ctx, store, routes)
    .then(() => {
      return renderToNodeStream(<App />)
    })
}
```

```js
// MyView.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTodo } from './my-todo-reducer';

class MyView extends Component {
  static loadData({ ctx, store, match }) {
    // ctx is object containing express req and res objects
    // store is redux store
    // match is router match information, you can get params here
    return store.dispatch(fetchTodo());
  }

  render() {
    return (
      <ul>
        {this.props.todo.data.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  todo: state.todo,
});

export default connect(mapStateToProps)(MyView);
```

## License

MIT
