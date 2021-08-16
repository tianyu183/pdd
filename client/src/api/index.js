/**
 * 后台请求入口文件
 */

import ajax from './ajax.js'

//1.基础路径
// const BASE_URL= 'http://127.0.0.1:3000';
const BASE_URL= '/api';

//2.请求方法
//首页
export const getHomeCasual= ()=>ajax(BASE_URL+'/api/homecasual');   //请求首页轮播图
export const getHomeNav= ()=>ajax(BASE_URL+'/api/homenav');   //请求首页导航
export const getHomeShopList= ()=>ajax(BASE_URL+'/api/homeshoplist');   //请求首页商品数据


//推荐页
export const getRecommendShopList= ()=>ajax(BASE_URL+'/api/recommendshoplist');  //请求推荐页的商品数据


//搜索页
export const getSearchGoods= ()=>ajax(BASE_URL+'/api/searchgoods');  //请求搜索页的商品数据
