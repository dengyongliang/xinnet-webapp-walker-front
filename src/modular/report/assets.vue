<template lang="pug">
.contAssetsDomain
  h3.h3T 域名资产总览
  .secBox.secBox1
    h4.h4T.clear
      span.t 资产概况
    Row
      Col(span="8")
        strong 域名总数
        em.num {{reportAssets.domainNumber}}

      Col(span="8")
        strong 管理公司数量
        em.num {{reportAssets.companyCount}}

      Col(span="8")
        strong 管理人员
        em.num {{reportAssets.userCount}}
    p 截止2018-12-13 21：30，天翼实业集团有限公司共拥有域名数量{{reportAssets.domainNumber}}个，管理公司{{reportAssets.companyCount}}个，管理人员{{reportAssets.userCount}}人。域名监控时长1112天，域名安全问题产生次数0次。
  .secBox.secBox2
    h4.h4T.clear
      span.t 域名所属公司
    comp-chart-report-assets-company(:charData="reportcompany")

  .secBox.secBox3
    h4.h4T.clear
      span.t 域名后缀分布
    comp-chart-report-assets-suffix(:charData="reportSuffix")

  .secBox.secBox4
    h4.h4T.clear
      span.t 域名到期时间
    comp-chart-report-own-due-time(:charData="reportExpire")

  .secBox.secBox5
    h4.h4T.clear
      span.t 域名安全保护
    Row
      Col(span="12")
        strong 一般保护域名安全服务开通情况
        comp-chart-report-assets-safe-normal(:charData="reportSafeNormal")
      Col(span="12")
        strong 重点保护域名安全服务开通情况
        comp-chart-report-assets-safe-important(:charData="reportSafeImportant")
    p 重点保护域名<em>{{reportSafeRate.safeNumber}}</em>个，占域名总数的<em>{{reportSafeRate.importantRate}}</em>；重点保护域名注册局锁开通率<em>{{reportSafeRate.backEndLockRate}}</em>，<em>{{reportSafeRate.backEndLockNotOpenNumber}}</em>个重点保护域名未开通注册局锁；<br />自动续费域名<em>{{reportSafeRate.autoRenewOpenNumber}}</em>，自动续费开通率<em>{{reportSafeRate.autoRenewRate}}</em>；禁止更新域名<em>{{reportSafeRate.updateProhibitedOpenNumber}}</em>个，禁止更新开通率<em>{{reportSafeRate.updateProhibitedRate}}</em>。
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compChartReportAssetsCompany from '@/components/compChartReportAssetsCompany'
import compChartReportAssetsSuffix from '@/components/compChartReportAssetsSuffix'
import compChartReportOwnDueTime from '@/components/compChartReportOwnDueTime'
import compChartReportAssetsSafeNormal from '@/components/compChartReportAssetsSafeNormal'
import compChartReportAssetsSafeImportant from '@/components/compChartReportAssetsSafeImportant'
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
      reportAssets: {},
      reportcompany: {},
      reportSuffix: {},
      reportExpire: {},
      reportSafeNormal: {},
      reportSafeImportant: {},
      reportSafeRate: {}
    }
  },
  methods: {
    ...mapActions({
      queryDomainAssetsViewReport: types.QUERY_DOMAIN_ASSETS_VIEW_REPORT,
      queryDomainCompanyViewReport: types.QUERY_DOMAIN_COMPANY_VIEW_REPORT,
      queryDomainSuffixViewReport: types.QUERY_DOMAIN_SUFFIX_VIEW_REPORT,
      queryDomainSafeNormalReport: types.QUERY_DOMAIN_SAFE_NORMAL_REPORT,
      queryDomainSafeImportantReport: types.QUERY_DOMAIN_SAFE_IMPORTANT_REPORT,
      queryDomainSafeRateReport: types.QUERY_DOMAIN_SAFE_RATE_REPORT,
      queryDomainMonitorExpireReport: types.QUERY_DOMAIN_MONITOR_EXPIRE_REPORT
    })
  },
  computed: {
  },
  beforeMount () {
    this.queryDomainAssetsViewReport((response) => {
      if (response.data.code === '1000') {
        this.reportAssets = response.data.data
      } else {
      }
    })
    this.queryDomainCompanyViewReport((response) => {
      if (response.data.code === '1000') {
        this.reportcompany = response.data.data
      } else {
      }
    })
    this.queryDomainSuffixViewReport((response) => {
      if (response.data.code === '1000') {
        this.reportSuffix = response.data.data
      } else {
      }
    })
    this.queryDomainSafeNormalReport((response) => {
      if (response.data.code === '1000') {
        this.reportSafeNormal = response.data.data
      } else {
      }
    })
    this.queryDomainSafeImportantReport((response) => {
      if (response.data.code === '1000') {
        this.reportSafeImportant = response.data.data
      } else {
      }
    })
    this.queryDomainSafeRateReport((response) => {
      if (response.data.code === '1000') {
        this.reportSafeRate = response.data.data
      } else {
      }
    })
    this.queryDomainMonitorExpireReport((response) => {
      if (response.data.code === '1000') {
        this.reportExpire = response.data.data
      } else {
      }
    })
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
