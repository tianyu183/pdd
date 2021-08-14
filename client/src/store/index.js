/**
 * store 的入口文件
 * 集成 state, action, mutations,
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'


//在vue中注册全局对象Vuex
Vue.use(Vuex)

//向外暴露store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})







