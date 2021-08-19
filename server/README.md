# 后端服务器的搭建
## 安装Express应用生成器
    npm install express-generator -g
## 设置视图模板
    express --view=ejs server
## 启动项目
    进入项目 cd server
    安装依赖 npm install
    启动项目 npm run start
## 安装mysql包
    npm install mysql --save
## 安装跨域插件
    npm install cors --save
    引入与使用
      const cors = require('cors');
      app.use(cors());

## request和response
    request和response是服务器创建的两个对象给我们使用，request封装了浏览器发送过来的所有数据，
    如果是获取浏览器发送过来的信息那么就找request对象，如果想告诉浏览器展示信息那么就找response对象；

## 图形验证码
    需要借助svg-captcha和express-session两个库
### express-session
    用来缓存一些会话数据, 注意: 向后台发请求时,客户端localhost和127.0.0.1保存的session是不一样的
    npm install express-session --save
```js
const session = require('express-session');

app.use(session({
    secret :  '12345', //对session id 相关的cookie进行签名
    cookie : {maxAge : 1000 * 60 * 60 * 24}, // 设置session的有效时间，单位毫秒},
    resave : false, //是否重复保存
    saveUninitialized: true, //是否保存未初始化的会话
}));
```
### svg-captcha
    用于动态获取验证码
    npm install svg-captcha --save
```js
const svgCaptcha = require('svg-captcha');

/*
 一次性图形验证码
*/
router.get('/api/captcha', (req, res) => {
    // 1. 生成随机验证码
    let captcha = svgCaptcha.create({
        // color: true,  //是否给验证码字体设置颜色
        // background: '#cc9966', //验证码背景色
        size: 4,  //验证码长度
        ignoreChars: '0o1i', //验证码字符中排除0o1i
        noise: 3, //干扰线条的数量
        height: 44
    });
    // console.log(captcha.text);

    // 2. 将验证码保存在session中,之后只要在会话期间,每次客户端向服务器发请求时req中都含有session.captcha
    req.session.captcha = captcha.text.toLocaleLowerCase();
    console.log(req.session);

    // 3. 返回客户端
    res.type('svg');
    res.send(captcha.data);
});
```


## 发送验证码短信
    腾讯云短信服务，具体用法见 util/sms.util.js
    安装第三方库
        npm install blueimp-md5 --save
        npm install moment --save
        npm install js-base64 --save
        npm install request --save
```js
var md5 = require('blueimp-md5');  //md5加密 (信息-摘要算法) --加密密码,有时候也会用来加密用户名
var moment = require('moment'); //一个日期处理类库,用于解析、检验、操作以及显示日期
var Base64 = require('js-base64').Base64;  //把一些信息转为Base64编码
var request = require('request'); //request请求对象

```



body-parser插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
