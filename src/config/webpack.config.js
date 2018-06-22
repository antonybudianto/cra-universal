const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

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

function isProd(valProd, valDev) {
  return process.env.NODE_ENV === 'production' ? valProd : valDev;
}

// Defaults to use default server
let ctx = resolveDir('');

// If 'server' folder found on user, use that
if (fs.existsSync(resolveCwd('./server'))) {
  ctx = pcwd;
  console.log('> "server" folder found on CRA client, will use this one');
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
        bundleName: 'bundle.js'
      })
    ]
  )
};

module.exports = config;
