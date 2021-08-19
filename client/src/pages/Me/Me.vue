<template>
  <div class="me">
    <SelectLogin v-if="!userInfo.id"/>
    <div v-else>
      <MeTop/>
    </div>
  </div>
</template>

<script>
  import SelectLogin from "../Login/SelectLogin";
  import MeTop from "./children/MeTop";
  import { mapState } from 'vuex'
  export default {
    name: "Me",
    components: {
      SelectLogin,
      MeTop
    },
    computed: {
      ...mapState(['userInfo'])
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .me
    background-color #f5f5f5
    width 100%
    height 100%

</style>
