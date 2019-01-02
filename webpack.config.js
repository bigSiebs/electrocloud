const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/js');
const APP_DIR = path.resolve(__dirname, 'app');

const config = {
  entry: `${APP_DIR}/components/App/AppContainer.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = config;
