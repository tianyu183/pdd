/**
 * mutations 变化
 * 包含多个直接更新 state 的方法(回调函数)的对象
 * 只包含同步的方法
 */
import {
  HOMECASUAL,
  HOMENAV,
  HOMESHOPLIST,
  RECOMMENDSHOPLIST
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
    state.recommendShopList= recommendShopList;
  },



}






