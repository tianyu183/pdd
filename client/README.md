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
