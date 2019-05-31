<template lang="pug">
Collapse(v-model="value")
  Panel(name="1",)
    router-link(tag="a", target="_blank", :to="{path: '/report/own', query: {type: 'own'}}") <Icon custom="i-icon iconL i-icon-report" size="24" />自有域名监控报告

  Panel(name="2")
    router-link(tag="a", target="_blank", :to="{path: '/report/assets', query: {type: 'assets'}}") <Icon custom="i-icon iconL i-icon-report2" size="24" />域名资产报告

  Panel(name="3") <Icon custom="i-icon iconL i-icon-report1" size="24" />域名预算报告
    ul(slot="content")
      li.clear(v-for="item in budgetList")
        router-link(tag="a", target="_blank", :to="{path: '/report/budget', query: {reportId: item.id, type: 'budget', start: item.budgetCycleStart, end: item.budgetCycleEnd}}") {{item.budgetCycleStart | dateformat('YYYY-MM-DD')}} ~ {{item.budgetCycleEnd | dateformat('YYYY-MM-DD')}} 域名预算报告
        span.right {{item.modifyTime ? item.modifyTime : item.createTime | dateformat}} 更新

  Panel(name="4") <Icon custom="i-icon iconL i-icon-report3" size="24" />域名消费报告
    ul(slot="content")
      li.clear(v-for="item in consumptionList")
        router-link(tag="a", target="_blank", :to="{path: '/report/spending', query: {customerId: item.id, type: 'spending', start: item.thisCycle.split('~')[0], end: item.thisCycle.split('~')[1]}}") {{item.thisCycle}} 域名消费报告
        span.right {{item.payBillDate | dateformat}} 更新
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      value: '',
      budgetList: [],
      consumptionList: []
    }
  },
  methods: {
  },
  computed: {
  },
  beforeMount () {
    this.$store.dispatch('DOMAIN_BUDGET_REPORT_LIST', {pageNum: 1, pageSize: 20}).then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.budgetList = response.data.data.list
      } else {
      }
    }).catch(() => {})

    this.$store.dispatch('DOMAIN_CONSUMPTION_REPORT_LIST', {pageNum: 1, pageSize: 20}).then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.consumptionList = response.data.data.list
      } else {
      }
    }).catch(() => {})
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style>
.pageReport .mainBody .ivu-collapse-item{
  margin-bottom: 20px;
  border-top: none;
}
.pageReport .mainBody .ivu-collapse-header{
  height: 100px!important;
  line-height: 100px!important;
  font-size: 18px;
}
.pageReport .mainBody .ivu-collapse-header a{
  display: block;
}
.pageReport .mainBody .ivu-collapse-item:nth-child(1) .ivu-collapse-content,
.pageReport .mainBody .ivu-collapse-item:nth-child(2) .ivu-collapse-content{
  display:none!important;
}
.pageReport .mainBody .ivu-collapse-item .ivu-icon{
  display: none;
}
.pageReport .mainBody .ivu-collapse-item .iconL{
  display: inline-block;
  position: static;
  margin-left: 38px;
  color: #9299a3;
  margin-right: 15px;
}
.pageReport .mainBody .ivu-collapse-item .right{
  float: right;
  font-size: 12px;
  color: #999;
  padding-right: 40px;
}
.pageReport .ivu-collapse .ivu-collapse-item.ivu-collapse-item-active .ivu-collapse-header{
  color: #2571fa!important;
}
.pageReport .mainBody .ivu-collapse-item .ivu-collapse-content{
  background: #f7f8fa;
  padding: 30px 0 0 0;
}
.pageReport .mainBody .ivu-collapse-item .ivu-collapse-content-box{
  background: #f7f8fa;
  border:none;
  padding-left: 90px;
}
.pageReport .mainBody .ivu-collapse-item .ivu-collapse-content-box li{
  padding: 10px 0;
}
</style>
