const fs = require('fs');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const { resolveCwd, resolveDir, pcwd } = require('../util/path');
const { log } = require('../util/log');

function isProd(valProd, valDev) {
  return process.env.NODE_ENV === 'production' ? valProd : valDev;
}

function loadConfigOnBase(fileName) {
  const configOnBase = resolveCwd(fileName);
  const defaultConfig = resolveDir('../config', fileName);

  if (fs.existsSync(configOnBase)) {
    log(`"${fileName}" found, using this one.`);
    return configOnBase;
  }
  return defaultConfig;
}

log(`NODE_ENV is "${process.env.NODE_ENV}"`);

/**
 * crau.config.js loader
 */
let crauDefaultConfig = {
  webpackPlugins: []
};
let crauConfig = crauDefaultConfig;
const crauPath = resolveCwd('crau.config.js');
if (fs.existsSync(crauPath)) {
  log('crau.config.js found. Configuration is applied.');
  const crauUserConfig = require(crauPath);
  crauConfig = Object.assign({}, crauDefaultConfig, crauUserConfig);
}

/**
 * Context resolver
 */
let ctx = resolveDir('../config');
if (fs.existsSync(resolveCwd('./server'))) {
  ctx = pcwd;
  log('"server" folder found on CRA client, using this one');
}

/**
 * Load 3rd party config
 */
const babelPath = loadConfigOnBase('./server/.babelrc');

const config = {
  context: ctx,
  resolveLoader: {
    modules: [resolveDir('../../node_modules'), 'node_modules']
  },
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
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '.hot/[hash].hot-update.json',
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
        new webpack.HotModuleReplacementPlugin({}),
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
    log('modifyWebpack should return config.');
  } else {
    log('Webpack modify is applied.');
    finalConfig = webpackConfig;
  }
}

module.exports = finalConfig;
