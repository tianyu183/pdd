import Vue from 'vue'
import App from './App'
import router from './router'  //引入路由器 import router from './router/index.js'
import LyTab from 'ly-tab'  //引入第三方导航栏组件
import store from './store' //引入store
import {Actionsheet, DatetimePicker} from 'mint-ui'  //引入mint-ui
import font from './common/css/style.css'  //引入字体图标文件

Vue.config.productionTip = false

//注册成全局组件
Vue.use(LyTab)
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(DatetimePicker.name, DatetimePicker);

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
  store,
  render: h=>h(App)
})
