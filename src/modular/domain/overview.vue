<template lang="pug">
.contDomainOverview
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span>域名总览</span>

  .secMain
    Row.row1
      Col(span="16")
        .secBox.secBox1
          h3.h3T.clear
            span.t 域名统计
          .hd
            a(href="javascript:;", :class="tabs===1?'active':''", @click="tabs=1") 域名所属公司
            span.line |
            a(href="javascript:;", :class="tabs===2?'active':''", @click="tabs=2") 域名后缀
            span.line |
            a(href="javascript:;", :class="tabs===3?'active':''", @click="tabs=3") 域名到期时间
          .bd
            .bd1.clear()
              comp-chart-overview-company(:charData="overviewDomain", v-if="tabs===1")
            .bd2.clear()
              comp-chart-overview-suffix(:charData="overviewDomain", v-if="tabs===2")
            .bd3.clear()
              comp-chart-overview-expire(:charData="overviewDomain", v-if="tabs===3")
      Col(span="8")
        .secBox.secBox2
          h3.h3T.clear
            span.t 域名监控
            div.tR
              router-link.text(to="/notice/monitoring", v-if="myUserInfo.keeperFlag || (myUserInfo.userRoles && myUserInfo.userRoles[0].roleCode.indexOf('super')>=0) || menus.indexOf('client_notice_monitor')>=0") 查看全部
          comp-notice-monitor-list(v-if="myUserInfo.keeperFlag || (myUserInfo.userRoles && myUserInfo.userRoles[0].roleCode.indexOf('super')>=0) || menus.indexOf('client_notice_monitor')>=0")

          div.none(v-else) 暂无权限

    .secBox.secBox3.row2
      h3.h3T.clear
        span.t 数量变化总览
        div.tR
          span.text 时间周期
          comp-select(:list="daysList", ref="days", defaultValue="7")
          Button(type="primary", @click="getOverviewDomainCount",:loading="loadingBtn") 查询
      Row
        Col(span="6")
          strong 域名总览
          em.num {{overviewDomainCount.all}}
          ul
            li.clear
              span.l 净增减数
              span.r
                em(v-show="overviewDomainCount.ad === 0") {{overviewDomainCount.ad}}个
                em(v-show="overviewDomainCount.ad > 0") <Icon type="ios-arrow-round-up" class="add" /> {{overviewDomainCount.ad}}个
                em(v-show="overviewDomainCount.ad < 0") <Icon type="ios-arrow-round-down" class="del" /> {{overviewDomainCount.ad}}个
        Col(span="6")
          strong 自主管理域名数
          em.num {{overviewDomainCount.owner}}
          ul
            li.clear
              span.l 净增减数
              span.r
                em(v-show="overviewDomainCount.ownerAd === 0") {{overviewDomainCount.ownerAd}}个
                em(v-show="overviewDomainCount.ownerAd > 0") <Icon type="ios-arrow-round-up" class="add" /> {{overviewDomainCount.ownerAd}}个
                em(v-show="overviewDomainCount.ownerAd < 0") <Icon type="ios-arrow-round-down" class="del" /> {{overviewDomainCount.ownerAd}}个
        Col(span="6")
          strong 新增域名数
          em.num {{overviewDomainCount.add}}
          ul
            li.clear
              span.l 新网新注
              span.r
                em {{overviewDomainCount.add_regist}}个
            li.clear
              span.l 转入新网
              span.r
                em {{overviewDomainCount.add_trans}}个
            li.clear
              span.l 托管域名
              span.r
                em {{overviewDomainCount.add_deposit}}个
        Col(span="6")
          strong 减少域名数
          em.num {{overviewDomainCount.del}}
          ul
            li.clear
              span.l 过期删除
              span.r
                em {{overviewDomainCount.del_expired}}个
            li.clear
              span.l 其他原因
              span.r
                em {{overviewDomainCount.del_other}}个
            li.clear
              span.l 托管域名
              span.r
                em {{overviewDomainCount.del_deposit}}个
    .row3.clear
      .item
        .secBox.secBox4
          h3.h3T.clear
            span.t 实名模板 <b>{{overviewTemplate.all}}</b>个
            div.tR
              router-link.text(to="/domain/realname") 详情
          ul
            li 实名审核中：{{overviewTemplate.inVerify}}个
            li 已实名：{{overviewTemplate.verifyed}}个
            li 未实名：{{overviewTemplate.notVerify}}个
      .item
        .secBox.secBox5
          h3.h3T.clear
            span.t 注册局锁
            div.tR
              router-link.text(to="/domain/security") 详情
          ul
            li 开通注册局锁域名数：{{overviewBackendLock.backendLockCount}}个
            li 重点保护域名开通率：{{overviewBackendLock.importantRate}}%
      .item
        .secBox.secBox6
          h3.h3T.clear
            span.t 实名认证率 <b>{{overviewDomainVerify.domainVerifyRate}}</b>%
              Tooltip(placement="top-start")
                span(slot="content", style="color:#fff") 自主管理域名实名认证率
                Icon(custom="i-icon i-icon-tips", size="16", style="color: #4aafff;margin-left: 5px;")
            div.tR
              router-link.text(to="/domain/realnameDomain") 详情
          ul
            li 实名审核中：{{overviewDomainVerify.domainInVerifyCount}}个
            li 已实名：{{overviewDomainVerify.domainVerifyCount}}个
            li 未实名：{{overviewDomainVerify.domainNotVerifyCount}}个
      .item
        .secBox.secBox7
          h3.h3T.clear
            span.t 需要续费的域名 <b>{{overviewDomainRenew.domainRenewCount}}</b>个
              Tooltip(placement="top-start")
                span(slot="content", style="color:#fff") 自主管理域名和托管域名中需要续费的域名。<br />（托管域名到期时间以域名所在注册商<br />提供的到期时间为准）
                Icon(custom="i-icon i-icon-tips", size="16", style="color: #4aafff;margin-left: 5px;")
            div.tR
              router-link.text(to="/domain/mgmt") 详情
      .item
        .secBox.secBox8
          h3.h3T.clear
            span.t 正在转入的域名 <b>{{overviewDomainTransferIn.domainTransferInCount}}</b>个
            div.tR
              router-link.text(to="/domain/transferin") 详情
      .item
        .secBox.secBox9
          h3.h3T.clear
            span.t 正在过户的域名 <b>{{overviewDomainChange.domainChangeCount}}</b>个
            div.tR
              router-link.text(to="/domain/change") 详情
</template>

<script>
import { mapState } from 'vuex'
import compChartOverviewCompany from '@/components/compChartOverviewCompany'
import compChartOverviewSuffix from '@/components/compChartOverviewSuffix'
import compChartOverviewExpire from '@/components/compChartOverviewExpire'
import compNoticeMonitorList from '@/components/compNoticeMonitorList'
import compSelect from '@/components/compSelect'
export default {
  components: {
    compChartOverviewCompany,
    compChartOverviewSuffix,
    compChartOverviewExpire,
    compNoticeMonitorList,
    compSelect
  },
  data () {
    return {
      value: '',
      refresh: false,
      loadingBtn: false,
      daysList: [
        {
          label: '7天',
          value: '7'
        },
        {
          label: '30天',
          value: '30'
        },
        {
          label: '90天',
          value: '90'
        }
      ],
      tabs: 1,
      overviewDomain: {},
      overviewDomainCount: {},
      overviewTemplate: {},
      overviewBackendLock: {},
      overviewDomainVerify: {},
      overviewDomainRenew: {},
      overviewDomainTransferIn: {},
      overviewDomainChange: {}
    }
  },
  methods: {
    getOverviewDomainCount () {
      this.loadingBtn = true
      this.$store.dispatch('DOMAIN_COUNT_STATISTICS', {days: this.$refs.days.value}).then(response => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          console.log(response.data.data)
          this.overviewDomainCount = response.data.data
        } else {
        }
      }).catch(() => {})
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      menus (state) {
        return state.user.menus
      }
    })
  },
  beforeMount () {
  },
  mounted () {
    this.$store.dispatch('DOMAIN_STATISTICS').then(response => {
      this.overviewDomain = response.data.data
    }).catch(() => {})

    this.getOverviewDomainCount()

    this.$store.dispatch('TEMPLATE_STATISTICS').then(response => {
      this.overviewTemplate = response.data.data
    }).catch(() => {})

    this.$store.dispatch('BACKEND_LOCK_STATISTICS').then(response => {
      this.overviewBackendLock = response.data.data
    }).catch(() => {})

    this.$store.dispatch('DOMAIN_VERIFY_STATISTICS').then(response => {
      this.overviewDomainVerify = response.data.data
    }).catch(() => {})

    this.$store.dispatch('DOMAIN_RENEW_STATISTICS').then(response => {
      this.overviewDomainRenew = response.data.data
    }).catch(() => {})

    this.$store.dispatch('DOMAIN_TRANSFER_IN_STATISTICS').then(response => {
      this.overviewDomainTransferIn = response.data.data
    }).catch(() => {})

    this.$store.dispatch('DOMAIN_CHANGE_STATISTICS').then(response => {
      this.overviewDomainChange = response.data.data
    }).catch(() => {})
  }
}
</script>

<style scoped>
.contDomainOverview .secMain{
  background: none;
}
.contDomainOverview .secBox{
  background: #fff;
  padding: 13px 0;
}
.contDomainOverview .secBox .h3T{
  font-weight: normal;
}
.contDomainOverview .secBox .h3T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.contDomainOverview .secBox .h3T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.contDomainOverview .secBox .h3T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.contDomainOverview .row1{
  margin-bottom: 20px;
}
.contDomainOverview .secBox1{
  margin-right: 20px;
  height: 360px;
}
.contDomainOverview .secBox1 .h3T{
  margin-bottom: 40px;
}
.contDomainOverview .secBox1 .hd{
  text-align:center;
  font-size: 12px;
  margin-bottom: 40px;
}
.contDomainOverview .secBox1 .hd .line{
  color: #e5e5e5;
  padding: 0 20px;
}
.contDomainOverview .secBox1 .hd a.active{
  color: #2071f6;
  border-bottom: 2px solid #2071f6;
}
.contDomainOverview .secBox1 .charts{
  width: 44%;
  height: 200px;
  background: #eaeaea;
  float: left;
}
.contDomainOverview .secBox1 .info{
  width: 55%;
  height: 130px;
  float: right;
  border-left: 1px solid #ededed;
  margin-top: 35px;
}
.contDomainOverview .secBox1 .info ul{
  padding: 0 35px;
}
.contDomainOverview .secBox1 .info li{
  font-size: 12px;
  padding: 6px 0;
}
.contDomainOverview .secBox1 .info li:before{
  content: '';
  float:left;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin: 2px 3px 0 0;
}
.contDomainOverview .secBox1 .info li:nth-child(1):before{
  background: #2196f3;
}
.contDomainOverview .secBox1 .info li:nth-child(2):before{
  background: #2196f3;
}
.contDomainOverview .secBox1 .info li:nth-child(3):before{
  background: #2196f3;
}
.contDomainOverview .secBox1 .info span.l{
  float: left;
  color: #666;
}
.contDomainOverview .secBox1 .info span.r{
  float: right;
  color: #666;
}
.contDomainOverview .secBox1 .info strong{
  font-weight: normal;
  font-size: 18px;
  display:block;
  padding: 10px 35px 20px 35px;
}
.contDomainOverview .secBox1 .info strong em{
  font-weight: 600;
  font-size: 25px;
}
.contDomainOverview .secBox2{
  height: 360px;
}
.contDomainOverview .secBox2 .none{
  text-align: center;
  line-height: 240px;
  color: #aaa;
}
.contDomainOverview .secBox3{
  padding-bottom: 55px;
  margin-bottom: 20px;
}
.contDomainOverview .secBox3 .compSelect{
  margin: 0 15px;
}
.contDomainOverview .secBox3 .ivu-row{
  margin-top: 32px;
}
.contDomainOverview .secBox3 .ivu-col{
  height: 170px;
  text-align: center;
}
.contDomainOverview .secBox3 .ivu-col .ivu-icon{
  font-size: 20px;
  font-weight: 600;
}
.contDomainOverview .secBox3 .ivu-col .ivu-icon.add{
  color: #f00
}
.contDomainOverview .secBox3 .ivu-col .ivu-icon.del{
  color: #4db321
}
.contDomainOverview .secBox3 .ivu-col{
  border-right: 1px solid #ededed;
}
.contDomainOverview .secBox3 .ivu-col:nth-last-child(1){
  border-right: none;
}
.contDomainOverview .secBox3 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contDomainOverview .secBox3 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contDomainOverview .secBox3 .ivu-col .num:after{
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
.contDomainOverview .secBox3 .ivu-col ul{
  font-size: 12px;
  padding: 20px 55px 0 55px;
}
.contDomainOverview .secBox3 .ivu-col ul li{
  padding-bottom: 14px;
}
.contDomainOverview .secBox3 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contDomainOverview .secBox3 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contDomainOverview .row3 .item{
  width: 33.3%;
  float: left;
  margin-bottom: 20px;
}
.contDomainOverview .row3 .item:nth-child(3n+1) .secBox{
  margin-right: 10px;
}
.contDomainOverview .row3 .item:nth-child(3n+2) .secBox{
  margin:0 10px;
}
.contDomainOverview .row3 .item:nth-child(3n+3) .secBox{
  margin-left: 10px;
}
.contDomainOverview .secBox4 ul,
.contDomainOverview .secBox5 ul,
.contDomainOverview .secBox6 ul{
  height: 100px;
  padding: 0 20px;
  font-size: 12px;
}
.contDomainOverview .secBox4 ul li,
.contDomainOverview .secBox5 ul li,
.contDomainOverview .secBox6 ul li{
  color: #666;
  border-bottom: 1px dashed #eee;
  padding: 10px 0;
}
</style>
