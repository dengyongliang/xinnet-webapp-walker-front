<template lang="pug">
.contOverview
  <!-- 标题区 -->
  h1.pageTitle.clear 财务总览

  .secMain
    div.sec.count
      div.t.clear
        span.text 消费统计
        .r
          span.text 统计日期
          DatePicker(type="daterange",placeholder="",v-model="time1",format="yyyy-MM-dd",@on-change="time=$event",placement="bottom-end")
          Button(type="primary", @click="queryPayStatistics",:loading="loadingBtn") 查询
      div.c
        Row
          Col.data(span="12")
            .colWrap
              table
                tr
                  td.col1 信用消费：
                  td.col2 {{creditMoney}} 元
                tr
                  td.col1 预付费消费：
                  td.col2 {{payMoney}} 元
              Divider(dashed)
              table
                tr
                  td.col1 消费总额：
                  td.col2 <em>{{totalMoney}}</em> 元
          Col.chart(span="12")
            .colWrap
              comp-chart-spend-total(:charData="payStatisticsTotalData")
      .secTable
        Table(:columns="columns", :data="list", :loading="loadingTable")
    div.sec.trend
      div.t.clear
        span.text 消费趋势
        .r
          span.text 统计日期
          DatePicker(type="daterange",placeholder="",v-model="time2",format="yyyy-MM-dd",@on-change="time=$event",placement="bottom-end")
          Button(type="primary", @click="queryPayStatisticsTrend",:loading="loadingBtn") 查询
      comp-chart-spend-trend(:charData="payStatisticsTrendData")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compChartSpendTrend from '@/components/compChartSpendTrend'
import compChartSpendTotal from '@/components/compChartSpendTotal'
export default {
  components: {
    compChartSpendTrend,
    compChartSpendTotal
  },
  data () {
    return {
      time1: '',
      time2: '',
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '产品名称',
          key: 'orderGoodsType',
          className: 'col1'
        },
        {
          title: '消费金额',
          key: 'orderTotalMoney',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.list[params.index].orderTotalMoney + ' 元')
            ])
          }
        },
        {
          title: '信用消费',
          key: 'orderCreditMoney',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.list[params.index].orderCreditMoney + ' 元')
            ])
          }
        },
        {
          title: '预付费消费',
          key: 'orderPayMoney',
          className: 'col4',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.list[params.index].orderPayMoney + ' 元')
            ])
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      list: [],
      creditMoney: '0.00',
      payMoney: '0.00',
      totalMoney: '0.00',
      payStatisticsTrendData: {},
      payStatisticsTotalData: {}
    }
  },
  methods: {
    getFinancePayStatisticsParam (obj) {
      this.loadingTable = true
      let vm = this
      let params = {
        param: {
          startTime: this.time1[0] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(this.time1[0]) : '',
          endTime: this.time1[1] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(this.time1[1]) : ''
        },
        callback: function(response){
          vm.loadingTable = false
          console.log(response.data)
          if (response.data.code === '1000'){
            vm.creditMoney = response.data.data.creditMoney
            vm.payMoney = response.data.data.payMoney
            vm.totalMoney = response.data.data.totalMoney
            vm.list = response.data.data.list
          } else {
            if (response.data.code === '900') {
              vm.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    getFinancePayStatisticsTrendParam (obj) {
      this.loadingBtn = true
      let vm = this
      let params = {
        param: {
          startTime: this.time2[0] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(this.time2[0]) : '',
          endTime: this.time2[1] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(this.time2[1]) : ''
        },
        callback: function(response){
          vm.loadingBtn = false
          console.log(response)
          if (response.data.code === '1000'){
            vm.payStatisticsTrendData = {
              data: ['2017-10','2017-12']
            }
          } else {
            if (response.data.code === '900') {
              vm.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    queryPayStatistics () {
      this.financePayStatistics(this.getFinancePayStatisticsParam())
    },
    queryPayStatisticsTrend () {
      this.financePayStatisticsTrend(this.getFinancePayStatisticsTrendParam())
    },
    ...mapActions({
      financePayStatistics: types.FINANCE_PAY_STATISTICS,
      financePayStatisticsTrend: types.FINANCE_PAY_STATISTICS_TREND
    })
  },
  computed: {
  },
  beforeMount () {
    this.financePayStatistics(this.getFinancePayStatisticsParam())
    this.financePayStatisticsTrend(this.getFinancePayStatisticsTrendParam())
  },
  mounted(){

  }
}
</script>

<style scoped>
.contOverview .secMain{
  background:none;
}
.contOverview .sec{
  background:#fff;
  padding:20px 0 0 0;
  margin-bottom:20px;
}
.contOverview .sec .t{
  padding:0 20px 0 0;
}
.contOverview .sec .t .text{
  font-size:16px;
  border-left:5px solid #2271f2;
  display:inline-block;
  height:25px;
  line-height:25px;
  padding-left:15px;
}
.contOverview .sec .r{
  float:right;
  font-size:12px;
}
.contOverview .sec .r .text{
  font-size:12px;
  padding:0px;
  border:none;
  color:#666;
  margin-right:10px;
}
.contOverview .sec .r button{
  margin-left:10px;
}
.contOverview .sec.count .colWrap{
  padding: 0 15%;
  font-size:12px;
}
.contOverview .sec.count td{
  line-height:35px;
}
.contOverview .sec.count td.col2{
  text-align:right;
}
.contOverview .sec.count td.col2 em{
  font-size:16px;
  font-weight:600;
  color:#f10c09;
}
.ivu-divider{
  margin:10px 0;
}
.chartCount{
  display:inline-block;
  margin:0 auto;
}
.contOverview .ivu-col.chart .colWrap{
  padding:0px!important;
  text-align:center;
}
.contOverview .ivu-col.data .colWrap{
  padding-top:80px;
}
.contOverview .sec.trend{
  text-align:center;
  padding-bottom:30px;
}
.contOverview .sec.trend .t{
  text-align:left;
}

</style>
