<template lang="pug">
  Form.workOrderForm(:label-width="120")
    FormItem(label="状态：")
      span.text(v-show="orderData.status===1") 待处理
      span.text(v-show="orderData.status===2") 处理中
      span.text(v-show="orderData.status===3") 已完成
    FormItem(label="问题类型：")
      span.text {{ this.DATAS.QUESTION_TYPE[orderData.questionType] }}

      p(v-show="orderData.questionType===1") <Icon custom="i-icon i-icon-tips" size="16" />可委托管家注册并管理行者平台暂不支持注册的域名。
      p(v-show="orderData.questionType===2") <Icon custom="i-icon i-icon-tips" size="16" />可委托管家尝试回购已被他人注册的域名。
      p(v-show="orderData.questionType===3") <Icon custom="i-icon i-icon-tips" size="16" />若遇到域名解析疑似被篡改或其他安全问题，请联系管家。
      p(v-show="orderData.questionType===4") <Icon custom="i-icon i-icon-tips" size="16" />关于订单、预付款、信用额度、账单等问题。
      p(v-show="orderData.questionType===5") <Icon custom="i-icon i-icon-tips" size="16" />托管域名的信息修改、解析、续费等需联系管家进行操作。
      p(v-show="orderData.questionType===7") <Icon custom="i-icon i-icon-tips" size="16" />已购买注册局锁服务的域名，若需开启或关闭注册局锁，请提交工单。

    FormItem(label="域名：")
      pre.text {{ orderData.domainName ? orderData.domainName.replace(/[,，]/g, '\r\n') : '-' }}
    FormItem(label="订单编号：", v-show="orderData.questionType===4")
      span.text {{orderData.orderCode}}
    FormItem(label="预算：", v-show="orderData.questionType===2")
      span.text {{orderData.money}} 元
    FormItem(label="修改类型：", v-show="orderData.questionType===5")
      span.text {{ this.DATAS.QUESTION_MODIFY_TYPE[orderData.updateType] }}
    FormItem(label="安全问题类型：",v-show="orderData.questionType===3")
      span.text {{ this.DATAS.SECURITY_TYPE[orderData.securityType] }}
    FormItem(label="问题描述：")
      .text {{orderData.description}}
</template>

<script>
export default {
  components: {
  },
  props: {
    orderData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    },
    onClose: {
      type: Function
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
  },
  computed: {
  },
  beforeMount () {
  },
  watch: {
    orderData: function (val, oldVal) {
    }
  }
}
</script>

<style scoped>
.workOrderForm p{
  color:#aaa;
  padding-left:10px;
  display:inline-block;
}
.workOrderForm p .ivu-icon{
  color:#49afff;
  margin-right:5px;
}
</style>
