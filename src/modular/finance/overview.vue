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
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compChartSpendTrend from '@/components/compChartSpendTrend'
import compChartSpendTotal from '@/components/compChartSpendTotal'
import moment from 'moment'
export default {
  components: {
    compChartSpendTrend,
    compChartSpendTotal
  },
  data () {
    return {
      // 一月区间
      time1: [
        new Date(moment().subtract(1, 'months').format('YYYY-MM-DD') + ' 00:00:00'),
        new Date(moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59')
      ],
      // 一年区间
      time2: [
        new Date(moment().subtract(1, 'years').format('YYYY-MM-DD') + ' 00:00:00'),
        new Date(moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59')
      ],
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '产品名称',
          key: 'orderGoodsType',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.DATAS.ORDER_GOODS_TYPE[this.list[params.index].orderGoodsType])
            ])
          }
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
                    this.toOrderMgmt(
                      {
                        orderGoodsType: this.list[params.index].orderGoodsType,
                        startTime: this.time1[0] !== '' ? moment(this.time1[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
                        endTime: this.time1[1] !== '' ? moment(this.time1[1]).format('YYYY-MM-DD') + ' 23:59:59' : ''
                      }
                    )
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
    toOrderMgmt (obj) {
      this.$router.push({path: '/order/orderMgmt', query: {orderGoodsType: obj.orderGoodsType, startTime: obj.startTime, endTime: obj.endTime}})
    },
    getFinancePayStatisticsParam (obj) {
      this.loadingTable = true
      let params = {
        param: {
          startTime: this.time1[0] !== '' ? moment(this.time1[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
          endTime: this.time1[1] !== '' ? moment(this.time1[1]).format('YYYY-MM-DD') + ' 23:59:59' : ''
        },
        callback: (response) => {
          this.loadingTable = false
          console.log(response.data)
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.creditMoney = response.data.data.creditMoney
            this.payMoney = response.data.data.payMoney
            this.totalMoney = response.data.data.totalMoney
            this.list = response.data.data.list
            let charData = {}
            charData.legend = []
            charData.series = response.data.data.businessList.map((value, idx, arr) => {
              let name = this.DATAS.BUSINESS_LIST[Object.keys(value)]
              charData.legend.push(name)
              return {
                name: name,
                value: value[Object.keys(value)]
              }
            })
            this.payStatisticsTotalData = charData
          } else {
            if (response.data.code === '900') {
              this.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    getFinancePayStatisticsTrendParam (obj) {
      this.loadingBtn = true
      let params = {
        param: {
          startTime: this.time2[0] !== '' ? moment(this.time2[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
          endTime: this.time2[1] !== '' ? moment(this.time2[1]).format('YYYY-MM-DD') + ' 23:59:59' : ''
        },
        callback: (response) => {
          this.loadingBtn = false
          console.log(response)
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.payStatisticsTrendData = {
              legend: [],
              xAxis: [],
              series: []
            }
            this.payStatisticsTrendData.xAxis = response.data.data.dateList
            this.payStatisticsTrendData.series = response.data.data.goodTypeList.map((value, idx, arr) => {
              this.payStatisticsTrendData.legend.push(this.DATAS.ORDER_GOODS_TYPE[value])
              var arrs = []
              response.data.data.dateList.forEach((item1, index1) => {
                if (response.data.data.result[item1]) {
                  response.data.data.result[item1].forEach((item2, index2) => {
                    if (item2.orderGoodsType === parseInt(value)) {
                      arrs.push(item2.orderTotalMoney)
                    }
                  })
                } else {
                  return arrs.push(0)
                }
              })
              return {
                name: this.DATAS.ORDER_GOODS_TYPE[value],
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: arrs
              }
            })
            // console.log(vm.payStatisticsTrendData.series)
          } else {
            if (response.data.code === '900') {
              this.$Message.error('查询失败')
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
  mounted () {
    console.log(moment().subtract(1, 'months').format('YYYY-MM-DD'))
  }
}
</script>

<style>
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
.contOverview .sec.count .data td.col2{
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
.contOverview .ivu-table-header th{
  background:#fcfdff!important;
  height:54px;
  line-height: 54px;
  font-weight: 200;
}
</style>
