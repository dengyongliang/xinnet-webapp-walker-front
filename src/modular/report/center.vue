<template lang="pug">
Collapse(v-model="value")
  Panel(name="1",)
    router-link(to="/report/own") <Icon custom="i-icon iconL i-icon-report" size="24" />自有域名监控报告
      span.right 2018-12-14 13：21更新

  Panel(name="2")
    router-link(to="/report/assets") <Icon custom="i-icon iconL i-icon-report2" size="24" />域名资产报告
      span.right 2018-12-14 13：21更新

  Panel(name="3") <Icon custom="i-icon iconL i-icon-report1" size="24" />域名预算报告
    span.right 2018-12-14 13：21更新
    ul(slot="content")
      li.clear(v-for="item in budgetList")
        router-link(tag="a", target="_blank", :to="{ path: '/report/budget', query: {reportId: item.id, type: 'budget', start: item.budgetCycleStart, end: item.budgetCycleEnd}}") {{item.budgetCycleStart}} ~ {{item.budgetCycleEnd}} 域名预算报告
        span.right {{item.modifyTime}}更新

  Panel(name="4") <Icon custom="i-icon iconL i-icon-report3" size="24" />域名消费报告
    span.right 2018-12-14 13：21更新
    p(slot="content") 史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'

export default {
  components: {
  },
  data () {
    return {
      value: '',
      budgetList: []
    }
  },
  methods: {
    ...mapActions({
      queryDomainBudgetReportList: types.QUERY_DOMAIN_BUDGET_REPORT_LIST
    })
  },
  computed: {
  },
  beforeMount () {
    let params = {
      param: {
        pageNum: 1,
        pageSize: 20
      },
      callback: (response) => {
        if( response.data.code === '1000' ){
          this.budgetList = response.data.data.list
        } else {
        }
      }
    }
    this.queryDomainBudgetReportList(params)
  },
  mounted(){
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
