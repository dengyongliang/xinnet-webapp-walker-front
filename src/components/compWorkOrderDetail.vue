<template lang="pug">
  Form.workOrderForm(:label-width="120")
    FormItem(label="状态：")
      span.text(v-show="orderData.status===1") 待处理
      span.text(v-show="orderData.status===2") 处理中
      span.text(v-show="orderData.status===3") 已完成
    FormItem(label="问题类型：")
      span.text {{ this.GLOBALS.QUESTION_TYPE[orderData.questionType] }}

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
      span.text {{ this.GLOBALS.QUESTION_MODIFY_TYPE[orderData.updateType] }}
    FormItem(label="安全问题类型：",v-show="orderData.questionType===3")
      span.text {{ this.GLOBALS.SECURITY_TYPE[orderData.securityType] }}
    FormItem(label="问题描述：")
      .text {{orderData.description}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
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
    showType (type) {
      this.qaType = type
      if (type === 1) {
        this.tips = 1
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === 2) {
        this.tips = 1
        this.showOrderCode = false
        this.showMoney = true
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === 3) {
        this.tips = 4
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = true
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === 4) {
        this.tips = 2
        this.showOrderCode = true
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = true
      } else if (type === 5) {
        this.tips = 5
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = true
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === 6) {
        this.tips = 5
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === 7) {
        this.tips = 3
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === 8) {
        this.tips = 0
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = false
        this.descriptionRequired = true
      }
    }
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