<template>
  <div class="cell" @click="clickCell(leftTitle)">
    <div class="cell-left" :style="{color: leftTitleColor}">
      <i :class="leftIcon"></i>
      <span>{{leftTitle}}</span>
    </div>
    <div class="cell-right" :style="{color: rightTitleColor}">
      <span v-show="rightTitle" style="font-size: 14px;">{{ rightTitle }}</span>
      <i class="itlike-uniE909" v-show="isShowRightArrow"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeCommonCell",
  props: {
    leftTitle: {type: String, default: ''},
    leftIcon: {type: String, default: ''},
    rightTitle: {type: String, default: ''},
    leftTitleColor:{type: String, default: '#333'},
    rightTitleColor:{type: String, default: '#666'},
    isShowRightArrow:{type: Boolean, default: true},
    clickCell: {
      type: Function,
      default: function () {}
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cell
    width 100%
    height 44px
    padding 0 10px
    border-bottom 1px solid #ececec
    background-color #fff
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    .cell-left,.cell-right
      display flex
      align-items center
      i
        margin-right 15px


</style>
