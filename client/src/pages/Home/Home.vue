<template>
  <div class="home">
    <ly-tab v-model="selectedId" :items="items" :options="options" @change="handleChange" class="fix"></ly-tab>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: "Home",
    data() {
      return {
        //导航栏组件
        selectedId: 0,  //选中的id
        items: [  //导航栏数据
          {label: '热门'},
          {label: '服饰'},
          {label: '鞋包'},
          {label: '母婴'},
          {label: '百货'},
          {label: '食品'},
          {label: '内衣'},
          {label: '男装'},
          {label: '电器'}
        ],
        options: {  //配置选项
          activeColor: '#e9232c'  //设置选中颜色
        },

        //二级路由的路径
        subRouteUrl: [
          '/home/hot', '/home/dress', '/home/box', '/home/mbaby', '/home/general',
          '/home/food', '/home/shirt', '/home/man', '/home/electric',
        ]

      }
    },

    methods: {
      handleChange: function (item, index) {
        // console.log(item, index);
        this.$router.replace(this.subRouteUrl[index])
      }
    }


  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .home
    width 100%
    height 100%
    .fix
      position fixed
      left 0
      top 0
      z-index 998



</style>
