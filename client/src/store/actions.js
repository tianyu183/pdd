/**
 * actions  行为
 * 包含多个事件回调函数的对象
 * 包含异步和同步的方法
 */
import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecommendShopList,
  getSearchGoods,
  getUserInfo,
  getLogout,
  getCartGoods
} from '../api'

import {
  HOMECASUAL,
  HOMENAV,
  HOMESHOPLIST,
  RECOMMENDSHOPLIST,
  SEARCHGOODS,
  SYNC_USER_INFO,
  RESET_USER_INFO,
  GET_CART_GOODS,
  ADD_GOODS_COUNT,
  REDUCE_GOODS_COUNT,
  SELECTED_ALL_GOODS,
  SELECTED_SINGLE_GOODS,
  DEL_SINGLE_GOODS,

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
  /*async reqRecommendShopList({commit}, data){
    let params={
      page: data.page,
      count: data.count
    }
    const result= await getRecommendShopList(params);
    commit(RECOMMENDSHOPLIST, {recommendShopList: result.message})
    data.callback && data.callback()
  },*/
  //使用MeScroll后需更改的代码
  async reqRecommendShopList({commit}, data){
    let params={
      page: data.page,
      count: data.count
    }
    const result= await getRecommendShopList(params);
    // console.log(result)
    if(result.success_code===200){
      commit(RECOMMENDSHOPLIST, {recommendShopList: result.message})
      data.scb && data.scb(result.message)
    } else{
      data.ecb && data.ecb('请求数据失败')
    }
  },


  //5.获取搜索页的商品数据
  async reqSearchGoods({commit}, callback){
    const result= await getSearchGoods();
    commit(SEARCHGOODS, {searchGoods: result.message.data});
    callback && callback();
  },


  //6.同步用户信息
  syncUserInfo({commit}, userInfo){
    commit(SYNC_USER_INFO, {userInfo})
  },

  //7.异步获取用户信息
  async getUserInfo({commit}){
    const result= await getUserInfo();
    // console.log(result)
    if(result.success_code===200){
      commit(SYNC_USER_INFO, {userInfo: result.message})
    }
  },

  //8.退出登录,并清空用户信息
  async logout({commit}, userInfo){
    const result= await getLogout();
    // console.log(result)
    if(result.success_code===200){
      // commit(SYNC_USER_INFO, {userInfo: userInfo})  //清空vuex中的用户信息
      commit(RESET_USER_INFO) //清空vuex中的用户信息
    }
  },

  //9.异步获取购物车信息
  async reqCartGoods({commit}){
    const result= await getCartGoods();
    console.log(result)
    if(result.success_code===200){
      commit(GET_CART_GOODS, {cartGoods: result.message})
    }
  },

  //10.单个商品的增加和减少
  async updateGoodsCount({commit}, {goods, isAdd}){
    if(isAdd){ //增加
      commit(ADD_GOODS_COUNT, {goods})
    } else{ //减少
      commit(REDUCE_GOODS_COUNT, {goods})
    }
  },

  //11.是否选中购物车中所有的商品
  selectedAll({commit}, {isSelected}){
    commit(SELECTED_ALL_GOODS, {isSelected})
  },

  //12.单个商品的选中和取消
  selectedSingle({commit}, {goods}){
    commit(SELECTED_SINGLE_GOODS, {goods})
  },

  //13.单个商品的删除
  delSingleGoods({commit}, {goods}){
    commit(DEL_SINGLE_GOODS, {goods})
  },

}



