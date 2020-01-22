<template lang="pug">
  Form.step.step2(form="", ref="form",)
    FormItem(label="用户名：")
      span.text {{activation.userCode}}
    FormItem(label="姓名：")
      span.text {{activation.userName}}
    FormItem(label="邮箱：")
      span.text {{activation.email}}
    FormItem(label="所属企业：",v-if="!activation.keeperFlag")
      span.text {{activation.companyName}}
    FormItem(label="性别：")
      comp-radio(name="userSex",:list="sexList",ref="userSex")
    FormItem(label="座机：")
      comp-input(name='tel',label="座机",ref="userTel",defaultValue="",placeholder="请输入座机",)
    FormItem(label="QQ：",v-if="activation.keeperFlag")
      comp-input(name='qq',label="QQ",ref="qq",defaultValue="",placeholder="请输入QQ",)
    FormItem(label="微信：",v-if="activation.keeperFlag")
      comp-input(name='wx',label="微信",ref="wx",defaultValue="",placeholder="请输入微信",)
    FormItem(label="手机号：")
      comp-input(name='userMobile',label="手机号",ref="userMobile",validate="mobile",defaultValue="",placeholder="请输入手机号",:maxLength="11")
    FormItem(label="短信验证码：")
      comp-input(name='verificationCode',label="短信验证码",ref="verificationCode",defaultValue="",placeholder="请输入短信验证码",styles="width:118px",:maxLength="6")
        Button.verificationCode(@click="getVerificationCode", :loading="loadingBtn", v-show="!success", slot="right") 获取短信验证码
        span.tips(v-show="success", slot="right") 重新发送({{downTime}})
    FormItem.btn(label=" ")
      Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
</template>

<script>
import {mapState} from 'vuex'
import compInput from '@/components/compInput'
import compRadio from '@/components/compRadio'
import validateFormResult from '@/global/validateForm'
export default {
  name: 'compActivationStep2',
  components: {
    compInput,
    compRadio
  },
  props: {
    userCode: ''
  },
  data () {
    return {
      verificationCode: false,
      loadingBtn: false,
      success: false,
      textVC: '获取短信验证码',
      downTime: 60,
      sexList: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '0',
          label: '女'
        }
      ]
    }
  },
  methods: {
    submit () {
      this.loadingBtn = true
      let result = false
      if (this.activation.keeperFlag) {
        result = validateFormResult([
          this.$refs.userTel,
          this.$refs.userSex,
          this.$refs.qq,
          this.$refs.wx,
          this.$refs.userMobile,
          this.$refs.verificationCode
        ])
      } else {
        result = validateFormResult([
          this.$refs.userTel,
          this.$refs.userSex,
          this.$refs.userMobile,
          this.$refs.verificationCode
        ])
      }

      if (result) {
        let params = {
          userCode: this.userCode,
          userSex: this.$refs.userSex.value,
          userTel: this.$refs.userTel.value,
          userMobile: this.$refs.userMobile.value,
          verificationCode: this.$refs.verificationCode.value
        }
        if (this.activation.keeperFlag) {
          params.qq = this.$refs.qq.value
          params.wx = this.$refs.wx.value
        }
        this.$store.dispatch('ACTIVATION_USER_INFO', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('设置个人信息成功')
              this.$store.commit('CLEAR_ACTIVATION_DATA')
              this.$emit('submitStep')
            } else {
              if (response.data.code === '100') {
                this.$refs.verificationCode.showValidateResult({text: '验证码错误或已失效'})
              } else if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户已激活')
              } else if (response.data.code === '400') {
                this.$Message.error('手机号码已存在')
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
    getVerificationCode () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userMobile
      ])

      if (result) {
        // 验证手机号
        this.$store.dispatch('CHECK_USER_PHONE', {'userMobile': this.$refs.userMobile.value}).then(response => {
          if (response) {
            if (response.data.code === '1000') {
              this.$store.dispatch('ACTIVATION_CODE', {userMobile: this.$refs.userMobile.value}).then(response => {
                this.loadingBtn = false
                if (response) {
                  if (response.data.code === '1000') {
                    this.$Message.success('发送成功')
                    this.success = true
                    this.countDown()
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
            } else {
              this.loadingBtn = false
              if (response.data.code === '100') {
                this.$refs.userMobile.showValidateResult({text: '号码已存在'})
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
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'activation'
    ])
  }
}
</script>
<style scoped>
.verificationCode{
  font-size:12px;
  height:38px;
  margin-right:5px;
}
.tips{
  font-size:12px;
  height:38px;
  margin-right:5px;
  color: #bcbcbc;
}
</style>
