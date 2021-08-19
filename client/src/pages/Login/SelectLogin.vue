<template>
  <div class="select-login">
    <div class="back" @click="back">
      <img src="./images/back.png" alt="">
    </div>
    <div class="top">
      <img src="./images/lk_logo_sm.png" alt="" width="200">
    </div>
    <h4>选择登录方式</h4>
    <router-link tag="button" to="/login" class="btn">
      手机登录
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SelectLogin",
  methods: {
    back(){
      this.$router.replace('/home');
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .select-login
    width 100%
    height 100%
    background-color #f5f5f5
    position fixed
    left 0
    top 0
    z-index 1000
    display flex
    flex-direction column
    justify-content center
    align-items center
    .back
      position fixed
      top 20px
      left 20px
      img
        width 16px
    .top
      position fixed
      top 130px
      left 50%
      margin-left -100px
    button
      width 80%
      height 38px
      background-color mediumpurple
      border none
      border-radius 5px
      font-size 20px
      color #fff
      margin-top 30px

</style>
