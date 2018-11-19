<template lang="pug">
  Row(type="flex", justify="center", align="middle", class="code-row-bg pageLogin")
    Col.main.clear
      .logo
        img(src="../../static/img/login/logo.png")
      Form(form="login", ref="form")
        div.wrap
          strong.t
            span 登录
          Alert(type="error", show-icon,v-show="showError") {{errorText}}
          FormItem
            comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",styles="width:100%",:on-errorparent="onShowError",:on-focusparent="onHideError",:errorInCompInput="false",label="登录名",:required="false")
              Icon.iconleft(custom="i-icon i-icon-people",slot="left")
          FormItem
            comp-input(name='userName',ref="userName",defaultValue="",placeholder="请输入密码",type="password",styles="width:100%",:on-errorparent="onShowError",:on-focusparent="onHideError",:errorInCompInput="false",label="密码",:required="false")
              Icon.iconleft(custom="i-icon i-icon-lock1",slot="left")
          FormItem
            Button(type="primary", @click="submit", :loading="loadingBtn") 立即登录
            a(href="javascript:;" @click="",class="forgetPw") 忘记密码
      .footer
        span Copyright © 1993-2018<br />北京新网数码信息技术有限公司 版权所有

</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
export default {
  components: {
    compInput
  },
  data () {
    return {
      errorText: '',
      loadingBtn: false,
      showError: false
    }
  },
  methods: {
    onShowError (errText) {
      this.showError = true
      this.errorText = errText
    },
    onHideError () {
      this.showError = false
    },
    submit () {
      this.loadingBtn = true
      if (this.$refs.account.value === '') {
        this.account.error = 1
        this.loadingBtn = false
        return false
      }
      if (this.$refs.password.value === '') {
        this.password.error = 1
        this.loadingBtn = false
        return false
      }
      if (this.$refs.verificationCode.value === '') {
        this.verificationCode.error = 1
        this.loadingBtn = false
        return false
      }
      if (this.$refs.verificationCode.value !== '' && this.$refs.verificationCode.value.length < 6) {
        this.verificationCode.error = 2
        this.loadingBtn = false
        return false
      }
      let param = {
        account: this.$refs.account.value,
        password: this.$refs.password.value,
        verificationCode: this.$refs.verificationCode.value
      }
      let vm = this
      let params = {
        param: {
          account: this.$refs.account.value,
          password: this.$refs.password.value,
          verificationCode: this.$refs.verificationCode.value
        },
        callback: function (response) {
          let data = response.data
          if (data.code === '1000') {
            window.location.href = '/'
          } else {
            vm.loadingBtn = false
            if (data.code === '100') {
              vm.account.error = 2
            } else if (data.code === '200') {
              vm.modalAlertInfo.show = true
              vm.modalAlertInfo.title = '失败'
              vm.modalAlertInfo.content = '用户已登录'
            } else if (data.code === '300') {
              vm.verificationCode.error = 3
            } else if (data.code === '400') {
              vm.password.error = 2
            } else if (data.code === '600') {
              vm.modalAlertInfo.show = true
              vm.modalAlertInfo.title = '失败'
              vm.modalAlertInfo.content = '用户被锁定'
            } else if (data.code === '700') {
              vm.modalAlertInfo.show = true
              vm.modalAlertInfo.title = '失败'
              vm.modalAlertInfo.content = '用户权限异常'
            }
          }
        }
      }

      this.loginSubmit(params)
    },
    ...mapActions({
      loginSubmit: types.LOGIN_SUBMIT
    })
  },
  computed: {
  },
  beforeMount () {
  },
  mounted(){
    this.$store.commit(types.SHOW_BODY_SPIN)
  }
}
</script>

<style scope>
.pageLogin{
  height:100%;
  background:#f7f8fa;
}
.pageLogin .main{
  width:1200px;
}
.pageLogin .logo{
  padding-bottom:18px;
}
.pageLogin form{
  height:600px;
  background:#fff url(../../static/img/login/bg.png) no-repeat 100% 0;
  box-shadow:2px 2px 5px rgba(0,0,0,0.2)
}
.pageLogin form .wrap{
  width:400px;
  margin: 0 0 0 150px;
  padding-top: 68px;
}
.pageLogin form strong{
  height:50px;
  line-height:50px;
  font-size:15px;
  display:block;
  border-bottom:1px solid #e1dfe0;
  margin-bottom:20px;
}
.pageLogin form strong span{
  padding: 0 15px;
  display:inline-block;
  text-align:center;
  color:#666666;
  border-bottom:3px solid #2271f4;
  position:relative;
  top:-3px;
}
.pageLogin .ivu-form-item{
  margin-bottom:20px;
}
.pageLogin .compInput {
  position:relative;
}
.pageLogin .compInput .iconleft{
  position:absolute;
  top: 15px;
  left:20px;
  z-index:1;
  color:#bcbcbc;
}
.pageLogin .compInput input{
  height:46px;
  line-height:46px;
  padding-left:55px;
}
.forgetPw {
  color:#2271f4;
  position:absolute;
  right:10px;
  top:10px;
}
.pageLogin .ivu-btn{
  width:180px;
  height:50px;
  font-size:15px;
}
.pageLogin .ivu-alert-error{
  padding-top:16px;
  padding-bottom:16px;
  padding-left:55px;
  margin-bottom:20px;
}
.pageLogin .ivu-alert-error .ivu-alert-icon{
  left:20px;
  top:50%;
  margin-top:-9px;
}
.pageLogin .ivu-alert-error .ivu-icon{
  color:#f34d4d;
}
.pageLogin .ivu-alert-error .ivu-alert-message{
  color:#ea7a79;
}
.pageLogin .footer{
  text-align:center;
  padding:30px 0;
}
.pageLogin .footer span{
  font-size:12px;
  color: #98999b;
  line-height:20px;
}
</style>
