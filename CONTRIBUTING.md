# Contributing

The following is a helpful information for contributors of CRA Universal and its packages. Feel free to propose changes to this repository in a pull request.

## Packages

This project consists of multiple packages. We use [pnpm](https://pnpm.io/) to manage them.

### @cra-express/core

Core module where Express app with static and universal loaders gets created.

### @cra-express/static-loader

Sets up static files serving in Express app.

### @cra-express/universal-loader

Sets up universal middleware that is serving SSR in Express app.

### @cra-express/redux-prefetcher (deprecated)

Simple utility to map your routes and prefetch your data on a server using Redux as a store.

### @cra-express/router-prefetcher

Simple utility to map your routes and prefetch your data on a server.

### babel-preset-cra-universal

This package includes the Babel preset used by CRA Universal.

### cra-universal

Create React App Universal CLI.

### demo

Demo project using CRA-universal. It has symlinks to the above packages in node_modules. Doesn't get published.

### packages/cra-universal/templates

Since we need a way to test the cra-universal locally and seamlessly, we have a CRA app as one of the packages so that we can try the CLI locally. Think of it as the playground for us since it's not actually going to be published.

## Running CRA Universal locally

- Run `npm run temp:start:client` to run client locally.
- Run `npm run temp:start:server` to run server locally.

- Normal CRA starts at http://localhost:3000
- Server-rendered CRA Universal starts at http://localhost:3001 (you'll mostly use this for development)

To run a production build of this app, preserving local CRA Universal, use these commands:

```sh
npm run temp:build
cd packages/cra-universal/templates/dist
pnpm i
npm run serve
```

### Webpack versions mismatch

An error may occur when running `temp:start:client`.

```
There might be a problem with the project dependency tree.
...
```

To fix it simply add `SKIP_PREFLIGHT_CHECK=true` to an .env file in project root directory.
