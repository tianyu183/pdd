<template>
  <!--MeScroll滚动区域的基本结构-->
  <Scroll class="scroller" :upCallback="upCallback"
          ref="mescroll" warpId="index_scroll"
          id="index_scroll">
    <div class="recommend-container" v-if="recommendShopList.length>0"  ref="wrapper">
      <ul class="recommend">
        <ShopList tag="li" v-for="(recommend, index) in recommendShopList" :key="index"
                  :item="recommend" :clickCellBtn="dealWithCellBtnClick"></ShopList>
      </ul>
    </div>
  </Scroll>
</template>

<script>
  import {mapState} from "vuex";
  import ShopList from "../../components/ShopList/ShopList";
  import { Indicator } from 'mint-ui';
  import { addGoodsToCart } from './../../api/index'
  import { Toast } from 'mint-ui';
  import Scroll from '../../components/mescroll/Scroll.vue'

  export default{
    name: "Recommend",
    data() {
      return {
        // page: 1,  //当前页码
        // count: 20, //每页多少条数据
      }
    },
    components: {
      ShopList,
      Scroll
    },
    mounted() {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
    },
    computed: {
      ...mapState(['recommendShopList', 'userInfo'])
    },
    methods: {
      //上拉回调
      upCallback: function (page) {
        // console.log(page)
        const SIZE= 10
        setTimeout(()=>{
          //请求数据
          this.$store.dispatch('reqRecommendShopList', {
            page: page.num,
            count: SIZE,
            scb: (result) => {
              // console.log(result)
              this.$refs.mescroll.endSuccess(result.length, SIZE);
              Indicator.close();
            },
            ecb: (err)=>{
              console.log(err)
              this.$refs.mescroll.endErr();
            },
          })
        },1000)
      },

      //监听商品点击
      async dealWithCellBtnClick(goods){
        let data= {
          user_id: this.userInfo.id,
          goods_id: goods.goods_id,
          goods_name: goods.goods_name,
          thumb_url: goods.thumb_url,
          price: goods.price,
        }
        // 1. 发送请求
        let result = await addGoodsToCart(data);
        if(result.success_code===200){
          Toast({
            message: '加入购物车',
            position: 'center',
            duration: 1000
          });
        } else if(result.err_code===0){
          Toast({
            message: '请先登录!',
            position: 'center',
            duration: 1000
          });
        }
        // console.log(result);
      }

    }


  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .scroller
    //width 100%
    //height 100%
    //background-color #f5f5f5
    //overflow hidden
    padding-bottom 50px
    .recommend
      background-color #f5f5f5
      //padding 10px 6px 10px 6px
      display flex
      flex-direction row
      flex-wrap wrap

  /*
  .recommend-container
    width 100%
    height 100%
    background-color #f5f5f5
    overflow hidden
    .recommend
      background-color #f5f5f5
      //margin-bottom 50px
      padding 10px 6px 50px 6px
      display flex
      flex-direction row
      flex-wrap wrap
      */

</style>
