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
            comp-input(name='account',ref="account",defaultValue="",placeholder="手机/邮箱/用户名",styles="width:100%",:propsShow="false",:on-focusparent="onHideError",label="登录名",)
              Icon.iconleft(custom="i-icon i-icon-people",slot="left")
          FormItem
            comp-input(name='password',ref="password",defaultValue="",placeholder="请输入密码",type="password",styles="width:100%",:propsShow="false",:on-focusparent="onHideError",label="密码",)
              Icon.iconleft(custom="i-icon i-icon-lock1",slot="left")
          FormItem.verificationCodeInput
            comp-input(name='verificationCode',ref="verificationCode",defaultValue="",placeholder="请输验证码",styles="width:100%",:propsShow="false",:on-focusparent="onHideError",label="验证码",:maxLength="6",)
              Icon.iconleft(custom="i-icon i-icon-tick1",slot="left")
            a(href="javascript:;" @click="getVerificationCode",v-show="!success") {{textVC}}
            span.tips(v-show="success") 重新发送({{downTime}})

          FormItem
            Button(type="primary", @click="submit", :loading="loadingBtn") 立即登录
            router-link(to="/findPw",class="forgetPw") 忘记密码
      .footer
        span Copyright © 1993-2019<br />北京新网数码信息技术有限公司 版权所有

</template>

<script>
import compInput from '@/components/compInput'
import menuUtils from '@/global/menuUtils.js'
export default {
  components: {
    compInput
  },
  data () {
    return {
      errorText: '',
      loadingBtn: false,
      showError: false,
      success: false,
      textVC: '获取短信验证码',
      downTime: 60
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
        this.$refs.account.showValidateResult({})
        this.onShowError('请输入登录名')
        this.loadingBtn = false
        return false
      }

      let params = {
        userCode: this.$refs.account.value
      }
      this.$store.dispatch('CLIENT_LOGIN', params).then(response => {
        if (!response) {
          return false
        }
        let data = response.data
        if (data.code === '1000') {
          this.success = true
          this.countDown()
        } else if (data.code === '100') {
          this.$refs.account.showValidateResult({})
          this.onShowError('手机号码不存在')
        } else if (data.code === '200') {
          this.onShowError('获取短信验证码已超上限')
        } else if (data.code === '300') {
          this.onShowError('短信验证码已发送')
        }
      }).catch(() => {})
    },
    submit () {
      this.loadingBtn = true
      let account = this.$refs.account.value
      let pw = this.$refs.password.value
      let vc = this.$refs.verificationCode.value
      if (!account) {
        this.loadingBtn = false
        this.$refs.account.showValidateResult({})
        this.onShowError('请输入登录名')
        return false
      }
      if (!pw) {
        this.loadingBtn = false
        this.$refs.password.showValidateResult({})
        this.onShowError('请输入密码')
        return false
      }
      if (!vc) {
        this.loadingBtn = false
        this.$refs.verificationCode.showValidateResult({})
        this.onShowError('请输入验证码')
        return false
      }
      if (vc && vc.length < 6) {
        this.loadingBtn = false
        this.$refs.verificationCode.showValidateResult({})
        this.onShowError('请输入6位的数字')
        return false
      }
      let params = {
        account: account,
        password: pw,
        verificationCode: vc
      }
      this.$store.dispatch('LOGIN', params).then(response => {
        if (!response) {
          return false
        }
        let data = response.data
        let keeperFlag = data.keeperFlag
        if (data.code === '1000') {
          this.$Message.loading({
            content: '登录成功，获取账户信息',
            duration: 1
          })
          // 根据权限 生成菜单
          let pageMenus = []
          menuUtils(pageMenus, data.menus)
          // 添加404
          pageMenus.push({
            path: '*',
            name: '404',
            component (resolve) {
              return require(['@/page/404'], resolve)
            },
            meta: {
              title: '404',
              keepAlive: true,
              permission: '',
              compUrl: 'page/404'
            }
          })
          pageMenus.forEach((item) => {
            this.$router.options.routes.push(item)
          })
          // 添加到路由
          this.$router.addRoutes(pageMenus)
          // 相关数据 store 存储
          this.$store.commit('SET_MENUS', pageMenus)
          // sessionStorage 存储 menus 数据
          sessionStorage.setItem('menus', JSON.stringify(pageMenus))
          setTimeout(() => {
            if (keeperFlag * 1) {
              this.$router.replace({path: '/client'})
            } else {
              this.$router.replace({path: '/'})
            }
          }, 1000)
        } else {
          this.loadingBtn = false
          if (data.code === '100') {
            this.onShowError('用户不存在')
            this.$refs.account.showValidateResult({})
          } else if (data.code === '200') {
            this.onShowError('用户已登录')
            this.$refs.account.showValidateResult({})
          } else if (data.code === '300') {
            this.onShowError('手机验证码错误')
            this.$refs.verificationCode.showValidateResult({})
          } else if (data.code === '400') {
            this.onShowError('密码错误')
            this.$refs.password.showValidateResult({})
          } else if (data.code === '600') {
            this.onShowError('用户被锁定')
            this.$refs.account.showValidateResult({})
          } else if (data.code === '700') {
            this.onShowError('用户权限异常')
            this.$refs.account.showValidateResult({})
          } else if (data.code === '800') {
            this.onShowError('非法登录')
            this.$refs.account.showValidateResult({})
          }
        }
      }).catch(() => {})
    },
    countDown () {
      let clock = window.setInterval(() => {
        this.downTime--
        // 当倒计时小于0时清除定时器
        if (this.downTime < 0) {
          window.clearInterval(clock)
          this.success = false
          this.downTime = 60
        }
      }, 1000)
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
.pageLogin .compInput input{
  height:46px;
  line-height:46px;
  padding-left:55px;
}
.pageLogin .verificationCodeInput{
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
  color: #bcbcbc;
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
