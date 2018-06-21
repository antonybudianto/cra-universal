const path = require('path');
const fs = require('fs');

const cwd = process.cwd();

const pcwd = path.resolve(cwd);

function resolveCwd(name) {
  return path.resolve(cwd, name);
}

function resolveDir(name) {
  return path.resolve(__dirname, name);
}

console.log('>', resolveCwd(''));
console.log('>', resolveDir(''));

var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var StartServerPlugin = require('start-server-webpack-plugin');

function isProd(valProd, valDev) {
  return process.env.NODE_ENV === 'production' ? valProd : valDev;
}

let ctx = resolveDir('');

if (fs.existsSync(resolveCwd('./server'))) {
  // ctx = resolveCwd('');
  console.log('> server folder detected on CRA client, will use this one');
}

let config = {
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
          presets: ['env', 'react-app'],
          plugins: [require.resolve('babel-plugin-dynamic-import-node')]
        }
      },
      {
        test: /\.(css|svg)?$/,
        loaders: 'null-loader'
      }
    ]
  },
  plugins: isProd(
    [],
    [
      new StartServerPlugin({
        name: 'bundle.js'
      })
    ]
  )
};

module.exports = config;
