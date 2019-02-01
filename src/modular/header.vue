<template lang="pug">
.frameTop.clear
  router-link.logo(to="/")
    img(src="../../static/img/logo.png")
  .right
    Poptip(:title="myUserInfo.userName", content="content <a>sfs</a>", placement="bottom")
      div(slot="content")
        span {{myUserInfo.manageCustomerName}}
        a(href="javascript:;",@click="showModals=true",class="btnSwitch") 切换
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
    comp-switch-client(:onClose="closeModal", @parentEvent="parentEvent")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compSwitchClient from '@/components/compSwitchClient'
// import mixinsWebSocket from '@/mixins/mixinsWebSocket'
import { emitter as restEmitter } from '@/global/rest'
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
      }
    })
  },
  methods: {
    logout () {
      let params = {
        callback: (response) => {
          if (response.data.code === '1000') {
            restEmitter.emit('closeWebSocket')
            this.$Message.success('登出成功')
            this.$router.replace({path: '/login'})
          } else {
          }
        }
      }
      this.loginOut(params)
    },
    closeModal () {
      this.showModals = false
    },
    parentEvent () {

    },
    ...mapActions({
      loginOut: types.LOGIN_OUT,
      getCurrentUserData: types.GET_CURRENT_USER_DATA
    })
  },
  beforeMount () {
    this.getCurrentUserData((response) => {
      if (response.data.code === '1000') {
        this.$store.commit(types.SET_LOGINED)
        this.$store.commit(types.SET_CURRENT_USER_DATA, response.data)
        this.$store.commit(types.SET_MENUS, response.data)
        let manageCustomerId = response.data.data.manageCustomerId
        Promise.all([
          this.$store.dispatch(types.GET_USER_ROLES),
          this.$store.dispatch(types.GET_USERS),
          this.$store.dispatch(types.GET_COMPANYS),
          this.$store.dispatch(types.GET_USER_AUTH_GROUPS)
        ]).then((response) => {
          // 获取信息成功
          // 开启websocket
          // this.initWebSocket(manageCustomerId)
          restEmitter.emit('openWebSocket', manageCustomerId)
        }).catch((error) => {
          console.log(error)
        })
      } else {
        this.$router.replace({ path: '/login' })
      }
    })
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
