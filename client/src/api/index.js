/**
 * 后台请求入口文件
 */

import ajax from './ajax.js'

//1.基础路径
const BASE_URL= '/api';  //这样写是为了解决跨域问题
// const BASE_URL= 'http://127.0.0.1:3000';  //进行打包时因打包后的文件直接在服务端运行,所以这里的地址直接写服务器地址即可, 也可以直接设置为空字符串
// const BASE_URL= '';  //打包时使用

//2.请求方法
//首页
export const getHomeCasual= ()=>ajax(BASE_URL+'/api/homecasual');   //请求首页轮播图
export const getHomeNav= ()=>ajax(BASE_URL+'/api/homenav');   //请求首页导航
export const getHomeShopList= ()=>ajax(BASE_URL+'/api/homeshoplist');   //请求首页商品数据


//推荐页
export const getRecommendShopList= (params)=>ajax(BASE_URL+'/api/recommendshoplist', params);  //请求推荐页的商品数据

//搜索页
export const getSearchGoods= ()=>ajax(BASE_URL+'/api/searchgoods');  //请求搜索页的商品数据


//登录页 --以下请求无需长期保存在vuex中
export const sendCode= (phone)=>ajax(BASE_URL+'/api/send_code', {phone: phone});  //请求发送短信验证码
export const phoneCodeLogin= (phone,code)=>ajax(BASE_URL+'/api/login_code',{phone:phone, code:code}, 'POST');  //手机短信验证码登录
export const pwdLogin= (name, pwd, captcha)=>ajax(BASE_URL+'/api/login_pwd',{name:name, pwd:pwd, captcha:captcha}, 'POST');  //用户名和密码登录
//如存在req.session.user_id, 则可通过getUserInfo获取之前登录的用户信息, 实现自动登录
export const getUserInfo= ()=>ajax(BASE_URL+'/api/user_info');  //获取登录的用户信息

//设置页
export const getLogout= ()=>ajax(BASE_URL+'/api/logout');  //退出登录

//用户详情页
export const changeUserInfo= (data)=>ajax(BASE_URL+'/api/change_user_msg',{
  user_id: data.user_id,
  user_name: data.user_name,
  user_email: data.user_email,
  user_sex: data.user_sex,
  user_address: data.user_address,
  user_birthday: data.user_birthday,
  user_sign: data.user_sign
}, 'POST');  //修改用户信息


//购物车
export const getCartGoods= ()=>ajax(BASE_URL+'/api/cart_goods');  //请求购物车的数据
export const addGoodsToCart= (data)=>ajax(BASE_URL+'/api/add_shop_cart', {
  user_id: data.user_id,
  goods_id: data.goods_id,
  goods_name: data.goods_name,
  thumb_url: data.thumb_url,
  price: data.price,
}, 'POST');  //添加商品到购物车



