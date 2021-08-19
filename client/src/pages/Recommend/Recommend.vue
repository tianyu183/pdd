<template>
  <div class="recommend-container" v-if="recommendShopList.length>0"  ref="wrapper">
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

      <ShopList tag="li" v-for="(recommend, index) in recommendShopList" :key="index"
                :item="recommend" :clickCellBtn="dealWithCellBtnClick"></ShopList>
    </ul>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import ShopList from "../../components/ShopList/ShopList";
  import BScroll from 'better-scroll';
  import { Indicator } from 'mint-ui';
  import { addGoodsToCart } from './../../api/index'
  import { Toast } from 'mint-ui';

  export default{
    name: "Recommend",
    data() {
      return {
        page: 1,  //当前页码
        count: 10 //每页多少条数据
      }
    },
    components: {
      ShopList
    },
    mounted() {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
      // console.log(Indicator)
      this.$store.dispatch('reqRecommendShopList', {
        page: this.page,
        count: this.count,
        callback: ()=>{
          Indicator.close();
          // console.log('加载中...')
        }
      })
    },
    computed: {
      ...mapState(['recommendShopList', 'userInfo'])
    },
    watch: {
      recommendShopList(newVal, oldVal){
        // console.log(newVal, oldVal)

        this.$nextTick(()=>{
          //当前页码加1
          this.page++

          //初始化
          this._initBScroll();
        })
      }
    },
    methods: {
      _initBScroll() {
        //1.初始化
        this.listScroll= new BScroll('.recommend-container', {
          scrollY: true,
          probeType: 3
        })
        // console.log(this.listScroll)

        //2.监听列表的滚动(触摸结束)
        this.listScroll.on('touchEnd', pos=>{
          // console.log(pos)
          // console.log(this.listScroll.maxScrollY)

          //3.监听下拉
          if(pos.y>=50){
            console.log('下拉刷新')
          }

          //4.监听上拉
          if(this.listScroll.maxScrollY>pos.y+20){
            // console.log('上拉加载更多');
            // console.log(this.page)

            Indicator.open({    //打开加载提示框
              text: 'Loading...',
              spinnerType: 'fading-circle'
            });
            this.$store.dispatch('reqRecommendShopList', {
              page: this.page,
              count: this.count,
              callback: ()=>{
                Indicator.close();  //关闭加载提示框
              }
            })
          }
        })

        //监听列表滚动结束
        this.listScroll.on('scrollEnd', ()=>{
          this.listScroll.refresh() //刷新滚动区的高度
        })

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
        }
        // console.log(result);
      }

    },

    /*updated() {
      //解决better-scroll因为图片没有下载完导致的滚动条高度不够，无法浏览全部内容的问题。
      //原因是better-scroll初始化是在dom加载后执行，此时图片没有下载完成，导致滚动条高度计算不准确。
      //利用图片的complete属性进行判断，当所有图片下载完成后再对scroll重新计算。
      let img = this.$refs.wrapper.getElementsByTagName('img')
      let count = 0
      let length = img.length
      if (length) {
        let timer = setInterval(() => {
          if (count == length) {
            this.listScroll.refresh() //better-scroll提供的刷新的方法，详见官网
            clearInterval(timer)
          } else if (img[count].complete) {
            count ++
          }
        }, 100)
      }
    }*/
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container
    width 100%
    height 100%
    background-color #f5f5f5
    overflow hidden
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
