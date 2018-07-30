const path = require('path');
const webpack = require('webpack');

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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],

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
