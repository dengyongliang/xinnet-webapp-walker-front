<template lang="pug">
.contAssetsDomain
  h3.h3T 域名资产总览
  .secBox.secBox1
    h4.h4T.clear
      span.t 资产概况
    Row
      Col(span="8")
        strong 域名总数
        em.num {{report[0].domainNumber}}

      Col(span="8")
        strong 管理公司数量
        em.num {{report[0].companyCount}}

      Col(span="8")
        strong 管理人员
        em.num {{report[0].userCount}}
    p 截止{{new Date() | dateformat}}，{{myUserInfo.manageCustomerName}}共拥有域名数量{{report[0].domainNumber}}个，管理公司{{report[0].companyCount}}个，管理人员{{report[0].userCount}}人。域名监控时长{{monitoringDurTime}}天，域名安全问题产生次数0次
  .secBox.secBox2
    h4.h4T.clear
      span.t 域名所属公司
    comp-chart-report-assets-company(:charData="report[1]")

  .secBox.secBox3
    h4.h4T.clear
      span.t 域名后缀分布
    comp-chart-report-assets-suffix(:charData="report[2]")

  .secBox.secBox4
    h4.h4T.clear
      span.t 域名到期时间
    comp-chart-report-own-due-time(:charData="report[6]")

  .secBox.secBox5
    h4.h4T.clear
      span.t 域名安全保护
    Row
      Col(span="12")
        strong 一般保护域名安全服务开通情况
        comp-chart-report-assets-safe-normal(:charData="report[3]")
      Col(span="12")
        strong 重点保护域名安全服务开通情况
        comp-chart-report-assets-safe-important(:charData="report[4]")
    p 重点保护域名<em>{{report[5].safeNumber}}</em>个，占域名总数的<em>{{report[5].importantRate}}</em>；重点保护域名注册局锁开通率<em>{{report[5].backEndLockRate}}</em>，<em>{{report[5].backEndLockNotOpenNumber}}</em>个重点保护域名未开通注册局锁；<br />自动续费域名<em>{{report[5].autoRenewOpenNumber}}</em>，自动续费开通率<em>{{report[5].autoRenewRate}}</em>；禁止更新域名<em>{{report[5].updateProhibitedOpenNumber}}</em>个，禁止更新开通率<em>{{report[5].updateProhibitedRate}}</em>。
</template>

<script>
import {mapState} from 'vuex'
import compChartReportAssetsCompany from '@/components/compChartReportAssetsCompany'
import compChartReportAssetsSuffix from '@/components/compChartReportAssetsSuffix'
import compChartReportOwnDueTime from '@/components/compChartReportOwnDueTime'
import compChartReportAssetsSafeNormal from '@/components/compChartReportAssetsSafeNormal'
import compChartReportAssetsSafeImportant from '@/components/compChartReportAssetsSafeImportant'
import moment from 'moment'
export default {
  components: {
    compChartReportAssetsCompany,
    compChartReportAssetsSuffix,
    compChartReportOwnDueTime,
    compChartReportAssetsSafeNormal,
    compChartReportAssetsSafeImportant
  },
  data () {
    return {
      companyName: '',
      report: ['', '', '', '', '', '', '']
    }
  },
  methods: {
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      monitoringDurTime (state) {
        return moment(new Date()).diff(state.user.myUserInfo.createTime, 'days') 
      }
    })
  },
  beforeMount () {
    Promise.all([
      this.$store.dispatch('DOMAIN_ASSETS_VIEW_REPORT'),
      this.$store.dispatch('DOMAIN_COMPANY_VIEW_REPORT'),
      this.$store.dispatch('DOMAIN_SUFFIX_VIEW_REPORT'),
      this.$store.dispatch('DOMAIN_SAFE_NORMAL_REPORT'),
      this.$store.dispatch('DOMAIN_SAFE_IMPORTANT_REPORT'),
      this.$store.dispatch('DOMAIN_SAFE_RATE_REPORT'),
      this.$store.dispatch('DOMAIN_MONITOR_EXPIRE_REPORT')
    ]).then(response => {
      console.log(response)
      response.map((v, i, arr) => {
        if (!v) {
          return false
        }
        if (v.data.code === '1000') {
          this.$set(this.report, i, v.data.data)
        }
      })
      console.log(this.report)
    }).catch(() => {})
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style>
.contAssetsDomain .h3T{
  font-size: 25px;
  font-weight: normal;
  padding: 0 0 20px 20px;
}
.contAssetsDomain .h3T .tR{
  float: right;
  font-size: 12px;
}
.contAssetsDomain .h3T .tR span.text{
  padding: 0 10px 0 0;
}
.contAssetsDomain .h3T .tR .ivu-btn{
  margin: 0 10px;
}
.contAssetsDomain .secBox{
  background: #fff;
  padding: 13px 0;
  margin-bottom: 20px;
}
.contAssetsDomain .secBox .h4T{
  font-weight: normal;
}
.contAssetsDomain .secBox .h4T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.contAssetsDomain .secBox .h4T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.contAssetsDomain .secBox .h4T .tR span.text{
  padding: 0 10px 0 0;
}
.contAssetsDomain .secBox .h4T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.contAssetsDomain .secBox1{
  padding-bottom: 50px;
}
.contAssetsDomain .secBox1 .ivu-row{
  margin-top: 32px;
}
.contAssetsDomain .secBox1 .ivu-col{
  height: 110px;
  text-align: center;
}
.contAssetsDomain .secBox1 .ivu-col .ivu-icon{
  font-size: 20px;
  font-weight: 600;
}
.contAssetsDomain .secBox1 .ivu-col .ivu-icon.add{
  color: #f00
}
.contAssetsDomain .secBox1 .ivu-col .ivu-icon.del{
  color: #4db321
}
.contAssetsDomain .secBox1 .ivu-col:nth-child(2){
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
}
.contAssetsDomain .secBox1 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contAssetsDomain .secBox1 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contAssetsDomain .secBox1 .ivu-col .num:after{
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
.contAssetsDomain .secBox1 .ivu-col ul{
  font-size: 12px;
  padding: 20px 55px 0 55px;
}
.contAssetsDomain .secBox1 .ivu-col ul li{
  padding-bottom: 14px;
}
.contAssetsDomain .secBox1 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contAssetsDomain .secBox1 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contAssetsDomain .secBox1 p{
  font-size: 12px;
  text-align:center;
  padding: 45px 0 0 0;
}
.contAssetsDomain .secBox5{
  padding-bottom: 50px;
}
.contAssetsDomain .secBox5 .ivu-row{
  margin-top: 32px;
}
.contAssetsDomain .secBox5 .ivu-col{
  text-align: center;
}
.contAssetsDomain .secBox5 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contAssetsDomain .secBox5 p{
  text-align: center;
  line-height: 22px;
  font-size: 12px;
}
.contAssetsDomain .secBox5 p em{
  color: #2372f5;
  font-weight: 600;
}
</style>
