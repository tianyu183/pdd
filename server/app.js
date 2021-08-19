const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const cors = require('cors');  //引入跨域组件
app.use(cors());  //注册
//若没有引入第三方跨域组件, 可以自己配置, 以下是解决 get 请求而引起的跨域问题
// app.all("*", function(req, res, next) {
//     if (!req.get("Origin")) return next();
//
//     // use "*" here to accept any origin
//     res.set("Access-Control-Allow-Origin","*");
//     res.set("Access-Control-Allow-Methods", "GET");
//     res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//     // res.set('Access-Control-Allow-Max-Age', 3600);
//
//     if ("OPTIONS" === req.method) return res.sendStatus(200);
//     next();
// });

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret :  '12345', //对session id 相关的cookie进行签名
    cookie : {maxAge : 1000 * 60 * 60 * 24}, // 设置session的有效时间，单位毫秒},
    resave : false, //是否重复保存
    saveUninitialized: true, //是否保存未初始化的会话
}));



app.use('/', indexRouter);
app.use('/users', usersRouter);

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
