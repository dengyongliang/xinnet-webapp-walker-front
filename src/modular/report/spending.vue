<template lang="pug">
.contReportSpending
  h3.h3T 消费总览
    .tR {{start}}日至{{end}}日，{{myUserInfo.manageCustomerName}}及其旗下公司数字品牌资产共计消费<b class="num">{{domainConsumptionReport.totalMoney}}</b>元。
  .secBox.secBox1
    h4.h4T.clear
      span.t 域名预算总额
    Row
      Col(span="12")
        ul
          li.clear(v-for="item in domainConsumptionReport.businessList")
            span.l {{item.type}}
            span.r {{item.money}}元

          li.clear.total
            span.l 总计：
            span.r <b>{{domainConsumptionReport.totalMoney}}</b>元
      Col(span="12")
        comp-chart-report-spending-cate(
          :charData="domainConsumptionReport"
        )

  .secBox.secBox2
    h4.h4T.clear
      span.t 每月消费类别及金额
    .c
      comp-chart-report-spending-month(
        :charData="domainConsumptionSortReport"
      )
  h3.h3T 各企业消费统计
  .secBox.secBox3
    h4.h4T.clear
      span.t 各企业消费金额及占比
    Row
      Col(span="12")
        ul
          li.clear(v-for="item in domainConsumptionCompanyReport.companyList")
            span.l {{item.companyName}}
            span.r {{item.totalMoney}}元
          li.clear.total
            span.l 总计：
            span.r <b>{{domainConsumptionCompanyReport.totalMoney}}</b>元
      Col(span="12")
        comp-chart-report-spending-company(
          :charData="domainConsumptionCompanyReport"
        )

  .secBox.secBox4
    h4.h4T.clear
      span.t 各企业消费类别统计
    .c
      comp-chart-report-spending-company-cate(
        :charData="domainConsumptionCompanySortReport"
      )
  .secBox.secBox5
    h4.h4T.clear
      span.t 各企业每月消费类别统计
    .c
      comp-chart-report-spending-month-cate(
        :charData="domainConsumptionCompanyMonthReport"
      )

  h3.h3T.clear 消费明细
  .secTable
    <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import compChartReportSpendingCate from '@/components/compChartReportSpendingCate'
import compChartReportSpendingCompany from '@/components/compChartReportSpendingCompany'
import compChartReportSpendingMonth from '@/components/compChartReportSpendingMonth'
import compChartReportSpendingCompanyCate from '@/components/compChartReportSpendingCompanyCate'
import compChartReportSpendingMonthCate from '@/components/compChartReportSpendingMonthCate'

export default {
  components: {
    compChartReportSpendingCate,
    compChartReportSpendingCompany,
    compChartReportSpendingMonth,
    compChartReportSpendingCompanyCate,
    compChartReportSpendingMonthCate
  },
  data () {
    return {
      value: '',
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '类型',
          key: 'type',
          className: 'col1'
        },
        {
          title: '数量',
          key: 'num',
          className: 'col2'
        },
        {
          title: '总价',
          key: 'total',
          className: 'col3'
        }
      ],
      list: [],
      customerId: 0,
      start: '',
      end: '',
      domainConsumptionReport: {
        totalMoney: 0,
        businessList: []
      },
      domainConsumptionSortReport: {
        dateList: [],
        goodTypeList: [],
        result: {}
      },
      domainConsumptionCompanySortReport: {
        companyNameList: [],
        goodTypeList: [],
        statisticsMap: {}
      },
      domainConsumptionCompanyMonthReport: {
        dateList: [],
        companyNameList: [],
        result: {}
      },
      domainConsumptionCompanyReport: {
        totalMoney: 0,
        companyList: []
      }
    }
  },
  methods: {
    ...mapActions({
      queryDomainConsumptionReport: types.QUERY_DOMAIN_CONSUMPTION_REPORT,
      queryDomainConsumptionDetailReport: types.QUERY_DOMAIN_CONSUMPTION_DETAIL_REPORT,
      queryDomainConsumptionSortReport: types.QUERY_DOMAIN_CONSUMPTION_SORT_REPORT,
      queryDomainConsumptionCompanySortReport: types.QUERY_DOMAIN_CONSUMPTION_COMPANY_SORT_REPORT,
      queryDomainConsumptionCompanyMonthReport: types.QUERY_DOMAIN_CONSUMPTION_COMPANY_MONTH_REPORT,
      queryDomainConsumptionCompanyReport: types.QUERY_DOMAIN_CONSUMPTION_COMPANY_REPORT
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
    // customerId
    this.customerId = this.$route.query.customerId
    this.start = this.$route.query.start
    this.end = this.$route.query.end

    let param = {
      customerId: this.customerId,
      backCycleStart: this.start,
      backCycleEnd: this.end
    }
    // 域名预算总额
    let params = {
      param: param,
      callback: (response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (response.data.code === '1000'){
          this.domainConsumptionReport.totalMoney = response.data.data.totalMoney
          this.domainConsumptionReport.businessList = function (vm) {
            let arr = []
            for (var i in vm.DATAS.BUSINESS_LIST) {
              arr.push({
                type: vm.DATAS.BUSINESS_LIST[i],
                money: response.data.data.businessList[0][i]
              })
            }
            return arr
          }(this)
        } else {
        }
      }
    }
    this.queryDomainConsumptionReport(params)
    // 每月消费类别及金额
    let params2 = {
      param: param,
      callback: (response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (response.data.code === '1000'){
          this.domainConsumptionSortReport = response.data.data
          let arr = {}
          Object.values(response.data.data.result).map((v) => {
            v.map((v2) => {
              if (arr[v2.orderGoodsType]) {
                arr[v2.orderGoodsType].push(v2.orderTotalMoney)
              } else {
                arr[v2.orderGoodsType] = []
                arr[v2.orderGoodsType].push(v2.orderTotalMoney)
              }
            })
          })
          this.domainConsumptionSortReport.result = arr
        } else {
        }
      }
    }
    this.queryDomainConsumptionSortReport(params2)
    // 各企业消费金额及占比
    let params3 = {
      param: param,
      callback: (response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (response.data.code === '1000'){
          this.domainConsumptionCompanyReport = response.data.data
        } else {
        }
      }
    }
    this.queryDomainConsumptionCompanyReport(params3)
    // 各企业消费类别统计
    let params4 = {
      param: param,
      callback: (response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (response.data.code === '1000'){
          this.domainConsumptionCompanySortReport = response.data.data
          let arr = {}
          Object.values(response.data.data.statisticsMap).map((v) => {
            v.map((v2) => {
              if (arr[v2.orderGoodsType]) {
                arr[v2.orderGoodsType].push(v2.orderTotalMoney)
              } else {
                arr[v2.orderGoodsType] = []
                arr[v2.orderGoodsType].push(v2.orderTotalMoney)
              }
            })
          })
          this.domainConsumptionCompanySortReport.statisticsMap = arr
        } else {
        }
      }
    }
    this.queryDomainConsumptionCompanySortReport(params4)
    // 各企业每月消费类别统计
    let params5 = {
      param: param,
      callback: (response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (response.data.code === '1000'){
          this.domainConsumptionCompanyMonthReport = response.data.data
          let arr = {}
          Object.values(response.data.data.result).map((v) => {
            v.map((v2) => {
              if (arr[v2.companyName]) {
                arr[v2.companyName].push(v2.totalMoney)
              } else {
                arr[v2.companyName] = []
                arr[v2.companyName].push(v2.totalMoney)
              }
            })
          })
          this.domainConsumptionCompanyMonthReport.result = arr
        } else {
        }
      }
    }
    this.queryDomainConsumptionCompanyMonthReport(params5)
    // 消费明细
    let params6 = {
      param: param,
      callback: (response) => {
        this.loadingBtn = false
        this.loadingTable = false
        if (response.data.code === '1000'){
          this.list = function (vm) {
            let arr = []
            for (var i in vm.DATAS.BUSINESS_LIST) {
              arr.push({
                type: vm.DATAS.BUSINESS_LIST[i],
                num: response.data.data.businessList[0][i + 'PayNumber'] + '个',
                total: response.data.data.businessList[0][i] + '元'
              })
            }
            return arr
          }(this)
        } else {
        }
      }
    }
    this.queryDomainConsumptionDetailReport(params6)
  },
  mounted(){
  },
  watch: {
  }
}
</script>

<style>
.contReportSpending .h3T{
  font-size: 25px;
  font-weight: normal;
  padding: 0 0 20px 20px;
}
.contReportSpending .h3T .tR{
  float: right;
  font-size: 14px;
}
.contReportSpending .h3T .tR .num{
  color: #f30a0d;
}
.contReportSpending .h3T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportSpending .h3T .tR .ivu-btn{
  margin: 0 10px;
}
.contReportSpending .secBox{
  background: #fff;
  padding: 13px 0;
  margin-bottom: 20px;
}
.contReportSpending .secBox .h4T{
  font-weight: normal;
}
.contReportSpending .secBox .h4T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.contReportSpending .secBox .h4T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.contReportSpending .secBox .h4T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportSpending .secBox .h4T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.contReportSpending .secBox1{
  padding-bottom: 50px;
}
.contReportSpending .secBox1 .ivu-row{
  margin-top: 32px;
}
.contReportSpending .secBox1 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportSpending .secBox1 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportSpending .secBox1 .ivu-col ul li{
  padding-bottom: 20px;
}
.contReportSpending .secBox1 .ivu-col ul li.total{
  border-top: 1px dashed #eee;
  padding-top: 20px;
}
.contReportSpending .secBox1 .ivu-col ul li.total b{
  color: #f40a0b;
  font-size: 20px;
}
.contReportSpending .secBox1 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportSpending .secBox1 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportSpending .secBox2{
  margin-bottom: 40px;
}
.contReportSpending .secBox2 .c{
  padding: 40px 0;
}
.contReportSpending .secBox2 .ivu-row{
  margin-top: 32px;
}
.contReportSpending .secBox2 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportSpending .secBox2 .ivu-col:nth-child(2){
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
}

.contReportSpending .secBox2 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportSpending .secBox2 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportSpending .secBox2 .ivu-col .num:after{
  content: '';
  display: block;
  width: 16px;
  height: 1px;
  background: #999;
  position: absolute;
  left: 50%;
  bottom: 0px;
  margin-left: -8px;
}
.contReportSpending .secBox2 .ivu-col .num i{
  font-size: 25px;
}
.contReportSpending .secBox2 .ivu-col ul{
  font-size: 12px;
  padding: 20px 55px 0 55px;
}
.contReportSpending .secBox2 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportSpending .secBox2 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportSpending .secBox2 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportSpending .secBox3{
  padding-bottom: 50px;
  margin-bottom: 50px;
}
.contReportSpending .secBox3 .ivu-row{
  margin-top: 32px;
}
.contReportSpending .secBox3 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportSpending .secBox3 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportSpending .secBox3 .ivu-col ul li{
  padding-bottom: 25px;
}
.contReportSpending .secBox3 .ivu-col ul li.total{
  border-top: 1px dashed #eee;
  padding-top: 25px;
}
.contReportSpending .secBox3 .ivu-col ul li.total b{
  color: #f40a0b;
  font-size: 20px;
}
.contReportSpending .secBox3 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportSpending .secBox3 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportSpending .secBox3 .ivu-divider{
  margin-top: 40px;
  background: #f7f8fa;
}
.contReportSpending .secBox4 .c{
  padding: 40px 0;
}
.contReportSpending .secBox5{
  margin-bottom: 40px;
}
.contReportSpending .secBox5 .c{
  padding: 40px 0;
}
.contReportSpending .secTable{
  padding: 0 20px 20px 20px;
  background: #fff;
}
</style>
