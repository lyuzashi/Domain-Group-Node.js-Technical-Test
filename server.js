'use strict';

// ES5 until Babel is added to the stack
var env = process.env.NODE_ENV;
const port = process.env.PORT || 3000;

var webpack = require('webpack');
var load = require('webpack-to-memory');

var config = require('./webpack.config')[0];
var clientConfig = require('./webpack.config')[1];

if (env !== 'PRODUCTION') {
  var compiler = load(webpack(config));
  var webpackMiddleware = require('webpack-dev-middleware');
  compiler.then(files => {
    const app = files['server.js'].default;
    const port = process.env.PORT || 3000;
    app.use(webpackMiddleware(webpack(clientConfig), { stats: false }));
    app.listen(port, function() {
      console.log('⇒ App listening on http://localhost:' + port);
    });
  })

} else {
  const app = require('./build/server').default;
  app.use('/app.js', (req, res) => res.sendFile(__dirname + '/build/app.js'));
  app.listen(port);
}
