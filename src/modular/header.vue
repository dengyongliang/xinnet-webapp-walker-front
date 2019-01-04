<template lang="pug">
.frameTop.clear
  .logo
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
    span.email
      Icon(type="ios-mail-outline")
      em.num 1
    span.line |
    a(href="http://www.xinnet.com") 新网首页
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
export default {
  components: {
    compSwitchClient
  },
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
      }
    })
  },
  methods: {
    logout () {
      let vm = this
      let params = {
        callback: function (response) {
          if( response.data.code === '1000' ){
            vm.$Message.success('登出成功')
            vm.$router.replace({ path: '/login' })
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
    let vm = this
    this.getCurrentUserData(function (response) {
      if (response.data.code === '1000') {
        vm.$store.commit(types.SET_LOGINED)
        vm.$store.commit(types.SET_CURRENT_USER_DATA, response.data)
        Promise.all([
          vm.$store.dispatch(types.GET_USER_ROLES),
          vm.$store.dispatch(types.GET_USERS),
          vm.$store.dispatch(types.GET_COMPANYS),
          vm.$store.dispatch(types.GET_USER_AUTH_GROUPS)
        ]).then((response) => {
          // 获取信息成功
        }).catch((error) => {
          console.log(error)
        })
      } else {
        vm.$router.replace({ path: '/login' })
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
  color:#fff;
  font-size:12px;
  width:16px;
  height:16px;
  line-height:16px;
  display:block;
  text-align:center;
  border-radius:100%;
  margin: -10px -5px 0 0;
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