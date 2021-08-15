<template>
  <div class="hot">
    <!--1.轮播图-->
    <!--<div class="swiper-container" v-if="$store.state.homeCasual.length>0">--> <!--如果没有...mapState(['homeCasual'])这一步的话,也可以这样写-->
    <div class="swiper-container" v-if="homeCasual.length>0">
      <div class="swiper-wrapper">
        <!--<div class="swiper-slide"><img src="../../imgs/rowing/s1.png" alt="" width="100%"></div>-->
        <div class="swiper-slide" v-for="(item,index) in homeCasual" :key="index">
          <img :src="item.imgurl" alt="" width="100%">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!--导航按钮-->

      <!--<div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>-->
    </div>

    <!--2.中间导航-->
    <HotNav/>

    <!--3.广告位-->
    <div class="hot-ad">
      <img src="../../imgs/hot_ad/home_ad.gif" alt="" width="100%">
    </div>

    <!--4.商品的列表-->
    <hot-shop-list />
  </div>
</template>

<script>
  import HotNav from "./HotNav";
  import HotShopList from "./HotShopList";
  import Swiper from 'swiper/dist/js/swiper.js'
  import 'swiper/dist/css/swiper.min.css'

  import {
    mapState
  }from 'vuex'

  export default {
    name: "Hot",
    components: {
      HotNav,
      HotShopList
    },
    computed: {
      //2.取出state中存放的数据
      ...mapState(['homeCasual']),

    },
    mounted() {
      //1.请求轮播图的数据
      /*this.$store.dispatch('reqHomeCasual', ()=> {  //等价于this.$store.dispatch('reqHomeCasual') + watch中的homeCasual(){}
        // debugger;
        this.$nextTick(() => {   //this.$nextTick将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
          //创建Swiper实例
          new Swiper('.swiper-container', {
            autoplay: true, //自动播放
            loop: true, //循环
            //如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // clickable :true,
            },
            //导航按钮
            // navigation:{
            //   nextEl: '.swiper-button-next',
            //   prevEl: '.swiper-button-prev',
            // }
          })
        });
      })*/
      this.$store.dispatch('reqHomeCasual');  //这一步之后会将请求的数据放到state中

      //首页导航
      this.$store.dispatch('reqHomeNav');  //向后台请求首页导航的数据，此步之后会将请求返回的数据存放到state中

      //首页商品数据
      this.$store.dispatch('reqHomeShopList');
    },
    watch: {
      //3.监视homeCasual数据的变化
      homeCasual(newVal, oldVal){
        this.$nextTick(()=>{   //this.$nextTick将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
          //创建Swiper实例
          new Swiper('.swiper-container', {
            autoplay: true, //自动播放
            loop: true, //循环
            //如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // clickable :true,
            },
            //导航按钮
            // navigation:{
            //   nextEl: '.swiper-button-next',
            //   prevEl: '.swiper-button-prev',
            // }
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.hot
  width 100%
  height 100%
  padding-top 47px
  background #f5f5f5
  //display flex
  //justify-content center
  //align-items center
  .hot-ad
    background-color #fff
    margin 8px 0
    padding 5px
</style>
