/**
 * mutations 变化
 * 包含多个直接更新 state 的方法(回调函数)的对象
 * 只包含同步的方法
 */
import {
  HOMECASUAL,
  HOMENAV,
  HOMESHOPLIST,
  RECOMMENDSHOPLIST,
  SEARCHGOODS,
  SYNC_USER_INFO,
  RESET_USER_INFO,
  GET_CART_GOODS,
} from './mutations-type'


export default {
  //1.获取首页轮播图
  [HOMECASUAL](state, {homeCasual}){
    state.homeCasual= homeCasual;
  },

  //2.获取首页导航
  [HOMENAV](state, {homeNav}){
    state.homeNav= homeNav;
  },

  //3.获取首页商品数据
  [HOMESHOPLIST](state, {homeShopList}){
    state.homeShopList= homeShopList;
  },

  //4.获取推荐页商品数据
  [RECOMMENDSHOPLIST](state, {recommendShopList}){
    state.recommendShopList= state.recommendShopList.concat(recommendShopList);
  },

  //5.获取搜索页的商品数据
  [SEARCHGOODS](state, {searchGoods}){
    state.searchGoods= searchGoods;
  },

  //6.同步用户信息
  [SYNC_USER_INFO](state, {userInfo}){
    state.userInfo= userInfo;
  },

  //7.清空vuex中的用户信息
  [RESET_USER_INFO](state){
    state.userInfo= {};
  },

  //8.请求购物车的数据
  [GET_CART_GOODS](state, {cartGoods}){
    state.cartGoods= cartGoods;
  },
}






