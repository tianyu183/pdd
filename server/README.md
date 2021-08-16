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


body-parser插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
