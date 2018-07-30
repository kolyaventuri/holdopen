const fs = require('fs');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  if(fs.existsSync(path.join(__dirname, '.env'))) {
    const dotenv = require('dotenv');
    const result = dotenv.config();
    if (result.error) {
      throw result.error;
    }
  }
}

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

require('./db/mongo');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

var sassMiddleware = require('node-sass-middleware');
var app = express();


if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

app.use(session({secret: process.env.SESSION_SECRET || 'generictoken001' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'private'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
}));
app.use(express.static(path.join(__dirname, 'public')));

require('./app/services/passport')(app);

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
