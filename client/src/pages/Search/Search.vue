<template>
  <div class="search">
    <!--搜索导航-->
    <SearchNav :showSearchPanel="showSearchPanel"/>

    <!--联动列表-->
    <div class="shop">
      <!--左边-->
      <div class="menu-wrapper">
        <ul>
          <!--<li class="menu-item current">
            <span>女装</span>
          </li>-->
          <li class="menu-item" v-for="(goods, index) in searchGoods" :key="index"
              :class="{current: index===currentIndex}" @click="clickLeftItem(index)" ref="menuList">
            <span>{{goods.name}}</span>
          </li>
        </ul>
      </div>

      <!--右边-->
      <div class="shop-wrapper">
        <ul ref="shopParent">
          <li class="shop-li" v-for="(goods, index1) in searchGoods" :key="index1">
            <div class="shop-title">
              <!--<h4>女装</h4>-->
              <h4>{{goods.name}}</h4>
              <a href="">查看更多></a>
            </div>
            <ul class="phone-type" v-if="goods.tag==='phone'">
              <li v-for="(phone, index3) in goods.category" :key="index3">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
            <ul class="shop-items">
              <!--<li>
                <img src="./images/s1.png" alt="">
                <span>女装</span>
              </li>-->
              <li v-for="(item, index2) in goods.items" :key="index2">
                <img :src="item.icon" alt="">
                <span>{{item.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!--搜索面板-->
    <search-panel v-if="isShow" :showSearchPanel="showSearchPanel"/>
  </div>
</template>

<script>
import SearchNav from "./children/SearchNav";
import SearchPanel from "./children/SearchPanel";
import {mapState} from "vuex";
import BScroll from 'better-scroll';

export default {
  name: "Search",
  data() {
    return {
      scrollY: 0,  //右侧列表滑动的Y轴坐标(实时更新)
      rightLiTops: [],  //右侧分类的头部位置
      isShow: false,  //是否显示搜索面板
    }
  },
  components: {
    SearchNav,
    SearchPanel
  },
  mounted() {
    /*this.$store.dispatch('reqSearchGoods', ()=>{
      this.$nextTick(()=>{
        //滑动
        this._initBScroll();
      })
    })*/
    this.$store.dispatch('reqSearchGoods')

  },
  computed: {
    ...mapState(['searchGoods']),

    currentIndex(){  //用于动态决定左侧哪个选项被选中
      //1.获取数据
      const {scrollY, rightLiTops}= this;
      //2.取出索引
      let cIndex= rightLiTops.findIndex((item, index)=>{
        this._leftScroll(index);
        return scrollY >= item && scrollY < rightLiTops[index+1];
      })

      return cIndex
    }
  },
  watch: {
    searchGoods(){
      this.$nextTick(()=>{
        //1.滑动效果的初始化
        this._initBScroll();

        //2.求出右边所有分类板块的头部位置
        this._initRightLiTops();
      })
    }
  },
  methods: {
    //初始化滑动
    _initBScroll(){
      //左边滑动
      this.leftBScroll= new BScroll('.menu-wrapper', {
        scrollY: true, //开启纵向滚动
        click: true  //开启点击事件
      })

      //右边滑动
      this.rightBScroll= new BScroll('.shop-wrapper', {
        scrollY: true, //开启纵向滚动
        probeType: 3  //开启监听, probeType: 3表示实时传递滚动位置
      })
      // console.log(this.rightBScroll)

      //监听右侧的滑动事件
      this.rightBScroll.on('scroll', (pos)=>{
        // console.log(pos)
        //获取实时滚动的距离 使用scrollY接收
        this.scrollY = Math.abs(Math.round(pos.y))
        // this.scrollY= Math.abs(pos.y)

      })
    },

    //求出右边所有分类板块的头部位置
    _initRightLiTops(){
      //记录右侧分类的头部位置的临时数组
      const tempArr= [];

      //定义变量记录高度
      let top= 0;
      tempArr.push(top);

      //遍历类名为shop-li的li标签, 取出高度
      let shopLis= this.$refs.shopParent.getElementsByClassName('shop-li');
      Array.prototype.slice.call(shopLis).forEach((li, index)=>{  //先将伪数组转换为一个真数组, 再进行遍历
        // console.log(li, index)

        //判断： 取到最后的li标签
        if(index===shopLis.length-1){
          // console.log(li, index)
          //给最后一个li标签加一个padding-bottom = 屏幕高度-当前元素高度-上边搜索框高度60-下边导航栏高度50
          li.style.paddingBottom= `${window.innerHeight-li.clientHeight-110}px`
        }

        top += li.clientHeight;  //当前li元素的高度
        // console.log(top)
        tempArr.push(top);
      })

      //更新数据
      this.rightLiTops= tempArr;
      // console.log(this.rightLiTops)
    },

    //右侧滑动时, 左侧滚动到对应位置
    _leftScroll(index){
      let menuList= this.$refs['menuList'];
      // console.log(menuList)
      let el= menuList[index];
      // console.log(el)
      this.leftBScroll.scrollToElement(el,300, 0, -300);
    },

    //点击左侧, 右侧滚动到对应位置
    clickLeftItem(index){
       this.scrollY= this.rightLiTops[index];
       this.rightBScroll.scrollTo(0, -this.scrollY, 300);
    },

    //是否显示搜索面板
    showSearchPanel(flag){
      this.isShow = flag;
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    background-color #f5f5f5

  .shop
    width 100%
    position absolute
    top 60px
    bottom 50px
    background-color #fff
    display flex
    flex-direction row
    overflow hidden
    .menu-wrapper
      //width 20%
      //height 100%
      width 80px
      flex 0 1 80px
      background-color #e0e0e0
      .menu-item
        width 100%
        height 60px
        background-color #fafafa
        line-height 60px
        color #666
        font-weight lighter
        position relative
        display flex
        justify-content center
        align-items center
      .current
        color #e02e24
      .current::before
        content ''
        background-color #e02e24
        width 4px
        height 30px
        position absolute
        left 0
    .shop-wrapper
      //width 80%
      //height 100%
      flex 1
      background-color #fff
      .shop-title
        height 44px
        padding 0 10px
        color #999
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        a
          text-decoration none
          color #999
          font-weight lighter
      .shop-items
        display flex
        flex-wrap wrap
        li
          width 33.3%
          height 90px
          display flex
          flex-direction column
          justify-content center
          align-items center
          color #666height
          font-weight lighter
          font-size 14px
          img
            width 60%
            height 60%
            margin-bottom 5px
      .phone-type
        width 100%
        display flex
        flex-direction row
        flex-wrap wrap
        border-bottom-1px(#ccc)
        li
          width 33.3%
          //background-color red
          margin 5px 0
          display flex
          justify-content center
          align-items center
          img
            width 70%
</style>
