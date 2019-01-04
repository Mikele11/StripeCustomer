var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var stripe = require("stripe")("sk_test_Z3RxLEb8ePEP9jtfLdsoIWJO");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));


app.post('https://angry-benz-067bb7.netlify.com/create', function(req, res, next) {

  stripe.customers.create({
    account_balance: +req.body.balance,
    email: req.body.email,
    description: req.body.description,
  }, 
  function(err, customer) {
    if (err) return next(err);
    res.json(customer);
    console.log('add err',err);
    console.log('add success',customer); 
  });
});
app.get('https://angry-benz-067bb7.netlify.com/list', function(req, res, next) {
  stripe.customers.list(
    { limit: 300 },
    function(err, customers) {
      if (err) return next(err);
      res.json(customers);
    }
  );
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
