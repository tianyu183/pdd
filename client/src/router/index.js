//1.引入对应的模块
import Vue from 'vue'
import Router from 'vue-router'

//一级路由
import Home from '@/pages/Home/Home'
import Recommend from '@/pages/Recommend/Recommend'
import Search from '@/pages/Search/Search'
import Chat from '@/pages/Chat/Chat'
import Me from '@/pages/Me/Me'
import Login from "../pages/Login/Login"
import MeSetting from "../pages/MeSetting/MeSetting"
import UserDetail from "../pages/Me/UserDetail"

//二级路由
import Hot from "../pages/Home/children/Hot/Hot";
import Dress from "../pages/Home/children/Dress";
import Box from "../pages/Home/children/Box";
import Mbaby from "../pages/Home/children/Mbaby";
import General from "../pages/Home/children/General";
import Food from "../pages/Home/children/Food";
import Shirt from "../pages/Home/children/Shirt";
import Man from "../pages/Home/children/Man";
import Electric from "../pages/Home/children/Electric";


//2.声明使用
Vue.use(Router)

//解决冗余导航报错：Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/home/hot".
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}


//输出路由对象
export default new Router({
  routes: [
    //3.1配置一级路由
    { //路由重定向
      path: '/',
      redirect: '/home'
    },
    { //首页板块
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/home',
          redirect: '/home/hot'
        },
        { //首页的热门板块
          path: 'hot',
          name: 'Hot',
          component: Hot,
          meta: {showBottomTabBar: true}
        },
        { //首页的服饰板块
          path: 'dress',
          name: 'Dress',
          component: Dress,
          meta: {showBottomTabBar: true}
        },
        { //首页的鞋包板块
          path: 'box',
          name: 'Box',
          component: Box,
          meta: {showBottomTabBar: true}
        },
        { //首页的母婴板块
          path: 'mbaby',
          name: 'Mbaby',
          component: Mbaby,
          meta: {showBottomTabBar: true}
        },
        { //首页的百货板块
          path: 'general',
          name: 'General',
          component: General,
          meta: {showBottomTabBar: true}
        },
        { //首页的食品板块
          path: 'food',
          name: 'Food',
          component: Food,
          meta: {showBottomTabBar: true}
        },
        { //首页的内衣板块
          path: 'shirt',
          name: 'Shirt',
          component: Shirt,
          meta: {showBottomTabBar: true}
        },
        { //首页的男装板块
          path: 'man',
          name: 'Man',
          component: Man,
          meta: {showBottomTabBar: true}
        },
        { //首页的电器板块
          path: 'electric',
          name: 'Electric',
          component: Electric,
          meta: {showBottomTabBar: true}
        }
      ]
    },
    { //推荐板块
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta: {showBottomTabBar: true}
    },
    { //搜索板块
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {showBottomTabBar: true}
    },
    { //聊天板块
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: {showBottomTabBar: true}
    },
    { //个人中心板块
      path: '/me',
      name: 'Me',
      component: Me,
      meta: {showBottomTabBar: true}
    },
    { //登录板块
      path: '/login',
      name: 'Login',
      component: Login
    },
    { //设置板块
      path: '/setting',
      name: 'MeSetting',
      component: MeSetting
    },
    { //用户详情板块
      path: '/userdetail',
      name: 'UserDetail',
      component: UserDetail
    }

  ]
})
