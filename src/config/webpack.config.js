const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const { resolveCwd, resolveDir, pcwd } = require('../util/path');

console.log('>', resolveCwd(''));
console.log('>', resolveDir(''));

function isProd(valProd, valDev) {
  return process.env.NODE_ENV === 'production' ? valProd : valDev;
}

function loadConfigOnBase(fileName) {
  const configOnBase = resolveCwd(fileName);
  const defaultConfig = resolveDir('../config', fileName);

  if (fs.existsSync(configOnBase)) {
    console.log(`> "${fileName}" exists. cra-universal will use this one.`);
    return configOnBase;
  }
  console.log(
    `> "${fileName}" doesn't exist. cra-universal will use default config.`
  );
  return defaultConfig;
}

/**
 * Context resolver
 */
let ctx = resolveDir('../config');
if (fs.existsSync(resolveCwd('./server'))) {
  ctx = pcwd;
  console.log('> "server" folder found on CRA client, will use this one');
}

/**
 * crau.config.js loader
 */
let crauDefaultConfig = {
  webpackPlugins: []
};
let crauConfig = crauDefaultConfig;
const crauPath = resolveCwd('crau.config.js');
if (fs.existsSync(crauPath)) {
  console.log('> crau.config.js exists. Configuration applied.');
  const crauUserConfig = require(crauPath);
  crauConfig = Object.assign({}, crauDefaultConfig, crauUserConfig);
}

/**
 * Load 3rd party config
 */
const babelPath = loadConfigOnBase('.babelrc');

const config = {
  context: ctx,
  resolve: {
    alias: {
      appbase: resolveCwd('')
    },
    modules: ['node_modules', resolveCwd('')],
    extensions: ['.js', '.jsx']
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './server/index.js',
  output: {
    path: resolveCwd('./server-build'),
    filename: 'bundle.js',
    chunkFilename: isProd('[id].[hash].chunk.js', '[id].chunk.js')
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        options: {
          babelrc: false,
          extends: babelPath
        }
      },
      {
        test: /\.(png|jpe?g|gif|bmp|svg)?$/,
        loaders: 'url-loader'
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...isProd(
      [],
      [
        new StartServerPlugin({
          bundleName: 'bundle.js'
        })
      ]
    ),
    ...crauConfig.webpackPlugins
  ]
};

let finalConfig = config;

/**
 * Allow webpack overrides
 */
if (crauConfig.modifyWebpack) {
  const webpackConfig = crauConfig.modifyWebpack(config);
  if (!webpackConfig) {
    console.warn('> modifyWebpack should return config.');
  } else {
    console.log('> Webpack modify is applied.');
    finalConfig = webpackConfig;
  }
}

module.exports = finalConfig;
