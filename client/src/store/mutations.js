/**
 * mutations 变化
 * 包含多个直接更新 state 的方法(回调函数)的对象
 * 只包含同步的方法
 */
import Vue from 'vue'
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

  //9.增加购物车单个数据
  [ADD_GOODS_COUNT](state, {goods}){
    // console.log(goods)
    goods.buy_count++
    // const index= state.cartGoods.indexOf(goods);
    // state.cartGoods.splice(index, 1, goods)
  },

  //10.减少购物车单个数据
  [REDUCE_GOODS_COUNT](state, {goods}){
    goods.buy_count--
    if(goods.buy_count===0){
      const index= state.cartGoods.indexOf(goods);
      state.cartGoods.splice(index, 1)
    }
  },

  //11.是否选中购物车中所有的商品
  [SELECTED_ALL_GOODS](state, {isSelected}){
    state.cartGoods.forEach((goods, index)=>{
      // console.log(goods, index)
      if(goods.checked!==undefined){ //该属性存在
        goods.checked= isSelected;
      } else{ //该属性不存在
        Vue.set(goods, 'checked', isSelected)
      }
    })
  },

  //12.单个商品的选中和取消
  [SELECTED_SINGLE_GOODS](state, {goods}){
    if(goods.checked!==undefined){ //该属性存在
      goods.checked= !goods.checked;
    } else{ //该属性不存在
      Vue.set(goods, 'checked', true)
    }
  },

  //13.单个商品的删除
  [DEL_SINGLE_GOODS](state, {goods}){
    const index= state.cartGoods.indexOf(goods);
    state.cartGoods.splice(index, 1)
  },
}






