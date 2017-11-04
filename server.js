'use strict';

// ES5 until Babel is added to the stack
var env = process.env.NODE_ENV;

var webpack = require('webpack');
var load = require('webpack-to-memory');

var config = require('./webpack.config');

if (env !== 'PRODUCTION') {
  var compiler = load(webpack(config));
  compiler.then(files => {
    files['app.js'].default.listen(3000);
  })

} else {
  // require build directory
}
