# pdd
![01-项目初始化结构.png](static/images/01-项目初始化结构.png)
![02-项目目录结构设计.png](static/images/02-项目目录结构设计.png)

# 初始化
    npm install vue-cli -g
    vue init webpack pdd
    cd pdd
    npm run dev

# 安装stylus依赖包 (css预编译器选择)
    npm i stylus stylus-loader --save-dev
## 使用
    <style scoped lang="stylus" ref="stylesheet/stylus"></style>

# 安装 ly-tab 移动端可滑动（惯性滑动&回弹）Vue导航栏组件
    npm i ly-tab -S

# 安装 Swiper 轮播图
    npm i swiper -save

# 安装 axios
    npm install axios --save

# 安装vuex
    可以将全局的,公用的数据与其操作方法放到vuex中
    npm install --save vuex

    src/store
      index.js
      state.js
      mutations.js
      actions.js

      mutations-type.js
      getters.js

    编写流程： index(编写一次即可)
      state [->getters] -> [mutations-type ->] actions -> mutations -> 组件中使用

# vue中数据和dom渲染由于是异步的，所以，要让dom结构随数据改变这样的操作都应该放进this.$nextTick()的回调函数中
## 方式一:
```js
//actions.js
//1.获取首页轮播图
export default{
  async reqHomeCasual({commit}, callback){
    const result= await getHomeCasual();
    commit(HOMECASUAL, {homeCasual: result.message.data})
    callback && callback()
  }
}

//Hot.vue
export default{
  computed: {
    //2.取出state中存放的数据
    ...mapState(['homeCasual']),
  },
  mounted() {
    //1.请求轮播图的数据
    this.$store.dispatch('reqHomeCasual', ()=> {  //等价于this.$store.dispatch('reqHomeCasual') + watch中的homeCasual(){}
      // debugger;
      this.$nextTick(() => {   //this.$nextTick将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        //创建Swiper实例
        new Swiper('.swiper-container', {
          autoplay: true, //自动播放
          loop: true, //循环
          //如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            // clickable :true,
          },
          //导航按钮
          // navigation:{
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // }
        })
      });
    })
  },
}
```

## 方式二：
```js
//actions.js
//1.获取首页轮播图
export default{
  async reqHomeCasual({commit}){
    const result= await getHomeCasual();
    commit(HOMECASUAL, {homeCasual: result.message.data})
  }
}

//Hot.vue
export default{
  computed: {
    //2.取出state中存放的数据
    ...mapState(['homeCasual']),
  },
  mounted() {
      this.$store.dispatch('reqHomeCasual');  //这一步之后会将请求的数据放到state中
  },
  watch: {
    //3.监视homeCasual数据的变化
    homeCasual(pre, now){
      this.$nextTick(()=>{   //this.$nextTick将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        //创建Swiper实例
        new Swiper('.swiper-container', {
          autoplay: true, //自动播放
          loop: true, //循环
          //如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            // clickable :true,
          },
          //导航按钮
          // navigation:{
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // }
        })
      })
    }
  }
}
```


# better-scroll 解决移动端的各种滚动场景需求的插件  --搜索页会使用到
    npm install better-scroll --save


# 使用mint-ui里面的Indicator(加载提示框)
## npm install mint-ui --save
    修改.babelrc, 实现按需引入
      npm install babel-plugin-component --save-dev 解决报错:Module build failed: ReferenceError: Unknown plugin "component" specified in
```.babelrc
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime", ["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
}
```
## import {Indicator} from 'mint-ui'
```
mounted() {
  Indicator.open({    //打开加载提示框
    text: 'Loading...',
    spinnerType: 'fading-circle'
  });
  this.$store.dispatch('reqRecommendShopList', {
    page: this.page,
    count: this.count,
    callback: ()=>{
      Indicator.close();  //关闭加载提示框
    }
  })
}
```

# 根据session中的id实现自动登录
```js
// src/api/index.js
//如存在req.session.user_id, 则可通过getUserInfo获取之前登录的用户信息, 实现自动登录
export const getUserInfo= ()=>ajax(BASE_URL+'/api/user_info');  //获取登录的用户信息

//src/store/actions.js
//7.异步获取用户信息
async getUserInfo({commit}){
  const result= await getUserInfo();
  // console.log(result)
  if(result.success_code===200){
    commit(SYNC_USER_INFO, {userInfo: result.message})
  }
},

//App.vue
created(){
  //如存在req.session.user_id, 则可通过getUserInfo获取之前登录的用户信息, 实现自动登录
  this.$store.dispatch('getUserInfo')
}

```

# 引入字体图标
## 制作字体图标的两个网站
    阿里矢量图标库 https://www.iconfont.cn/
    免费生成字体图标 https://icomoon.io/app/#/select
## 全局引入到项目中,之后根据类名即可使用字体图标
```js
//main.js
import font from './common/css/style.css'  //引入字体图标文件

//具体使用见 MeTop.vue
```

# 时间处理类库
    npm install moment --save


# 图片懒加载插件 vue-lazyload
    npm install vue-lazyload -D


# 项目打包上线
## 1. npm run build
    在执行npm run build之后会在本地项目的根目录下面生成一个dist目录
```
//打包报错 UnhandledPromiseRejectionWarning: CssSyntaxError:
//将 build/webpack.prod.conf.js 中的以下代码注释掉,即可解决报错
// new OptimizeCSSPlugin({
//   cssProcessorOptions: config.build.productionSourceMap
//     ? { safe: true, map: { inline: false } }
//     : { safe: true }
// }),

//OptimizeCSSPlugin 是用来优化和压缩文件的，注释掉就不会压缩，再次build打包的时候可以看到dist目录下多了很多文件。
/*报错原因： css样式中不能用//来注释
  根源:
  1.首先看看OptimizeCSSPlugin 这个插件是那里引入，查看package.json，搜索到"optimize-css-assets-webpack-plugin": {"version": "3.2.0"｝，
  但是在package-lock.json看到optimize-css-assets-webpack-plugin": {"version": "3.2.1"｝
  2.发现package.json和package-lock.json的optimize-css-assets-webpack-plugin插件版本没对上
  3.分析发现，optimize-css-assets-webpack-plugin-3.2.0没有严格校验，所以可以打包通过，3.2.1有严格校验，所以打包出异常了
  4.再次分析，为什么重新执行了npm install，会出现package.json和package-lock.json的依赖版本对不上？正常来说是一致的
  5.再查询资料，结论是：npm或者cnpm 安装依赖，不会完全按照package.json中的版本号来，会有稍微差异
*/
```
## 2. 部署
    将dist目录下的所有文件或文件夹都放到自建服务器的public目录下
    npm start 启动服务器
    在浏览器地址栏中输入 http://127.0.0.1:3000/ 即可



# mescroll 解决移动端的各种滚动场景需求的插件, 可以用来代替better-scroll


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



# 解决跨域问题的两种方法
    1.服务器端解决
    2.客户端解决
    二选一即可




















> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
