const webpack = require('webpack');
const path = require('path');

const configClient = {
  entry: path.join(__dirname, 'react-app.jsx'),
  output: {
    path: path.join(__dirname),
    filename: 'bundle-react.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: ['es2015', 'es2016', 'es2017', 'stage-2', 'react'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  target: 'web'
};


module.exports = configClient;
