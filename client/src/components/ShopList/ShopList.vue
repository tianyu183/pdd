<template>
  <a class="recommend-item">
    <!--<img :src="item.thumb_url" alt="" width="100%" v-if="item.thumb_url">-->
    <img v-lazy="item.thumb_url" alt="" width="100%">  <!--图片懒加载-->
    <h4 class="item-title">{{item.short_name}}</h4>
    <div class="item-bottom">
      <span class="item-price">￥{{item.price/100}}</span>
      <span class="item-sales">{{item.sales_tip}}</span>
      <!--<button class="item-btn" v-if="true">找相关</button>-->
      <button class="item-btn" v-if="true" @click="clickCellBtn(item)">加入购物车</button>
      <span v-else class="item-user">
        <img src="../../../static/img/icon_mine.png" alt="">
        <img src="../../../static/img/icon_chat.png" alt="">
      </span>
    </div>
  </a>
</template>

<script>
export default {
  name: "ShopList",
  props: {
    item: Object,
    clickCellBtn: {
      type: Function,
      default: ()=>{}
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.recommend-item:nth-child(2n-1)
  margin-right 1.6%
.recommend-item
  background-color #fff
  width 49.2%
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
    //text-overflow ellipsis
    //display -webkit-box
    //-webkit-line-clamp 1
    //-webkit-box-orient vertical
  .item-bottom
    padding 0 4px
    display flex
    flex-direction row
    justify-content center
    align-items center
    .item-price
      flex 2
      color #f00
      font-size 10px
      font-weight bolder
    .item-sales
      flex 4
      font-size 8px
      color #666
    .item-btn
      flex 4
      height 26px
      color red
      font-size 5px
      background-color transparent
      border 1px solid orangered
      border-radius 5px
    .item-user
      //flex 3
      //display flex
      //flex-direction column
      img
        width 24px
        height 24px
        border-radius 50%
      img:nth-child(2n)
        margin-left -10px

</style>
