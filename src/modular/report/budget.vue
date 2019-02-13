<template lang="pug">
.contReportBudget
  h3.h3T 域名预算总览
  .secBox.secBox1
    h4.h4T.clear
      span.t 域名预算总额
    Row
      Col(span="12")
        strong 域名总览
        em.num {{domainBudget.totalMoney ? domainBudget.totalMoney : 0}}
          i 元
        ul
          li.clear
            span.l 新注册域名
            span.r {{domainBudget.registerMoney ? domainBudget.registerMoney : 0}}元
          li.clear
            span.l 域名续费
            span.r {{domainBudget.renewMoney ? domainBudget.renewMoney : 0}}元
          li.clear
            span.l 域名安全保护
            span.r {{domainBudget.safeMoney ? domainBudget.safeMoney : 0}}元
          li.clear
            span.l 域名回购
            span.r {{domainBudget.repurchaseMoney ? domainBudget.repurchaseMoney : 0}}元
      Col(span="12")
        strong 域名预算
        comp-chart-report-budget-total(
          :charData="domainBudget"
        )

  .secBox.secBox2
    h4.h4T.clear
      span.t 域名注册
    p 据不完全统计下一预算周期即将开放注册的新顶级域 {{register.newNumber}}个，其中推荐注册的有<b v-for="(item, index) in register.recommendNewList">{{item + (index === (register.recommendNewList.length - 1) ? '' : ', ')}}</b>；根据项目规划，需新注通用顶级域名{{register.normalNumber}}个。预计新注域名预算如下：

    Row
      Col(span="12")
        strong 新顶级域名注册
        em.num {{register.newMoney}}
          i 元
        ul
          li.clear(v-for="item in register.newList")
            span.l {{item.domainSuffix}}
            span.r {{item.budgetNumber}}个

      Col(span="12")
        strong 通用顶级域名注册
        em.num {{register.normalMoney}}
          i 元
        ul
          li.clear(v-for="item in register.normalList")
            span.l {{item.domainSuffix}}
            span.r {{item.budgetNumber}}个

  .secBox.secBox3
    h4.h4T.clear
      span.t 域名续费及域名安全保护
    Row
      Col(span="12")
        strong 域名续费
        em.num {{renewAndSafe.renewMap ? renewAndSafe.renewMap.renewMoney : 0}}
          i 元
        ul
          li.clear
            span.l .com
            span.r {{renewAndSafe.renewMap ? renewAndSafe.renewMap.renewComNumber : 0}}元
          li.clear
            span.l .cn
            span.r {{renewAndSafe.renewMap ? renewAndSafe.renewMap.renewCnNumber : 0}}元
          li.clear
            span.l .com.cn
            span.r {{renewAndSafe.renewMap ? renewAndSafe.renewMap.renewComCnNumber : 0}}元
          li.clear
            span.l 其他后缀
            span.r {{renewAndSafe.renewMap ? renewAndSafe.renewMap.renewOtherNumber : 0}}元
      Col(span="12")
        comp-chart-report-budget-renew(
          :charData="renewAndSafe.renewMap"
        )
    Divider()
    Row
      Col(span="12")
        strong 域名安全保护
        em.num {{renewAndSafe.safeMap ? renewAndSafe.safeMap.safeMoney : 0}}
          i 元
        ul
          li.clear
            span.l 域名注册局锁
            span.r {{renewAndSafe.safeMap ? renewAndSafe.safeMap.safeNumber : 0}}个
      Col(span="12")
        comp-chart-report-budget-safe(
          :charData="renewAndSafe.safeMap"
        )

  h3.h3T.clear 域名回购
  .secTable
    <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import compSelect from '@/components/compSelect'
import compChartReportBudgetTotal from '@/components/compChartReportBudgetTotal'
import compChartReportBudgetRenew from '@/components/compChartReportBudgetRenew'
import compChartReportBudgetSafe from '@/components/compChartReportBudgetSafe'

export default {
  components: {
    compInput,
    compSelect,
    compChartReportBudgetTotal,
    compChartReportBudgetRenew,
    compChartReportBudgetSafe
  },
  props: {
  },
  data () {
    return {
      value: '',
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '域名',
          key: 'domainName',
          className: 'col1'
        },
        {
          title: '回购原因',
          key: 'reason',
          className: 'col2'
        },
        {
          title: '预估价格',
          key: 'budgetPrice',
          className: 'col3'
        }
      ],
      list: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      domainBudget: {},
      renewAndSafe: {},
      register: {},
      reportId: null,
      companyName: '',
      start: '',
      end: ''
    }
  },
  methods: {
    pageChange () {

    },
    ...mapActions({
      queryDomainBudgetReport: types.QUERY_DOMAIN_BUDGET_REPORT,
      queryDomainRepurchaseReport: types.QUERY_DOMAIN_REPURCHASE_REPORT,
      queryDomainRenewAndSafeReport: types.QUERY_DOMAIN_RENEW_AND_SAFE_REPORT,
      queryDomainRegisterReport: types.QUERY_DOMAIN_REGISTER_REPORT
    })
  },
  computed: {
  },
  beforeMount () {
    // 获取reportId
    this.reportId = this.$route.query.reportId

    if (this.reportId * 1 !== 0) {
      let params = {
        param: {
          reportId: this.reportId
        },
        callback: (response) => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.domainBudget = response.data.data
          } else {
          }
        }
      }
      this.queryDomainBudgetReport(params)
      let params2 = {
        param: {
          reportId: this.reportId
        },
        callback: (response) => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.list = response.data.data.list
          } else {
          }
        }
      }
      this.queryDomainRepurchaseReport(params2)
      let params3 = {
        param: {
          reportId: this.reportId
        },
        callback: (response) => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.renewAndSafe = response.data.data
          } else {
          }
        }
      }
      this.queryDomainRenewAndSafeReport(params3)

      let params4 = {
        param: {
          reportId: this.reportId
        },
        callback: (response) => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.register = response.data.data
            let arr = []
            this.register.newList.forEach((v, i) => {
              if (i > 2) {
                if (arr.length === 3) {
                  arr.push({
                    domainSuffix: '其他',
                    budgetNumber: 0
                  })
                }
                arr[3].budgetNumber = arr[3].budgetNumber + v.budgetNumber
              } else {
                arr.push(v)
              }
            })
            this.$set(this.register, 'newList', arr)

            arr = []
            this.register.normalList.forEach((v, i) => {
              if (i > 2) {
                if (arr.length === 3) {
                  arr.push({
                    domainSuffix: '其他',
                    budgetNumber: 0
                  })
                }
                arr[3].budgetNumber = arr[3].budgetNumber + v.budgetNumber
              } else {
                arr.push(v)
              }
            })
            this.$set(this.register, 'normalList', arr)
          } else {
          }
        }
      }
      this.queryDomainRegisterReport(params4)
    }
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style>
.contReportBudget .h3T{
  font-size: 25px;
  font-weight: normal;
  padding: 0 0 20px 20px;
}
.contReportBudget .h3T .tR{
  float: right;
  font-size: 12px;
}
.contReportBudget .h3T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportBudget .h3T .tR .ivu-btn{
  margin: 0 10px;
}
.contReportBudget .secBox{
  background: #fff;
  padding: 13px 0;
  margin-bottom: 20px;
}
.contReportBudget .secBox .h4T{
  font-weight: normal;
}
.contReportBudget .secBox .h4T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.contReportBudget .secBox .h4T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.contReportBudget .secBox .h4T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportBudget .secBox .h4T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.contReportBudget .secBox1{
  padding-bottom: 50px;
}
.contReportBudget .secBox1 .ivu-row{
  margin-top: 32px;
}
.contReportBudget .secBox1 .ivu-col{
  height: 215px;
  text-align: center;
}

.contReportBudget .secBox1 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportBudget .secBox1 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportBudget .secBox1 .ivu-col .num i{
  font-size: 25px;
}
.contReportBudget .secBox1 .ivu-col .num:after{
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
.contReportBudget .secBox1 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportBudget .secBox1 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportBudget .secBox1 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportBudget .secBox1 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportBudget .secBox2{
  padding-bottom: 50px;
}
.contReportBudget .secBox2 .h4T{
  margin-bottom: 40px;
}
.contReportBudget .secBox2 p{
  text-align: center;
  font-size: 12px;
}
.contReportBudget .secBox2 .ivu-row{
  margin-top: 32px;
}
.contReportBudget .secBox2 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportBudget .secBox2 .ivu-col:nth-child(2){
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
}

.contReportBudget .secBox2 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportBudget .secBox2 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportBudget .secBox2 .ivu-col .num:after{
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
.contReportBudget .secBox2 .ivu-col .num i{
  font-size: 25px;
}
.contReportBudget .secBox2 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportBudget .secBox2 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportBudget .secBox2 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportBudget .secBox2 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportBudget .secBox3{
  padding-bottom: 50px;
  margin-bottom: 50px;
}
.contReportBudget .secBox3 .ivu-row{
  margin-top: 32px;
}
.contReportBudget .secBox3 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportBudget .secBox3 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportBudget .secBox3 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportBudget .secBox3 .ivu-col .num i{
  font-size: 25px;
}
.contReportBudget .secBox3 .ivu-col .num:after{
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
.contReportBudget .secBox3 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportBudget .secBox3 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportBudget .secBox3 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportBudget .secBox3 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportBudget .secBox3 .ivu-divider{
  margin-top: 40px;
  background: #f7f8fa;
}
.contReportBudget .secTable{
  padding: 0 20px 20px 20px;
  background: #fff;
}
</style>
