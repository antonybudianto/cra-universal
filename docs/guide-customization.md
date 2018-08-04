---
id: guide-customization
title: Customization
---

CRA Universal features zero config by default, but you can still override the default config with configuration file.

1. Create `crau.config.js` file in the root of your CRA
2. Here is the starting template
   ```js
   module.exports = {
     modifyWebpack: config => config
   }
   ```

## Configurable options
### modifyWebpack
You can override default webpack configuration with this callback.

Example:
```js
modifyWebpack: config => {
  const newConfig = {
    ...config,
    entry: './server/app.js'
  };
  return newConfig;
}
```

> It doesn't assume any merging strategy, so it uses the returned output **directly**