const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: [
    './app/assets/react/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'public/javascripts/bundle.js',
    publicPath: '/javascripts/'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({ /* your config */ })
    ]
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: path.join(__dirname, 'app/assets'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
};
