//1.引入对应的模块
import Vue from 'vue'
import Router from 'vue-router'

//一级路由
import Home from '@/pages/Home/Home'
import Recommend from '@/pages/Recommend/Recommend'
import Search from '@/pages/Search/Search'
import Chat from '@/pages/Chat/Chat'
import Me from '@/pages/Me/Me'

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
    { //首页板块
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        { //首页的热门板块
          path: 'hot',
          name: 'Hot',
          component: Hot
        },
        { //首页的服饰板块
          path: 'dress',
          name: 'Dress',
          component: Dress
        },
        { //首页的鞋包板块
          path: 'box',
          name: 'Box',
          component: Box
        },
        { //首页的母婴板块
          path: 'mbaby',
          name: 'Mbaby',
          component: Mbaby
        },
        { //首页的百货板块
          path: 'general',
          name: 'General',
          component: General
        },
        { //首页的食品板块
          path: 'food',
          name: 'Food',
          component: Food
        },
        { //首页的内衣板块
          path: 'shirt',
          name: 'Shirt',
          component: Shirt
        },
        { //首页的男装板块
          path: 'man',
          name: 'Man',
          component: Man
        },
        { //首页的电器板块
          path: 'electric',
          name: 'Electric',
          component: Electric
        },
        {
          path: '/home',
          redirect: '/home/hot'
        }
      ]
    },
    { //推荐板块
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    { //搜索板块
      path: '/search',
      name: 'Search',
      component: Search
    },
    { //聊天板块
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    { //个人中心板块
      path: '/me',
      name: 'Me',
      component: Me
    },
    { //路由重定向
      path: '/',
      redirect: '/home'
    }

  ]
})
