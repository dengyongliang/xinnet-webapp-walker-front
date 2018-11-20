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
            comp-input(name='account',ref="account",defaultValue="",placeholder="手机/邮箱/用户名",styles="width:100%",:on-errorparent="onShowError",:on-focusparent="onHideError",:errorInCompInput="false",label="登录名",)
              Icon.iconleft(custom="i-icon i-icon-people",slot="left")
          FormItem
            comp-input(name='password',ref="password",defaultValue="",placeholder="请输入密码",type="password",styles="width:100%",:on-errorparent="onShowError",:on-focusparent="onHideError",:errorInCompInput="false",label="密码",)
              Icon.iconleft(custom="i-icon i-icon-lock1",slot="left")
          FormItem.verificationCodeInput
            comp-input(name='verificationCode',ref="verificationCode",defaultValue="",placeholder="请输验证码",styles="width:100%",:on-errorparent="onShowError",:on-focusparent="onHideError",:errorInCompInput="false",label="验证码",:maxLength="6",)
              Icon.iconleft(custom="i-icon i-icon-tick1",slot="left")
            a(href="javascript:;" @click="getVerificationCode",v-show="!success") 获取短信验证码
            span.tips(v-show="success") 发送成功

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
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  data () {
    return {
      errorText: '',
      loadingBtn: false,
      showError: false,
      success: false
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
    getVerificationCode (e) {
      if (this.$refs.account.value === '') {
        this.$refs.account.showValidateResult({text:''})
        this.onShowError('请输入登录名')
        this.loadingBtn = false
        return false
      }
      let vm = this
      let params = {
        param: {
          userCode: this.$refs.account.value
        },
        callback: function (response) {
          let data = response.data
          if (data.code === '1000') {
            vm.success = true
          } else if (data.code === '100') {
            vm.$refs.account.showValidateResult({text:'手机号码不存在'})
          } else if (data.code === '200') {
            vm.onShowError('获取短信验证码已超上限')
          } else if (data.code === '300') {
            vm.onShowError('短信验证码已发送')
          }
        }
      }
      this.loginVerificationCode(params)
    },
    submit () {
      this.loadingBtn = true
      let account = this.$refs.account.value
      let pw = this.$refs.password.value
      let vc = this.$refs.verificationCode.value
      if (!account) {
        this.loadingBtn = false
        this.$refs.account.showValidateResult({text:''})
        this.onShowError('请输入登录名')
        return false
      }
      if (!pw) {
        this.loadingBtn = false
        this.$refs.password.showValidateResult({text:''})
        this.onShowError('请输入密码')
        return false
      }
      if (!vc) {
        this.loadingBtn = false
        this.$refs.verificationCode.showValidateResult({text:''})
        this.onShowError('请输入验证码')
        return false
      }
      if (vc && vc.length < 6) {
        this.loadingBtn = false
        this.$refs.verificationCode.showValidateResult({text:''})
        this.onShowError('请输入6位的数字')
        return false
      }
      let vm = this
      let params = {
        param: {
          account: account,
          password: pw,
          verificationCode: vc
        },
        callback: function (response) {
          let data = response.data
          if (data.code === '1000') {
            vm.$Message.success('登录成功，获取账号信息！')
            // 获取账号信息
            setTimeout(() => {
              vm.getCurrentUserData(function(res){
                let data = res.data
                console.log(res)
                if (data.keeperFlag) {
                  alert(1)
                  vm.$router.replace({ path: '/selectClient' })
                } else {
                  alert(2)
                }
              })
            },500)
          } else {
            vm.loadingBtn = false
            if (data.code === '100') {
              vm.onShowError('用户不存在')
              vm.$refs.account.showValidateResult({text:'用户不存在'})
            } else if (data.code === '200') {
              vm.onShowError('用户已登录')
              vm.$refs.account.showValidateResult({text:'用户已登录'})
            } else if (data.code === '300') {
              vm.onShowError('手机验证码错误')
              vm.$refs.verificationCode.showValidateResult({text:'手机验证码错误'})
            } else if (data.code === '400') {
              vm.onShowError('密码错误')
              vm.$refs.password.showValidateResult({text:'密码错误'})
            } else if (data.code === '600') {
              vm.onShowError('用户被锁定')
              vm.$refs.account.showValidateResult({text:'用户被锁定'})
            } else if (data.code === '700') {
              vm.onShowError('用户权限异常')
              vm.$refs.account.showValidateResult({text:'用户权限异常'})
            } else if (data.code === '800') {
              vm.onShowError('非法登录')
              vm.$refs.account.showValidateResult({text:'非法登录'})
            }
          }
        }
      }
      this.loginSubmit(params)
    },
    ...mapActions({
      loginSubmit: types.LOGIN_SUBMIT,
      loginVerificationCode: types.LOGIN_VERIFICATIONCODE,
      getCurrentUserData: types.GET_CURRENT_USER_DATA
    })
  },
  computed: {
  },
  beforeMount () {
  },
  mounted(){
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
-.pageLogin .verificationCodeInput{
  margin-bottom:30px;
}
.pageLogin .verificationCodeInput a{
  position:absolute;
  right:10px;
  top:13px;
  color:#2271f4;
  text-decoration: underline;
  line-height:20px;
}
.pageLogin .verificationCodeInput .tips{
  position:absolute;
  right:10px;
  top:13px;
  line-height:20px;
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
