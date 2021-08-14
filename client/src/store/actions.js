/**
 * actions  行为
 * 包含多个事件回调函数的对象
 * 包含异步和同步的方法
 */
import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecommendShopList

} from '../api'

import {
  HOMECASUAL,
  HOMENAV,
  HOMESHOPLIST,
  RECOMMENDSHOPLIST
} from './mutations-type'

export default {
  //1.获取首页轮播图(异步获取)
  /*async reqHomeCasual({commit}, callback){
    const result= await getHomeCasual();
    commit(HOMECASUAL, {homeCasual: result.message.data})
    callback && callback()
  }*/
  async reqHomeCasual({commit}){
    const result= await getHomeCasual();
    // console.log(result)
    commit(HOMECASUAL, {homeCasual: result.message})
  },

  //2.获取首页导航
  async reqHomeNav({commit}){
    const result= await getHomeNav();
    commit(HOMENAV, {homeNav: result.message.data})
  },

  //3.获取首页商品数据
  async reqHomeShopList({commit}){
    const result= await getHomeShopList();
    commit(HOMESHOPLIST, {homeShopList: result.message.goods_list})
  },


  //4.获取推荐页的商品数据
  async reqRecommendShopList({commit}){
    const result= await getRecommendShopList();
    commit(RECOMMENDSHOPLIST, {recommendShopList: result.message.data})
  },





}



