var path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'app.js'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    libraryTarget: 'commonjs2',
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [/(node_modules)/],
      loader: 'babel-loader',
    }]
  },
  target: 'node',
}