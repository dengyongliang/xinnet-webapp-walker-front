<template lang="pug">
  Row(type="flex", justify="center", align="middle", class="code-row-bg pageLogin")
    Col.main.clear
      .logo
        img(src="../../static/img/login/logo.png")
      Form(form="login", ref="form")
        div.wrap
          div(style="display:none")
            strong.t
              span 找回密码
            Alert(type="error", show-icon) An error prompt
            .setp1()
              FormItem.mobileInput
                comp-input(name='userName',ref="userName",defaultValue="",placeholder="输入账号绑定手机号",styles="width:100%")
                   i.font.iconleft.font-tick1(slot="left")
                a(href="javascript:;" @click="getVerificationCode", v-if="!verificationCode.success") 获取短信验证码
                span.tips
                  i(v-if="verificationCode.success") 发送成功
              FormItem.verificationCodeInput
                comp-input(name='userName',ref="userName",defaultValue="",placeholder="输入验证码",styles="width:100%")
                  i.font.iconleft.font-tick1(slot="left")
              FormItem
                Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
            .setp2()
              comp-re-password(defaultValue="",ref="compRePassword",:show="refresh",label1="",label2="",placeholder1="请输入新密码",placeholder2="请重复新密码",styles1="width:100%",styles2="width:100%")
                i.font.iconleft.font-lock1(slot="left1")
                Icon(type="ios-checkmark-circle",slot="right1",class="iconright")
                i.font.iconleft.font-lock1(slot="left2")
                Icon(type="ios-checkmark-circle",slot="right2",class="iconright")
              FormItem
                Button(type="primary", @click="submit", :loading="loadingBtn") 完成
          .setp3
            p.p1
              Icon(type="ios-checkmark-circle-outline")
            p.p2 已重置密码！
            p.p3
             a 请重新登录
            Button(type="primary", @click="submit", :loading="loadingBtn") 去登录
      .footer
        span Copyright © 1993-2018<br />北京新网数码信息技术有限公司 版权所有

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
      modalAlertInfo: {
        show: false,
        title: '',
        content: ''
      },
      loadingBtn: false,
      account: {
        value: '',
        error: 0
      },
      password: {
        value: '',
        error: 0
      },
      verificationCode: {
        value: '',
        error: 0,
        minlength: 6,
        success: false
      }
    }
  },
  methods: {
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
      let params = {
        param: {
          account: this.$refs.account.value,
          password: this.$refs.password.value,
          verificationCode: this.$refs.verificationCode.value
        },
        callback: (response) => {
          let data = response.data
          if (data.code === '1000') {
            window.location.href = '/'
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
    getVerificationCode (e) {
      if (this.$refs.account.value === '') {
        this.account.error = 1
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
            this.verificationCode.success = true
            this.modalAlertInfo.show = true
            this.modalAlertInfo.title = '发送成功'
            this.modalAlertInfo.content = '短信口令已经发送，截止当天23:59:59有效，请注意保留！'
          } else if (data.code === '100') {
            this.modalAlertInfo.show = true
            this.modalAlertInfo.title = '发送失败'
            this.modalAlertInfo.content = '手机号码错误'
          } else if (data.code === '200') {
            this.modalAlertInfo.show = true
            this.modalAlertInfo.title = '发送失败'
            this.modalAlertInfo.content = '短信验证码已超上限'
          } else if (data.code === '300') {
            this.modalAlertInfo.title = '提示'
            this.modalAlertInfo.content = '短信口令已经发送，截止当天23:59:59有效，请注意保留！'
            this.modalAlertInfo.show = true
          } else if (data.code === '900') {
            this.verificationCode.error = 4
          }
        }
      }
      this.loginVerificationCode(params)
    },
    onFocus (e) {
      this.account.error = 0
      this.password.error = 0
      this.verificationCode.error = 0
    },
    onBlur (e) {
      let val = e.target.value
      let name = e.target.name

      if (name === 'verificationCode') {
        if (val !== '') {
          if (val.length < this.verificationCode.minlength) {
            this.verificationCode.error = 2
          }
        }
      }
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
.pageLogin .compInput .font{
  position:absolute;
  top: 7px;
  left:20px;
  z-index:1;
  color:#bcbcbc;
}
.pageLogin .compInput .iconright{
  font-size:20px;
  right:-30px;
  top:13px;
  position:absolute;
  color:#77c936;
}
.pageLogin .compInput input{
  height:46px;
  line-height:46px;
  padding-left:55px;
}
.pageLogin .mobileInput a{
  position:absolute;
  right:10px;
  top:13px;
  color:#2271f4;
  text-decoration: underline;
  line-height:20px;
}
.pageLogin .verificationCodeInput{
  margin-bottom:30px;
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
.pageLogin .setp3{
  text-align:center;
  padding-top:100px;
}
.pageLogin .setp3 .p1{
  padding-bottom:20px;
}
.pageLogin .setp3 .p1 .ivu-icon{
  font-size:50px;
  color:#34a702;
}
.pageLogin .setp3 .p2{
  font-size:24px;
}
.pageLogin .setp3 .p3{
  padding:20px 0;
  margin-bottom:30px;
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
