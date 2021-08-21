<template>
  <div id="app">
    <!--router-view: 用来显示当前路由组件界面-->
    <!--<router-view></router-view>-->

    <keep-alive> <!--keep-alive: 缓存路由组件对象-->
      <router-view></router-view>
    </keep-alive>

    <TabBar v-show="$route.meta.showBottomTabBar"/>
  </div>
</template>

<script>
import TabBar from "./components/TabBar/TabBar";
export default {
  name: 'App',
  components: {
    TabBar
  },
  created(){
    //如存在req.session.user_id, 则可通过getUserInfo获取之前登录的用户信息, 实现自动登录
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    position relative
  }
</style>
