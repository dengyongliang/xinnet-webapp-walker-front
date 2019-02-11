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
        Button.verificationCode(@click="getVerificationCode", :loading="loadingBtn",slot="right") 获取短信验证码
    FormItem.btn(label=" ")
      Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
</template>

<script>
import {mapState, mapActions} from 'vuex'
import * as types from '@/store/types'
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
      sexList: [
        {
          value: '男',
          label: '1'
        },
        {
          value: '女',
          label: '0'
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
          param: {
            userCode: this.userCode,
            userSex: this.$refs.userSex.value,
            userTel: this.$refs.userTel.value,
            userMobile: this.$refs.userMobile.value,
            verificationCode: this.$refs.verificationCode.value
          },
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.$Message.success('设置个人信息成功')
              this.$store.commit(types.CLEAR_ACTIVATION_DATA)
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
        }
        if (this.activation.keeperFlag) {
          params.param.qq = this.$refs.qq.value
          params.param.wx = this.$refs.wx.value
        }
        this.submitActivationUserInfo(params)
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
        let params = {
          param: {
            userMobile: this.$refs.userMobile.value
          },
          callback: (response) => {
            this.loadingBtn = false
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
        }
        this.getActivationVerificationCode(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      submitActivationUserInfo: types.SUBMIT_ACTIVATION_USER_INFO,
      getActivationVerificationCode: types.ACTIVATION_VERIFICATIONCODE
    })
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
</style>
