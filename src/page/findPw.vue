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
            Alert(type="error", show-icon, v-show="showError") {{errorText}}
            .setp1(v-show="step===1")
              FormItem.mobileInput
                comp-input(name='userName',ref="userName",defaultValue="",placeholder="输入账号绑定手机号",styles="width:100%",:on-errorparent="onShowError",:on-focusparent="onHideError",:errorInCompInput="false")
                  Icon.iconleft(custom="i-icon i-icon-mobile",slot="left")
                a(href="javascript:;" @click="getVerificationCode", v-if="!success") 获取短信验证码
                span.tips
                  i(v-if="success") 发送成功
              FormItem.verificationCodeInput
                comp-input(name='userName',ref="userName",defaultValue="",placeholder="输入验证码",:maxLength="6",styles="width:100%",:on-errorparent="onShowError",:on-focusparent="onHideError",:errorInCompInput="false")
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
      .footer
        span Copyright © 1993-2019<br />北京新网数码信息技术有限公司 版权所有

</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import compRePassword from '@/components/compRePassword'
export default {
  components: {
    compInput,
    compRePassword
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
      this.step = 2
    },
    submit () {
      this.step = 3
      this.loadingBtn = true
      let params = {
        param: {
          account: this.$refs.account.value,
          password: this.$refs.password.value,
          verificationCode: this.$refs.verificationCode.value
        },
        callback: (response) => {
          let data = response.data
          if (data.code === '1000') {
            this.step = 3
          } else {
            this.loadingBtn = false
            if (data.code === '100') {
              this.account.error = 2
            } else if (data.code === '200') {
              this.modalAlertInfo.show = true
              this.modalAlertInfo.title = '失败'
              this.modalAlertInfo.content = '用户已登录'
            } else if (data.code === '300') {
              this.verificationCode.error = 3
            } else if (data.code === '400') {
              this.password.error = 2
            } else if (data.code === '600') {
              this.modalAlertInfo.show = true
              this.modalAlertInfo.title = '失败'
              this.modalAlertInfo.content = '用户被锁定'
            } else if (data.code === '700') {
              this.modalAlertInfo.show = true
              this.modalAlertInfo.title = '失败'
              this.modalAlertInfo.content = '用户权限异常'
            }
          }
        }
      }

      this.loginSubmit(params)
    },
    onShowError (errText) {
      this.showError = true
      this.errorText = errText
    },
    onHideError () {
      this.showError = false
    },
    getVerificationCode (e) {
      if (this.$refs.account.value === '') {
        this.$refs.account.showValidateResult({text: ''})
        this.onShowError('请输入登录名')
        this.loadingBtn = false
        return false
      }

      let params = {
        param: {
          userCode: this.$refs.account.value
        },
        callback: (response) => {
          let data = response.data
          if (data.code === '1000') {
            this.success = true
            this.countDown()
          } else if (data.code === '100') {
            this.$refs.account.showValidateResult({text: '手机号码不存在'})
          } else if (data.code === '200') {
            this.onShowError('获取短信验证码已超上限')
          } else if (data.code === '300') {
            this.onShowError('短信验证码已发送')
          }
        }
      }
      this.loginVerificationCode(params)
    },
    ...mapActions({
      loginSubmit: types.LOGIN_SUBMIT,
      loginVerificationCode: types.LOGIN_VERIFICATIONCODE
    })
  },
  computed: {
    ...mapMutations([
      'types.SHOW_BODY_SPIN'
    ])
  },
  beforeMount () {
  },
  mounted () {
    this.$store.commit(types.SHOW_BODY_SPIN)
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
