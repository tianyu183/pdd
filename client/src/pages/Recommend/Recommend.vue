<template>
  <div class="recommend-container" v-if="recommendShopList.length>0">
    <ul class="recommend">
      <!--<li class="recommend-item" v-for="(recommend, index) in recommendShopList" :key="index">
        <img :src="recommend.thumb_url" alt="" width="100%" v-if="recommend.thumb_url">
        <h4 class="item-title">{{recommend.short_name}}</h4>
        <div class="item-bottom">
          <span class="item-price">￥{{recommend.price/100}}</span>
          <span class="item-sales">{{recommend.sales_tip}}</span>
          <button class="item-btn">找相关</button>
        </div>
      </li>-->

      <ShopList v-for="(recommend, index) in recommendShopList" :key="index" :item="recommend" tag="li"></ShopList>
    </ul>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import ShopList from "../../components/ShopList/ShopList";

  export default{
    name: "Recommend",
    components: {
      ShopList
    },
    mounted() {
      this.$store.dispatch('reqRecommendShopList')
    },
    computed: {
      ...mapState(['recommendShopList'])
    },
    /*watch: {
      recommendShopList(newVal, oldVal){
        console.log(newVal, oldVal)
      }
    }*/
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container
    width 100%
    height 100%
    background-color #f5f5f5
    .recommend
      background-color #f5f5f5
      //margin-bottom 50px
      padding 10px 8px 50px 8px
      display flex
      flex-direction row
      flex-wrap wrap
      /*.recommend-item:nth-child(2n-1)
        margin-right 2%
      .recommend-item
        background-color #fff
        width 49%
        padding-bottom 10px
        margin-bottom 10px
        .item-title
          margin 5px 0
          padding 0 6px
          line-height 20px
          height 20px
          font-size 14px
          font-weight lighter
          overflow hidden;
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 1
          -webkit-box-orient vertical
        .item-bottom
          padding 0 4px
          display flex
          flex-direction row
          justify-content center
          align-items center
          .item-price
            flex 2
            color #f00
            font-size 13px
            font-weight bolder
          .item-sales
            flex 5
            font-size 9px
            color #666
          .item-btn
            flex 3
            height 26px
            color red
            font-size 10px
            background-color transparent
            border 1px solid orangered
            border-radius 5px*/

</style>
