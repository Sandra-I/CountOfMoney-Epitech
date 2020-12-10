let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let bodyParser = require('body-parser');
let app = express();
// const cookieParser = require('cookie-parser');

// app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin:true,
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
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
require('./routes/users.route.js')(app)
require('./routes/cryptos.route.js')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



/*request('https://ghibliapi.herokuapp.com/films', (error, response, body) => {
    if (error) {
        console.error(`Could not send request to API: ${error.message}`);
        return;
    }

    if (response.statusCode != 200) {
        console.error(`Expected status code 200 but received ${response.statusCode}.`);
        return;
    }
    //console.log(body)
    console.log(response.body)
    console.log('Processing our list of movies: !!!!');
    movies = JSON.parse(body);
    movies.forEach(movie => {
        console.log(`${movie['title']}, ${movie['release_date']}`);
    });
}); */



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
