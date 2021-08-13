<template>
  <div class="hot">
    <!--1.轮播图-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="../../imgs/rowing/s1.png" alt="" width="100%"></div>
        <div class="swiper-slide"><img src="../../imgs/rowing/s2.png" alt="" width="100%"></div>
        <div class="swiper-slide"><img src="../../imgs/rowing/s3.png" alt="" width="100%"></div>
        <div class="swiper-slide"><img src="../../imgs/rowing/s4.png" alt="" width="100%"></div>
        <div class="swiper-slide"><img src="../../imgs/rowing/s5.png" alt="" width="100%"></div>
        <div class="swiper-slide"><img src="../../imgs/rowing/s6.png" alt="" width="100%"></div>
        <div class="swiper-slide"><img src="../../imgs/rowing/s7.png" alt="" width="100%"></div>
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

  export default {
    name: "Hot",
    components: {
      HotNav,
      HotShopList
    },
    mounted() {
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
