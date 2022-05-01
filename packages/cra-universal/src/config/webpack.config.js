const fs = require('fs');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

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
  webpackPlugins: [],
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
const nodePath = process.env.NODE_PATH || 'src';

const config = {
  context: ctx,
  resolveLoader: {
    modules: [
      'node_modules',
      resolveDir('../../node_modules'),
      resolveDir('../../../../../node_modules'),
      resolveCwd('node_modules'),
    ],
  },
  resolve: {
    alias: {
      appbase: resolveCwd(''),
    },
    modules: [
      'node_modules',
      resolveDir('../../node_modules'),
      resolveDir('../../../../../node_modules'),
      resolveCwd('node_modules'),
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './server/index.js',
  output: {
    path: resolveCwd('./server-build'),
    filename: 'bundle.js',
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '.hot/[hash].hot-update.json',
    chunkFilename: isProd('[id].[hash].chunk.js', '[id].chunk.js'),
  },
  target: 'node',
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()],
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      /**
       * svg CRA reference:
       * https://github.com/facebook/create-react-app/blob/v5.0.1/packages/react-scripts/config/webpack.config.js#L389
       */
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-cra-universal')],
          cacheDirectory: true,
          cacheCompression: false,
          compact: isProd(true, false),
        },
      },
      {
        test: /\.(png|jpe?g|gif|bmp)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'null-loader',
      },
    ],
  },
  plugins: [
    ...isProd(
      [],
      [
        new webpack.HotModuleReplacementPlugin({}),
        new RunScriptWebpackPlugin({
          name: 'bundle.js',
          // nodeArgs: ['--preserve-symlinks'],
          cwd: pcwd,
        }),
      ]
    ),
    ...crauConfig.webpackPlugins,
  ],
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
