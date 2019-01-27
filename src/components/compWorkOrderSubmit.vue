<template lang="pug">
  Form.workOrderForm(:label-width="120")
    FormItem(label="问题类型：",required)
      comp-select(name="questionType",:list="questionTypeList",ref="questionType",styles="width:350px",:on-parentmethod="showType", :defaultValue="qaTypeDefaultValue")
      p(v-show="tips==='1'") <Icon custom="i-icon i-icon-tips" size="16" />可委托管家注册并管理行者平台暂不支持注册的域名。
      p(v-show="tips==='2'") <Icon custom="i-icon i-icon-tips" size="16" />关于订单、预付款、信用额度、账单等问题。
      p(v-show="tips==='3'") <Icon custom="i-icon i-icon-tips" size="16" />已购买注册局锁服务的域名，若需开启或关闭注册局锁，请提交工单。
      p(v-show="tips==='4'") <Icon custom="i-icon i-icon-tips" size="16" />若遇到域名解析疑似被篡改或其他安全问题，请联系管家。
      p(v-show="tips==='5'") <Icon custom="i-icon i-icon-tips" size="16" />托管域名的信息修改、解析、续费等需联系管家进行操作。
      p(v-show="tips==='6'") <Icon custom="i-icon i-icon-tips" size="16" />可委托管家尝试回购已被他人注册的域名。
    FormItem(label="域名：",:required="domainNameRequired")
      comp-input(name='domainName',label="域名",ref="domainName",defaultValue="",placeholder="每行一个域名",type="textarea",styles="width:350px")
    FormItem(label="订单编号：", v-show="showOrderCode")
      comp-input(name='orderCode',label="订单编号",ref="orderCode",defaultValue="",placeholder="请用简要描述您需要管家帮您解决的问题",styles="width:350px")
    FormItem(label="预算：",required, v-show="showMoney")
      comp-input(name='money',label="预算",ref="money",defaultValue="",placeholder="请给出您能接受的收购以上全部域名的最高花费",styles="width:350px",:number="true")
    FormItem(label="修改类型：",required, v-show="showUpdateType")
      comp-select(name="updateType",:list="updateTypeList",ref="updateType",styles="width:350px")
    FormItem(label="安全问题类型：",required, v-show="showSafeType")
      comp-select(name="safeType",:list="safeTypeList",ref="safeType",styles="width:350px")
    FormItem(label="问题描述：",:required="descriptionRequired")
      comp-input(name='description',label="问题描述",ref="description",defaultValue="",placeholder="请用简要描述您需要管家帮您解决的问题",type="textarea",styles="width:350px")
    FormItem(label="")
      Button(type="primary",@click="submitForm",:loading="loadingBtn") 提交
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import compSelect from './compSelect'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compSelect
  },
  props: {
    onClose: {
      type: Function
    },
    refresh: {
      type: Boolean,
      default: false
    },
    qaTypeDefaultValue: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      qaType: "0",
      tips: "0",
      showOrderCode: false,
      showMoney: false,
      showUpdateType: false,
      showSafeType: false,
      loadingBtn: false,
      domainNameRequired: true,
      descriptionRequired: false,
      safeTypeList: function (vm) {
        let array = []
        for (var i in vm.DATAS.SECURITY_TYPE) {
          array.push({
            label: vm.DATAS.SECURITY_TYPE[i],
            value: i
          })
        }
        return array
      }(this),
      questionTypeList: function (vm) {
        let array = []
        for (var i in vm.DATAS.QUESTION_TYPE) {
          array.push({
            label: vm.DATAS.QUESTION_TYPE[i],
            value: i
          })
        }
        return array
      }(this),
      updateTypeList: function (vm) {
        let array = []
        for (var i in vm.DATAS.QUESTION_MODIFY_TYPE) {
          array.push({
            label: vm.DATAS.QUESTION_MODIFY_TYPE[i],
            value: i
          })
        }
        return array
      }(this)
    }
  },
  methods: {
    showType (type) {
      this.qaType = type
      if (type === "1") {
        this.tips = "1"
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === "2") {
        this.tips = "6"
        this.showOrderCode = false
        this.showMoney = true
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === "3") {
        this.tips = "4"
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = true
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === "4") {
        this.tips = "2"
        this.showOrderCode = true
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = true
      } else if (type === "5") {
        this.tips = "5"
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = true
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === "6") {
        this.tips = "5"
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === "7") {
        this.tips = "3"
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = true
        this.descriptionRequired = false
      } else if (type === "8") {
        this.tips = "0"
        this.showOrderCode = false
        this.showMoney = false
        this.showUpdateType = false
        this.showSafeType = false
        this.domainNameRequired = false
        this.descriptionRequired = true
      }
    },
    submitForm () {
      this.loadingBtn = true
      let vm = this
      var result = true
      var param = {}
      if (this.qaType === "0") {
        result = validateFormResult([
          this.$refs.questionType
        ])
      } else if (this.qaType === "1") {
        result = validateFormResult([
          this.$refs.domainName
        ])
      } else if (this.qaType === "2") {
        result = validateFormResult([
          this.$refs.domainName,
          this.$refs.money
        ])
        param.money = this.$refs.money.value
      } else if (this.qaType === "3") {
        result = validateFormResult([
          this.$refs.domainName,
          this.$refs.safeType
        ])
        param.securityType = this.$refs.safeType.value
      } else if (this.qaType === "4") {
        result = validateFormResult([
          this.$refs.domainName,
          this.$refs.description
        ])
        param.orderCode = this.$refs.orderCode.value
      } else if (this.qaType === "5") {
        result = validateFormResult([
          this.$refs.domainName,
          this.$refs.updateType
        ])
        param.updateType = this.$refs.updateType.value
      } else if (this.qaType === "6") {
        result = validateFormResult([
          this.$refs.domainName
        ])
      } else if (this.qaType === "7") {
        result = validateFormResult([
          this.$refs.domainName
        ])
      } else if (this.qaType === "8") {
        result = validateFormResult([
          this.$refs.description
        ])
      }
      param.questionType = this.$refs.questionType.value
      param.domainName = this.$refs.domainName.value.replace(/[\n\r]/g, ',')
      param.description = this.$refs.description.value
      if (result) {
        let params = {
          param: param,
          callback: function (response) {
            vm.loadingBtn = false
            if (response.data.code === '1000') {
              vm.$Message.success('工单提交成功')
              // 重置列表
              vm.$emit('refreshData')
              vm.onClose()
            } else {
              vm.$Message.error('操作失败')
            }
          }
        }
        console.log(params.param)
        this.submitWorkOrder(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      submitWorkOrder: types.SUBMIT_WORK_ORDER
    })
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      }
    })
  },
  beforeMount () {
    this.showType(this.qaTypeDefaultValue)
  }
}
</script>

<style scoped>
.workOrderForm p{
  color:#aaa;
}
.workOrderForm p .ivu-icon{
  color:#49afff;
  margin-right:5px;
}
</style>