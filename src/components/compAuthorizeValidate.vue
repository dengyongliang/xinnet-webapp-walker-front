<template lang="pug">
  div.compAuthorizeValidate()
    p.p1 域名<strong>{{detailData.domainName}}</strong>为重点保护域名，若进行解析设置/修改DNS等操作需该域名所在分组负责人授权。点击“获取验证码”按钮，将发送短信验证码至
    p.p2 {{detailData.contactorName}}（{{detailData.regUserCode}}）绑定手机
    p.p3 {{detailData.contactorMobile}}
    div.vcode
      comp-input(name='verificationCode',label="短信验证码",ref="verificationCode",defaultValue="",placeholder="短信验证码",styles="width:200px",:maxLength="6")
        Button.verificationCode(@click="getVerificationCode", :loading="loadingBtn",slot="right") 获取验证码
    div.btn
      Button(@click="onClose") 取消
      Button(type="primary", @click="submitForm") 确定
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
export default {
  components: {
    compInput
  },
  props: {
    detailData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    },
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    getVerificationCode () {
      this.loadingBtn = true
      let params = {
        param: {
          domainId: this.detailData.id
        },
        callback: (response) => {
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
              }
            }
          }
        }
      }
      this.getDomainMgmtVCode(params)
    },
    submitForm () {
      this.$emit('parentEvent', this.$refs.verificationCode.value)
    },
    ...mapActions({
      getDomainMgmtVCode: types.GET_DOMAIN_MGMT_V_CODE
    })
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
.compAuthorizeValidate p{
  font-size: 14px;
  color: #666;
  line-height: 18px;
  padding: 0 50px;
}
.compAuthorizeValidate .p1{
  margin-bottom: 20px;
}
.compAuthorizeValidate .p1 strong{
  color:#ff7200;
  font-weight: normal;
}
.compAuthorizeValidate .p2{
  text-align:center;
  color: #333;
}
.compAuthorizeValidate .p3{
  text-align:center;
  margin-bottom: 20px;
  color:#ff7200;
  font-weight: 600;
  font-size: 16px;
}
.compAuthorizeValidate .vcode{
  text-align:center;
}
.compAuthorizeValidate .btn{
  text-align:center;
  padding: 30px 0 10px 0;
}
.compAuthorizeValidate .btn .ivu-btn{
  margin:0 10px;
}
</style>
