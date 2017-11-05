'use strict';

// ES5 until Babel is added to the stack
var env = process.env.NODE_ENV;

var webpack = require('webpack');
var load = require('webpack-to-memory');

var config = require('./webpack.config');
// Modify config for client-side web app
var clientConfig = Object.assign({}, config, {
  entry: './app/mount.js',
  output: {
    path: '/',
    filename: 'app.js',
  },
  target: 'web',
});

if (env !== 'PRODUCTION') {
  var compiler = load(webpack(config));
  var webpackMiddleware = require('webpack-dev-middleware');
  compiler.then(files => {
    const app = files['app.js'].default;
    const port = process.env.PORT || 3000;
    app.use(webpackMiddleware(webpack(clientConfig), { stats: false }));
    app.listen(port, function() {
      console.log('⇒ App listening on http://localhost:' + port);
    });
  })

} else {
  // require build directory
}
