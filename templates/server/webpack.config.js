var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        options: {
          presets: ['env', 'react-app'],
          plugins: [
            [require.resolve('babel-plugin-import-inspector'), {
              serverSideRequirePath: true,
              webpackRequireWeakId: true
            }]
          ]
        }
      },
      {
        test: /\.(css|svg)?$/,
        loaders: 'null-loader'
      }
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
