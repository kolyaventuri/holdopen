var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './app/assets/react/index.js',
  output: {
    path: path.join(__dirname, 'public/javascripts'),
    filename: 'bundle.js',
    publicPath: '/javascripts/'
  },
  optimization: {
		// We no not want to minimize our code.
		minimize: false
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
