var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
let goodsRouter = require('./routes/goods')
let userRouter = require('./routes/user')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// CORS 跨域资源共享，解决跨域问题
app.use(function (req, res, next) {
  // 允许请求的白名单，为生产环境推荐设置为固定网址
  res.header('Access-Control-Allow-Origin', '*') 
  res.header('Access-Control-Allow-Headers', 'Content-Type') // 允许的请求头类型
  next() //传递给下一个中间件处理
})


// API
app.use('/goods', goodsRouter)
app.use('/user', userRouter)

// 404
app.use(function (req, res, next) {
  next(createError(404));
});

// 500
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
