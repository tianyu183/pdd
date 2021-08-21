<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/lk_logo_sm.png" alt="" width="250">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current: loginMode}" @click="dealLoginMode(true)">短信登录</a>
          <a href="javascript:;" :class="{current: !loginMode}" @click="dealLoginMode(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form @submit.prevent="login">
          <!--手机验证码登录部分-->
          <div :class="{current: loginMode}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button class="get-verification"
                      v-if="!countdown"
                      :class="{count_down_number: countDownNumber}"
                      @click.prevent="getVerifyCode()">获取验证码
              </button>
              <button disabled="disabled" class="get-verification" v-else>已发送({{countdown}}s)</button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login-hint">
              温馨提示：未注册撩课帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名/手机/邮箱" v-model="name">
              </section>
              <section class="login-verification">
                <input type="password" placeholder="密码" v-model="pwd" v-if="pwdMode">
                <input type="text" placeholder="密码" v-model="pwd" v-else>
                <div class="switch-show">
                  <img @click="dealPwdMode(false)" :class="{on: pwdMode}" src="./images/hide_pwd.png" alt="" width="20">
                  <img @click="dealPwdMode(true)" :class="{on: !pwdMode}" src="./images/show_pwd.png" alt="" width="20">
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img ref="captcha" class="get-verification" :src="BASE_URL+'/api/captcha'" alt="captcha" @click="getCaptchaCode()">
              </section>
            </section>
          </div>
          <button class="login-submit">登录</button>
        </form>
        <button class="login-back" @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import {sendCode, phoneCodeLogin, pwdLogin} from '../../api';
import { Toast } from 'mint-ui';
import { mapActions } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      loginMode: true, // 登录方式，false代表密码登录, true代表短信登陆
      pwdMode: true, // 密码显示方式，false代表明文, true代表密文
      countdown: 0, // 倒计时
      phone: '', // 电话号码
      code: '',  // 短信验证码
      userInfo: {}, // 用户信息
      name: '', //用户名
      pwd: '', //密码
      captcha: '', //图形验证码

      BASE_URL: 'http://localhost:3000'
      // BASE_URL: ''  //打包时使用
    }
  },
  computed: {
    countDownNumber(){  //验证手机号是否合理
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone);
    }
  },
  methods: {
    ...mapActions(['syncUserInfo']),

    //1.处理登录的模式
    dealLoginMode(flag){
      this.loginMode= flag
    },

    //2.获取短信验证码
    async getVerifyCode(){
      //2.1 开启倒计时
      if(this.countDownNumber){
        this.countdown= 60;
        this.intervalId= setInterval(()=>{
          this.countdown--;
          if(this.countdown===0){
            clearInterval(this.intervalId);
          }
        }, 1000)
      }

      //2.2 发送短信验证码
      let result = await sendCode(this.phone);
      console.log(result);

      //2.3 获取验证码失败
      if(result.err_code===0){
        //提示信息
        Toast({
          message: result.message,
          position: 'center',
          duration: 3000
        })
      }
    },

    //3.密码的显示方式: 明文或密文
    dealPwdMode(flag){
      this.pwdMode= flag;
    },

    //4.获取图形验证码
    getCaptchaCode() {
      this.$refs.captcha.src = this.BASE_URL+'/api/captcha?time='+new Date()
    },

    //5.发送登录信息
    async login(){
      if (this.loginMode) {  //短信登陆
        // console.log('短信登陆');

        // 5.1 前端验证
        //前端手机号验证
        if(!this.phone){ //没有手机号
          Toast('请输入手机号码!');
          return ;
        } else if(!this.countDownNumber){ //手机号格式不对
          Toast('请输入正确的手机号码!');
          return ;
        }
        //前端短信验证码验证
        if (!this.code) {  //没有输入短信验证码
          Toast('请输入短信验证码!');
          return ;
        }else if (!(/^\d{6}$/gi.test(this.code))) { //短信验证码格式不对
          Toast('短信验证码不正确!');
          return ;
        }

        // 5.2 手机验证码登录
        const result = await phoneCodeLogin(this.phone, this.code);
        if(result.success_code === 200) {
          this.userInfo = result.message;
        } else {
          this.userInfo = {
            message: '登陆失败, 手机号或验证不正确'
          }
        }
        console.log(this.userInfo);

      } else{  //账号和密码登录
        // console.log('账号和密码登录');

        //5.3 前端验证
        if (!this.name) {
          Toast('请输入手机号/邮箱/用户名');
          return ;
        } else if (!this.pwd) {
          Toast('请输入密码');
          return ;
        } else if (!this.captcha) {
          Toast('请输入验证码');
          return ;
        }

        //5.4 用户名和密码登录
        const result = await pwdLogin(this.name, this.pwd, this.captcha);
        if(result.success_code === 200) {
          this.userInfo = result.message
        } else {
          this.userInfo = {
            message: result.message
          }
        }

      }

      //后续处理
      if (!this.userInfo.id) {
        Toast(this.userInfo.message);
        if (!this.loginMode) {
          this.getCaptchaCode()
        }
      } else {
        // 把用户信息同步到state中
        this.syncUserInfo(this.userInfo);
        // 返回主界面
        // this.$router.back();
        this.$router.replace('/me');
      }

    },

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .login-container
    width 100%
    height 100%
    background-color #f5f5f5
    .login-inner
      padding-top 60px
      width 80%
      margin 0 auto
      .login-header
        .login-logo
          font-size 40px
          font-weight bold
          color mediumpurple
          text-align center
        .login-header-title
          padding-top 40px
          padding-bottom 10px
          text-align center
          a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.current
              color: mediumpurple
              font-weight 700
              border-bottom 2px solid mediumpurple
      .login-content
        > form
          > div
            display none
            &.current
              display block
            input
              width 100%
              height 100%
              padding-left 8px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid mediumpurple
            .login-message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get-verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.count_down_number
                  color purple
            .login-verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch-show
                position absolute
                right 10px
                top 12px
                img
                  display none
                img.on
                  display block
            .login-hint
              margin-top 12px
              color #999
              font-size 12px
              line-height 20px
              > a
                color mediumpurple
          .login-submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background mediumpurple
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .login-back
          display block
          width 100%
          height 42px
          margin-top 15px
          border-radius 4px
          background transparent
          border: 1px solid mediumpurple
          color mediumpurple
          text-align center
          font-size 16px
          line-height 42px

</style>
