var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
//let RedisStore = require('connect-redis')(session);
//var redis = require('redis').createClient();
var formidable = require('formidable');
var path = require('path');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// ciudado dependendo da posição fica em lop toda requisição metodo post
app.use(function(req, res, next){

  if(req.method === 'POST'){
  
  var form = formidable.IncomingForm({
     uploadDir:path.join(__dirname, "/public/images"),
     KeepExtensions:true
  });

  form.parse(req, function(err, fields, files){

       req.body = fields;
       req.fields = fields;
       req.files = files;

       next();
  });

 }else{
  
   // ciudado dependendo da posição fica em lop toda requisição metodo post aqui acontece de não dar o lopp por causa do next()
   next();

 }

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(session({
//     store: new RedisStore({ host: 'localhost', port: 6379, client: redis }),
//     secret: 'p@ssw0rd',
//     resave:true,
//     saveUninitialized:true
//   }));

  // app.use(session({
  //   store: new RedisStore({ url: process.env.REDIS_URL }),
  //   secret: '',
  //   resave:true,
  //   saveUninitialized:true
  // }));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/admin', adminRouter);
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


app.listen(process.env.PORT || 3000);

module.exports = app;
