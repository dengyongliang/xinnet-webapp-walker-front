<template lang="pug">
.frameTop.clear
  router-link.logo(to="/")
    img(src="../../static/img/logo.png")
  .right
    span(v-if="!myUserInfo.keeperFlag") {{myUserInfo.userName}}
    Poptip(v-if="myUserInfo.keeperFlag", :title="myUserInfo.userName", content="", placement="bottom")
      div(slot="content")
        span {{myUserInfo.manageCustomerName}}
        a(href="javascript:;",@click="showModals=true",class="btnSwitch" v-if="myUserInfo.keeperFlag") 切换
      span.avatar
        Avatar(:src="myUserInfo.companyLogoFile",size="small")
        span.name {{myUserInfo.userName}}
        Icon(type="md-arrow-dropdown")
    span.line |
    router-link.email(to="/notice/monitoring")
      Icon(type="ios-mail-outline")
      em.num
        i {{userMsgNum}}
    span.line |
    router-link(to="/report") 报告中心
    span.line |
    a(href="http://www.xinnet.com",target="_blank") 新网首页
    a(href="javascript:;", @click="logout", class="exit") 退出

  <!-- 切换客户 -->
  Modal(
    v-model="showModals",
    title="切换客户",
    :loading="loadingBtn",
    :footer-hide="true"
  )
    comp-switch-client(:onClose="closeModal", @parentEvent="parentEvent", v-if="showModals")
</template>

<script>
import { mapState } from 'vuex'
import compSwitchClient from '@/components/compSwitchClient'
// import mixinsWebSocket from '@/mixins/mixinsWebSocket'
export default {
  components: {
    compSwitchClient
  },
  // mixins: [mixinsWebSocket],
  data () {
    return {
      loadingBtn: false,
      showModals: false
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      userMsgNum (state) {
        return state.user.userMsgNum
      },
      islogin (state) {
        return state.islogin
      }
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('LOGOUT').then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.$Message.success('登出成功')
          this.$router.replace({path: '/login'})
        }
      }).catch(() => {})
    },
    closeModal () {
      this.showModals = false
    },
    parentEvent () {
    }
  },
  beforeMount () {
    // 获取当前客户信息
    this.$store.dispatch('MY_USER_INFO').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {

      } else {
        this.$router.replace({ path: '/login' })
      }
    }).catch(() => {})
  }
}
</script>

<style scoped>
.frameTop{
  width: 100%;
  height: 50px;
  position:fixed;
  left:0px;
  top:0px;
  background: #fff;
  line-height: 50px;
  z-index: 999;
  -moz-box-shadow:1px 1px 3px rgba(0,0,0,0.2);
  -webkit-box-shadow:1px 1px rgba(0,0,0,0.2);
  box-shadow:1px 1px 3px rgba(0,0,0,0.2);
}
.frameTop .logo{
  width:200px;
  text-align:center;
  height: inherit;
  line-height: 40px;
  display: inline-block;
  background:#135edb;
  vertical-align:top;
  float: left;
}
.frameTop .logo img{
  vertical-align:middle;
}
.frameTop .right{
  float:right;
  font-size:12px;
  color:#666;
  margin-right:20px;
}
.frameTop .avatar{
  cursor:pointer;
}
.frameTop .avatar .name{
  display:inline-block;
  margin:0 10px;
}
.frameTop .avatar .ivu-icon{
  font-size:17px;
}
.frameTop .avatar .ivu-avatar{
  width:18px;
  height:18px;
}
.frameTop .email{
  position:relative;
}
.frameTop .email .ivu-icon{
  font-size:26px;
}
.frameTop .email .num{
  position:absolute;
  right:0px;
  top:0px;
  background:#f00;
  font-size:12px;
  width:16px;
  height:16px;
  line-height:16px;
  display:block;
  text-align:center;
  border-radius:100%;
  margin: -10px -5px 0 0;
}
.frameTop .email .num i{
  color:#fff;
  display:inline-block;
  transform: scale(0.7);
}
.frameTop .line{
  display:inline-block;
  color:#e5e5e5;
  margin:0 20px;
}
.frameTop .exit{
  margin-left:20px;
}
.frameTop .ivu-poptip-arrow{
  display:none;
}
</style>
