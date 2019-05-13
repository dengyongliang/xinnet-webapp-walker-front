<template lang="pug">
  Form.accountMobileModify(:label-width="150")
    .step1(v-show="step===1")
      FormItem(label="")
        p.tips 请使用账号{{userName}}（{{userCode}}）绑定手机号<em>{{userMobile}}</em> <br />接收短信验证码
      FormItem(label="")
        comp-input(name='verificationCode',label="短信验证码",ref="verificationCode1",defaultValue="",placeholder="短信验证码",styles="width:118px",:maxLength="6")
          Button.verificationCode(@click="getVerificationCode1", :loading="loadingBtn",slot="right") 获取短信验证码
      FormItem(label="")
        Button(type="primary",@click="nextForm",:loading="loadingBtn") 下一步
    .step2(v-show="step===2")
      FormItem(label="")
        comp-input(name='userMobile',label="新手机号码",ref="userMobile",validate="mobile",defaultValue="",placeholder="请输入新手机号码",:maxLength="11")
      FormItem(label="")
        comp-input(name='verificationCode',label="短信验证码",ref="verificationCode2",defaultValue="",placeholder="短信验证码",styles="width:118px",:maxLength="6")
          Button.verificationCode(@click="getVerificationCode2", :loading="loadingBtn",slot="right") 获取短信验证码
      FormItem(label="")
        Button(type="primary",@click="updateForm",:loading="loadingBtn") 完成
    input(type="hidden",ref="userCode",:value="userCode")
</template>

<script>
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {
    onClose: {
      type: Function
    },
    userMobile: {
      type: String,
      default: ''
    },
    userCode: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false,
      step: 1
    }
  },
  methods: {
    close () {
      this.onClose()
    },
    getVerificationCode1 () {
      this.loadingBtn = true
      this.$store.dispatch('SEND_OLD_PHONE_CODE').then(response => {
        this.loadingBtn = false
        if (response) {
          if (response.data.code === '1000') {
            this.$Message.success('发送成功')
          } else {
            if (response.data.code === '300') {
              this.$Message.error('短信验证码已发送')
            } else if (response.data.code === '500') {
              this.$Message.error('手机号码错误')
            } else {
              this.$Message.error('发送失败')
            }
          }
        }
      }).catch(() => {})
    },
    getVerificationCode2 () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userMobile
      ])
      if (result) {
        this.$store.dispatch('UPDATE_PHONE_CODE', {userMobile: this.$refs.userMobile.value}).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('发送成功')
            } else {
              if (response.data.code === '300') {
                this.$Message.error('短信验证码已发送')
              } else if (response.data.code === '500') {
                this.$refs.userMobile.showValidateResult({text: '手机号码错误'})
              } else {
                this.$Message.error('发送失败')
              }
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    },
    nextForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.verificationCode1
      ])
      if (result) {
        this.$store.dispatch('CHECK_OLD_PHONE_CODE', {verificationCode: this.$refs.verificationCode1.value}).then(response => {
          this.loadingBtn = false
          if (response && response.data.code === '1000') {
            this.$Message.success('验证成功')
            this.step = 2
          } else {
            this.$Message.error('验证失败')
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    },
    updateForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userMobile,
        this.$refs.verificationCode2
      ])
      if (result) {
        var params = {
          userCode: this.$refs.userCode.value,
          userMobile: this.$refs.userMobile.value,
          verificationCode: this.$refs.verificationCode2.value
        }
        this.$store.dispatch('UPDATE_USER_INFO', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('手机更新成功')
              this.$store.commit('UPDATE_USER_MOBILE', this.$refs.userMobile.value)
              this.close()
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else if (response.data.code === '400') {
                this.$refs.verificationCode2.showValidateResult({text: '手机验证码错误'})
              } else if (response.data.code === '600') {
                this.$refs.userMobile.showValidateResult({text: '手机号码已存在'})
              }
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
  },
  computed: {
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>
<style scoped>
form.accountMobileModify{
  padding:50px 0 0 0;
}
form.accountMobileModify .tips{
  font-size:15px;
  text-align:left;
}
form.accountMobileModify .tips em{
  color:#ff7101;
}
</style>
