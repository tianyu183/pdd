<template>
  <div class="user-detail">
    <div class="user-detail-top">基本信息</div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img src="./images/me_icon.png" alt="">
      </div>
      <div class="user-item">
        <span>手机</span>
        <span v-if="user_phone">{{user_phone  | phoneFormat}}</span>
      </div>
      <div class="user-item">
        <span>昵称</span>
        <span><input type="text" v-model="user_name"></span>
      </div>
      <div class="user-item">
        <span>邮箱</span>
        <span><input type="text" v-model="user_email"></span>
      </div>
      <div class="user-item" @click="sheetVisible = true">
        <span>性别</span>
        <span>{{user_sex}}</span>
      </div>
      <div class="user-item">
        <span>常住地</span>
        <span><input type="text" v-model="user_address"></span>
      </div>
      <div class="user-item" @click="$refs.picker.open()">
        <span>生日</span>
        <span>{{user_birthday}}</span>
      </div>
      <div class="user-item">
        <span>个性签名</span>
        <span>
          <input type="text" v-model="user_sign">
        </span>
      </div>
    </div>
    <button class="save" @click="saveUserInfo">保存修改</button>
    <button class="back" @click="back">返回</button>

    <!--选择性别-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <!--选择出生日期-->
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleBirthday"
    >
    </mt-datetime-picker>

  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { changeUserInfo } from './../../api/index'
import { Toast } from 'mint-ui'

export default {
  name: "UserDetail",
  data(){
    return {
      // 0.属性
      user_sex: '',  //性别
      user_birthday: '',  //生日
      user_phone: '', //电话
      user_name: '',  //昵称
      user_email: '',  //邮箱
      user_address: '',  //地址
      user_sign: '',   //签名


      // 1. 性别
      actions: [
        {name: "男", method: this.selectSex},
        {name: "女", method: this.selectSex},
      ],
      sheetVisible: false,

      // 2. 日期
      startDate: new Date('1990-01-01'),
      endDate: new Date(),
    }
  },
  mounted() {
    // console.log(this.userInfo)
    this.user_phone= this.userInfo.user_phone || '';
    this.user_name = this.userInfo.user_name || '';
    this.user_email= this.userInfo.user_email || '';
    this.user_sex = this.userInfo.user_sex || '';
    this.user_address = this.userInfo.user_address || '';
    this.user_birthday= this.userInfo.user_birthday || '';
    this.user_sign = this.userInfo.user_sign || '';
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    selectSex(props){
      // console.log(props);
      this.user_sex = props.name;
    },
    handleBirthday(data){
      // this.user_birthday = moment(date).format("YYYY年MM月DD日");
      this.user_birthday = moment(data).format('YYYY-MM-DD');
    },

    async saveUserInfo(){
      let data= {
        user_id: this.userInfo.id,
        user_name: this.user_name,
        user_email: this.user_email,
        user_sex: this.user_sex,
        user_address: this.user_address,
        user_birthday: this.user_birthday,
        user_sign: this.user_sign
      };
      // console.log(data)
      // 3.1 请求接口
      let result = await changeUserInfo(data);
      // console.log(result);

      // 3.2 提示用户
      Toast({
        message: result.message,
        position: 'bottom',
        duration: 2000
      })

      // 3.3 返回主界面
      if(result.success_code === 200) {
        // 3.4 更新本地数据
        this.$store.dispatch('getUserInfo');
        // 3.5 返回主界面
        setTimeout(() => {
          this.$router.replace('/me');
        }, 2000)
      }
    },
    back(){
      this.$router.replace('/me');
    },
  },
  filters: {
    phoneFormat(phone){
      // 1. 转成数组
      // console.log(phone)
      let phoneArr = [...phone];
      // console.log(phoneArr);
      let str = '';
      phoneArr.forEach((item, index)=>{
        // console.log(item, index)
        if(index === 3 || index === 4 || index === 5 || index === 6){
          str += '*'
        }else {
          str += item;
        }
      });
      return str

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.user-detail
  width 100%
  height 100%
  .user-detail-top
    width 100%
    height 60px
    line-height 60px
    padding-left 10px
    font-weight bold
  .user-detail-group
    .user-icon
      height 60px
      padding 0 10px
      background-color #fff
      border-bottom: 1px solid #e0e0e0
      display flex
      justify-content space-between
      align-items center
      img
        width 50px
        border-radius 50%
    .user-item
      height 40px
      padding 0 10px
      background-color #fff
      border-bottom: 1px solid #e0e0e0
      display flex
      justify-content space-between
      align-items center
      input
        border none
        outline none
        text-align right
  .right-title-color
    color #999
    font-size 14px
  button
    width 90%
    height 40px
    line-height 40px
    text-align center
    margin 20px 5% 0
    border none
    font-size 16px
    color #fff
    border-radius 10px
    &.save
      background-color #e9232c
    &.back
      background-color #008800
</style>
