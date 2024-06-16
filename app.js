var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const mongoose = require('mongoose');
const products = require('./routes/products');
const electrical = require('./routes/electrical');
const plug = require('./routes/plug');
const battery = require('./routes/battery');
const plug_status = require('./routes/plug_status');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://b6303952sut:12345@cluster0.9pk51vw.mongodb.net/')
        .then(() => console.log('connection successfully!'))
        .catch((err) => console.error(err))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', products);
//end point group => /product is leading to all product data base
app.use('/electrical', electrical);
app.use('/Plug',plug);
app.use('/battery',battery);
app.use('/status',plug_status);


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
