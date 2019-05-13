<template lang="pug">
  Form(:label-width="150", class="compAccountPasswordModify")
    .step1(v-show="step===1")
      FormItem(label="")
        p.tips 请使用账号{{userName}}（{{userCode}}）绑定手机号<em>{{userMobile}}</em> <br />接收短信验证码
      FormItem(label="")
        comp-input(name='verificationCode',label="短信验证码",ref="verificationCode",defaultValue="",placeholder="短信验证码",styles="width:118px",:maxLength="6")
          Button.verificationCode(@click="getVerificationCode", :loading="loadingBtn",slot="right") 获取短信验证码
      FormItem(label="")
        Button(type="primary",@click="nextForm",:loading="loadingBtn") 下一步
    .step2(v-show="step===2")
      comp-re-password(defaultValue="",ref="compRePassword",label1="请输入新密码：",label2="请重复输入新密码：",type="rePassword")
      FormItem(label="")
        Button(type="primary",@click="updateForm",:loading="loadingBtn") 完成
    input(type="hidden",ref="userCode",:value="userCode")
</template>

<script>
import compInput from './compInput'
import compRePassword from './compRePassword'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compRePassword
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
    getVerificationCode () {
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
    nextForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.verificationCode
      ])
      if (result) {
        this.$store.dispatch('CHECK_OLD_PHONE_CODE', {verificationCode: this.$refs.verificationCode.value}).then(response => {
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
        this.$refs.compRePassword
      ])
      if (result) {
        var params = {
          userCode: this.$refs.userCode.value,
          newPassword: this.$refs.compRePassword.$refs.password.value
        }
        this.$store.dispatch('UPDATE_USER_PASSWORD', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('登录密码更新成功')
              this.close()
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else if (response.data.code === '400') {
                this.$Message.error('原始密码错误')
              } else {
                this.$Message.error('登录密码更新失败')
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
  }
}
</script>
<style>
.compAccountPasswordModify{
  padding:50px 0 0 0;
}
.compAccountPasswordModify .tips{
  font-size:15px;
}
.compAccountPasswordModify .tips em{
  color:#ff7101;
}
.compAccountPasswordModify .compRePassword input{
  height: 32px;
  line-height: 32px;
  padding: 4px 7px;
}
</style>
