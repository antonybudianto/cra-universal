> Credits: @Zummer

```javascript
// package.json
  "scripts": {
     "u-init": "cra-universal init"
  }
```

Extract server folder for customization
```sh
npm run u-init
```

Install required dep:
```sh
npm install -D webpack-merge ts-loader
```

Create crau.config.js in cra root folder 
```
touch crau.config.js
```

```javascript
// crau.config.js
const webpackMerge = require('webpack-merge');

const myCustomConfig = {
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
        ]
    }
};

module.exports = {
    webpackPlugins: [],
    modifyWebpack: (config) => webpackMerge(config, myCustomConfig)
};
```

``` javascript
// tslint.json
{
...
  "rules": {
    "no-console": false
  }
}
```

```javascript
// tsconfig.json
{
  "compilerOptions": {
 ...
   "rootDirs": ["src", "server"],
    ...
  },
  "exclude": [
    "server-build",
    ...
  ]
}
```