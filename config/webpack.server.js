const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const babelConfig = require('../package').babelConfig.server;

const DIR = path.resolve(__dirname, '../server');

module.exports = {
  context: DIR,
  entry: './server.js',
  output: {
    path: DIR,
    filename: 'server.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: babelConfig
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url?name=public/images/[name].[ext]&limit=10000'
    }, {
      test: /\.(ttf|eot|woff2?|otf)$/,
      loader: 'url?name=public/fonts/[name].[ext]&limit=10000'
    }, {
      test: /\.css$/,
      loader: 'css/locals?modules&localIdentName=[folder]__[local]--[hash:base64:5]&camelCase'
    }]
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, '../node_modules'))
  .concat([
    'react-dom/server'
  ]).filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  }).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css']
  }
}