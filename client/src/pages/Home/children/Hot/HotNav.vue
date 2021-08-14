<template>
  <div class="hot-nav">
    <!--滚动区域-->
    <div class="hot-nav-container" v-if="homeNav.length>0">
      <div class="nav-container-inner">
        <!--<a href="" class="inner-item">
          <img src="../../imgs/nav/nav_icon01.png" alt="">
          <span>限时秒杀</span>
        </a>-->
        <a href="" class="inner-item" v-for="(item, index) in homeNav" :key="index">
          <img :src="item.iconurl" alt="">
          <span>{{item.icontitle}}</span>
        </a>
      </div>
    </div>
    <!--进度条-->
    <div class="hot-nav-bottom">
      <div class="hot-nav-bottom-inner" :style="innerBarStyle"></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "HotNav",
    data(){
      return {
        // 1. 屏幕的宽度
        screenW: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        // 2. 滚动内容的宽度
        scrollContentW: 720,
        // 3. 滚动条背景的长度
        bgBarW: 100,
        // 4. 滚动条的长度
        barXWidth: 0,
        // 5. 起点
        startX: 0,
        // 6. 记录结束点
        endFlag: 0,
        // 7. 移动的距离
        barMoveWidth: 0
      }
    },
    computed: {
      innerBarStyle(){
        return {
          width: `${this.barXWidth}px`,
          left: `${this.barMoveWidth}px`
        }
      },
      ...mapState(['homeNav'])  //取出state中存放的数据
    },
    mounted(){
      //注意：数据请求一般放于父组件中
      //this.$store.dispatch('reqHomeNav');  //向后台请求首页导航的数据，此步之后会将请求返回的数据存放到state中

      this.getBottomWidth();  //获取滚动条的长度
      this.bindEvent();  //移动端事件监听
    },
    methods: {
      //获取滚动条的长度
      getBottomWidth(){
        // console.log(this.screenW)
        // 滚动条长度/滚动条背景的长度 = 屏幕的宽度/滚动内容的宽度
        this.barXWidth= this.bgBarW * (this.screenW/this.scrollContentW)
      },

      //移动端事件监听
      bindEvent(){
        this.$el.addEventListener('touchstart', this.handleTouchStart, false);
        this.$el.addEventListener('touchmove', this.handleTouchMove, false);
        this.$el.addEventListener('touchend', this.handleTouchEnd, false);
      },
      //开始触摸
      handleTouchStart(event){
        // console.log(event)

        //1. 获取第一个触点
        let touch= event.touches[0];
        // console.log(touch)

        //2.求出起始点
        this.startX= Number(touch.pageX);
        // console.log(this.startX)
      },
      //开始移动
      handleTouchMove(event){
        // console.log('开始移动');

        //1.获取第一个触点
        let touch= event.touches[0];

        //2.求出移动的距离
        let moveWidth= Number(touch.pageX) - this.startX;
        // console.log(moveWidth);

        //3.求出滚动条走的距离
        this.barMoveWidth= -((this.bgBarW/this.scrollContentW)*moveWidth-this.endFlag);
        // console.log(this.barMoveWidth)

        //4.边界值处理
        if(this.barMoveWidth<=0){  //左边
          this.barMoveWidth= 0;
        } else if(this.barMoveWidth >= this.bgBarW-this.barXWidth){  //右边
          this.barMoveWidth= this.bgBarW-this.barXWidth;
        }
      },
      //结束触摸
      handleTouchEnd(){
        // console.log('结束触摸');
        this.endFlag = this.barMoveWidth;
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .hot-nav
    width 100%
    height 180px
    position relative
    background-color #fff
    padding-bottom 10px
    .hot-nav-container
      width 100%
      overflow-x scroll
      .nav-container-inner
        width 720px
        height 180px
        display flex
        flex-wrap wrap
        .inner-item
          width 90px
          height 90px
          //border 1px solid red
          //flex 1
          display flex
          flex-direction column
          justify-content center  //水平居中
          align-items center  //垂直居中
          font-size 12px
          color #666
          text-decoration none
          img
            width 40%
            //height 40%
            margin-bottom 5px
    .hot-nav-container::-webkit-scrollbar  //去除原生的滚动条
      display none
    .hot-nav-bottom
      width 100px
      height 2px
      background-color #ccc
      position absolute
      left 50%
      margin-left -50px
      bottom 8px
      .hot-nav-bottom-inner
        position absolute
        left 0
        width 0
        height 100%
        background-color orangered
</style>
