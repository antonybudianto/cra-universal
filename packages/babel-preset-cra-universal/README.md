# babel-preset-cra-universal

This package includes the [Babel](https://babeljs.io) preset used by [cra-universal](https://github.com/antonybudianto/cra-universal)

## Usage in cra-universal Projects

The easiest way to use this configuration is with cra-universal, which includes it by default. **You don’t need to install it separately in cra-universal projects.**

## Usage Outside of cra-universal

If you want to use this Babel preset in a project not built with cra-universal, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

  ```js
  {
    "presets": ["cra-universal"]
  }
  ```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/), which assumes that `Object.assign` is available or polyfilled.