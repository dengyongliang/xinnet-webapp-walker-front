<template lang="pug">
  Row(type="flex", justify="center", align="middle", class="code-row-bg pageFindPw")
    Col.main.clear
      .logo
        img(src="../../static/img/login/logo.png")
      Form(form="login", ref="form")
        div.wrap
          div(v-show="step!==3")
            strong.t
              span 找回密码
            Alert(type="error", show-icon, :class="(showError?'animated fadeIn':'fadeOut')") {{errorText}}
            .setp1(v-show="step===1")
              FormItem.mobileInput
                comp-input(name='phoneNum',ref="phoneNum",defaultValue="",placeholder="输入账号绑定手机号",styles="width:100%",:propsShow="false",:on-focusparent="onHideError",:on-errorparent="onShowError",validate="mobile")
                  Icon.iconleft(custom="i-icon i-icon-mobile",slot="left")
                a(href="javascript:;" @click="getVerificationCode", v-if="!success") 获取短信验证码
                span.tips
                  i(v-if="success") 发送成功
              FormItem.verificationCodeInput
                comp-input(name='verificationCode',ref="verificationCode",defaultValue="",placeholder="输入验证码",:maxLength="6",styles="width:100%",:propsShow="false",:on-focusparent="onHideError",)
                  Icon.iconleft(custom="i-icon i-icon-tick1",slot="left")
              FormItem
                Button(type="primary", @click="nextForm", :loading="loadingBtn") 下一步
            .setp2(v-show="step===2")
              comp-re-password(
                defaultValue="",
                ref="compRePassword",
                label1="",
                label2="",
                placeholder1="请输入新密码",
                placeholder2="请重复新密码",
                styles1="width:100%",
                styles2="width:100%",
                :on-errorparent="onShowError",
                :on-focusparent="onHideError",
                :errorInCompInput="false"
              )
                Icon.iconleft(custom="i-icon i-icon-lock1",slot="left1")
                Icon.iconleft(custom="i-icon i-icon-lock1",slot="left2")
              FormItem
                Button(type="primary", @click="submit", :loading="loadingBtn") 完成
          .setp3(v-show="step===3")
            p.p1
              Icon(type="ios-checkmark-circle-outline")
            p.p2 已重置密码！
            p.p3 请重新登录
            Button(type="primary", :replace="true", to="/login") 去登录
      footer-body

</template>

<script>
import compInput from '@/components/compInput'
import compRePassword from '@/components/compRePassword'
import footerBody from '@/modular/footer'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compRePassword,
    footerBody
  },
  data () {
    return {
      step: 1,
      showError: false,
      errorText: 'errorText',
      success: false,
      modalAlertInfo: {
        show: false,
        title: '',
        content: ''
      },
      loadingBtn: false
    }
  },
  methods: {
    nextForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.phoneNum
      ])
      if (result) {
        if (this.$refs.verificationCode.value.length < 6) {
          this.onShowError('验证码错误')
          this.loadingBtn = false
        } else {
          let params = {
            userMobile: this.$refs.phoneNum.value,
            verificationCode: this.$refs.verificationCode.value
          }
          this.$store.dispatch('CHECK_FORGET_PASSWORD', params).then(response => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            let data = response.data
            if (data.code === '1000') {
              this.step = 2
            } else {
              this.$Message.error('手机号验证失败')
            }
          }).catch(() => {})
        }
      } else {
        this.onShowError('输入手机号格式有误')
        this.loadingBtn = false
      }
    },
    submit () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.compRePassword
      ])
      if (result) {
        var params = {
          userMobile: this.$refs.phoneNum.value,
          password: this.$refs.compRePassword.$refs.password.value,
          verificationCode: this.$refs.verificationCode.value
        }
        this.$store.dispatch('RESET_USER_PWD', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.step = 3
              this.$Message.success('密码重置成功')
            } else {
              if (response.data.code === '100') {
                this.$Message.error('账号不存在')
              } else {
                this.$Message.error('密码重置失败')
              }
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    },
    onShowError (errText) {
      this.showError = true
      this.errorText = errText
    },
    onHideError () {
      this.showError = false
    },
    getVerificationCode (e) {
      this.loadingBtn = true
      if (this.$refs.phoneNum.value === '') {
        this.$refs.phoneNum.showValidateResult({text: ''})
        this.onShowError('请输入手机号码')
        this.loadingBtn = false
        return false
      }
      let result = validateFormResult([
        this.$refs.phoneNum
      ])
      if (result) {
        this.$store.dispatch('SEND_FORGET_PASSWORD', {phoneNum: this.$refs.phoneNum.value}).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          let data = response.data
          if (data.code === '1000') {
            this.$Message.success('发送成功')
          } else if (data.code === '100') {
            this.$refs.phoneNum.showValidateResult({})
            this.onShowError('手机号码不存在')
          }
        }).catch(() => {})
      } else {
        this.onShowError('输入手机号格式有误')
        this.loadingBtn = false
      }
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
  }
}
</script>

<style scope>
.pageFindPw{
  height:100%;
  background:#f7f8fa;
}
.pageFindPw .main{
  width:1200px;
}
.pageFindPw .logo{
  padding-bottom:18px;
}
.pageFindPw form{
  height:600px;
  background:#fff url(../../static/img/login/bg.png) no-repeat 100% 0;
  box-shadow:2px 2px 5px rgba(0,0,0,0.2)
}
.pageFindPw form .wrap{
  width:400px;
  margin: 0 0 0 150px;
  padding-top: 68px;
}
.pageFindPw form strong{
  height:50px;
  line-height:50px;
  font-size:15px;
  display:block;
  border-bottom:1px solid #e1dfe0;
  margin-bottom:20px;
}
.pageFindPw form strong span{
  padding: 0 15px;
  display:inline-block;
  text-align:center;
  color:#666666;
  border-bottom:3px solid #2271f4;
  position:relative;
  top:-3px;
}
.pageFindPw .ivu-form-item{
  margin-bottom:20px;
}
.pageFindPw .compInput {
  position:relative;
}
.pageFindPw .compInput input{
  height:46px;
  line-height:46px;
  padding-left:55px;
}
.pageFindPw .mobileInput a{
  position:absolute;
  right:10px;
  top:13px;
  color:#2271f4;
  text-decoration: underline;
  line-height:20px;
}
.pageFindPw .verificationCodeInput{
  margin-bottom:30px;
}
.pageFindPw .ivu-btn{
  width:180px;
  height:50px;
  line-height: 34px;
  font-size:15px;
}
.pageFindPw .ivu-alert-error{
  padding-top:16px;
  padding-bottom:16px;
  padding-left:55px;
  margin-bottom:20px;
  opacity: 0;
}
.pageFindPw .ivu-alert-error .ivu-alert-icon{
  left:20px;
  top:50%;
  margin-top:-9px;
}
.pageFindPw .ivu-alert-error .ivu-icon{
  color:#f34d4d;
}
.pageFindPw .ivu-alert-error .ivu-alert-message{
  color:#ea7a79;
}
.pageFindPw .setp3{
  text-align:center;
  padding-top:100px;
}
.pageFindPw .setp3 .p1{
  padding-bottom:20px;
}
.pageFindPw .setp3 .p1 .ivu-icon{
  font-size:50px;
  color:#34a702;
}
.pageFindPw .setp3 .p2{
  font-size:24px;
}
.pageFindPw .setp3 .p3{
  padding:20px 0;
  margin-bottom:30px;
}
.pageFindPw .footer{
  text-align:center;
  padding:30px 0;
}
.pageFindPw .footer span{
  font-size:12px;
  color: #98999b;
  line-height:20px;
}
</style>
