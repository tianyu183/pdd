import Vue from 'vue'
import App from './App'
import router from './router'  //引入路由器 import router from './router/index.js'
import LyTab from 'ly-tab'  //引入第三方导航栏组件

Vue.config.productionTip = false

//注册成全局组件
Vue.use(LyTab)



/*
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
*/
new Vue({
  el: '#app',
  router,
  render: h=>h(App)
})
