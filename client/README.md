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
