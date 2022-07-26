let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let bodyParser = require('body-parser');
let app = express();


app.use(cors({
  credentials: true,
  origin:true,
  exposedHeaders: ['set-cookie']
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  const cookieConfig = {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)),
      domain: '',
  };
  //res.cookie('cookie', req.cookies.cookie, cookieConfig);
  if (req.method === "OPTIONS") {
      return res.status(200).end();
  } else {
      next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//routes
app.use(require('./routes/users.route.js'))
app.use(require('./routes/news.route.js'))
app.use(require('./routes/cryptos.route.js'))
app.use(require('./routes/favorites.route.js'))


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;
