<template lang="pug">
.contReportOwn
  h3.h3T 域名监控总览
  .secBox.secBox1
    h4.h4T.clear
      span.t 数量变化总览
      div.tR
        span.text 时间周期
        comp-select(:list="cycleTimeList", ref="cycleTime", :on-parentmethod="selectChange", defaultValue="30")
    Row
      Col(span="8")
        strong 域名总览
        em.num {{reportChange.domainNumber}}
        ul
          li.clear
            span.l 净增减数
            span.r(v-show="reportChange.domainChangeNumber === 0") {{reportChange.domainChangeNumber}}个
            span.r(v-show="reportChange.domainChangeNumber > 0") <Icon type="ios-arrow-round-up" class="add" /> {{reportChange.domainChangeNumber}}个
            span.r(v-show="reportChange.domainChangeNumber < 0") <Icon type="ios-arrow-round-down" class="del" /> {{reportChange.domainChangeNumber}}个

      Col(span="8")
        strong 新增域名数
        em.num {{reportChange.domainAddNumber}}
        ul
          li.clear
            span.l 新网新注
            span.r {{reportChange.domainNewNumber}}个
          li.clear
            span.l 转入新网
            span.r {{reportChange.domainTransferInNumber}}个
      Col(span="8")
        strong 减少域名数
        em.num {{reportChange.domainDelNumber}}
        ul
          li.clear
            span.l 过期删除
            span.r {{reportChange.domainExpireDelNumber}}个
          li.clear
            span.l 其他原因
            span.r {{reportChange.domainOtherDelNumber}}个

  .secBox.secBox2
    h4.h4T.clear
      span.t 域名安全
      div.tR
        router-link.text(to="/domain/security") 域名安全服务
    Row
      Col(span="6")
        strong 重点保护域名数
        em.num {{reportSafe.safeNumber}}
        ul
          li.clear
            span.l 重点保护域名注册局锁开通率
            span.r {{reportSafe.backEndLockRate}}%
      Col(span="6")
        strong 自动续费开通率
        em.num {{reportSafe.autoRenewRate}}
          i %
        ul
          li.clear
            span.l 已开通
            span.r {{reportSafe.autoRenewOpenNumber}}个
          li.clear
            span.l 未开通
            span.r {{reportSafe.autoRenewNotOpenNumber}}个
      Col(span="6")
        strong 禁止更新状态开通率
        em.num {{reportSafe.updateProhibitedRate}}
          i %
        ul
          li.clear
            span.l 已开通
            span.r {{reportSafe.updateProhibitedOpenNumber}}个
          li.clear
            span.l 未开通
            span.r {{reportSafe.updateProhibitedNotOpenNumber}}个
      Col(span="6")
        strong 禁止转移状态开通率
        em.num {{reportSafe.transferProhibitedRate}}
          i %
        ul
          li.clear
            span.l 已开通
            span.r {{reportSafe.transferProhibitedNumber}}个
          li.clear
            span.l 未开通
            span.r {{reportSafe.transferProhibitedNotOpenNumber}}个

  .secBox.secBox3
    h4.h4T.clear
      span.t 域名到期时间
      div.tR
        router-link.text(to="/domain/mgmt") 按到期时间查看域名
    comp-chart-report-own-due-time(:charData="reportExpire")

  h3.h3T.clear(style="display:none") 域名解析变化
    .tR
      span.text 搜索
      comp-input(style="display:inline-block",name='name',placeholder="请输入域名",ref="name", styles="width:200px")
      span.text 记录类型
      comp-select(:list="[]", ref="changeStatus",)
      span.text 修改时间
      DatePicker(type="daterange",placeholder="",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",placement="bottom-end")
      Button(type="primary", @click="",:loading="loadingBtn") 查询

  .secTable(style="display:none")
    <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20, style="display:none")
</template>

<script>
import compInput from '@/components/compInput'
import compSelect from '@/components/compSelect'
import compChartReportOwnDueTime from '@/components/compChartReportOwnDueTime'

export default {
  components: {
    compInput,
    compSelect,
    compChartReportOwnDueTime
  },
  data () {
    return {
      value: '',
      time: [],
      loadingTable: false,
      loadingBtn: false,
      cycleTimeList: [
        {
          value: '7',
          label: '近7天'
        },
        {
          value: '30',
          label: '近30天'
        },
        {
          value: '90',
          label: '近90天'
        }
      ],
      reportChange: {},
      reportSafe: {},
      reportExpire: {},
      columns: [
        {
          title: '提交时间',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '转入完成时间',
          key: 'tansferInTime',
          className: 'col2'
        },
        {
          title: '域名',
          key: 'domainName',
          className: 'col3'
        },
        {
          title: '转入状态',
          key: 'transferStatus',
          className: 'col4',
          render: (h, params) => {
            if (this.list[params.index].transferStatus === 4) {
              return h('Tooltip', {
                props: {
                  content: '转入失败，已退款',
                  placement: 'top'
                }
              },
              [
                h('Icon', {
                  props: {
                    custom: 'i-icon i-icon-tips',
                    size: '16'
                  },
                  style: {
                    margin: '0 5px 0 0',
                    color: '#48affe'
                  }
                }),
                h('a', {
                  props: {
                    href: ''
                  },
                  style: {
                    color: '#f00'
                  }
                }, this.DATAS.DOMAIN_TRANSFER_STATUS[this.list[params.index].transferStatus])
              ])
            }
            if (this.list[params.index].transferStatus !== 4) {
              return h('div', [
                h('a', {
                  props: {
                    href: ''
                  }
                }, this.DATAS.DOMAIN_TRANSFER_STATUS[this.list[params.index].transferStatus])
              ])
            }
          }
        }
      ],
      list: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    pageChange () {

    },
    selectChange (v) {
      this.getChangeReport(v)
    },
    getChangeReport (v = 30) {
      let params = {
        cycleTime: v * 1
      }
      this.$store.dispatch('DOMAIN_MONITOR_CHANGE_REPORT', params).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.reportChange = response.data.data
        } else {
        }
      }).catch(() => {})
    }
  },
  computed: {
  },
  beforeMount () {
    this.getChangeReport()
    this.$store.dispatch('DOMAIN_MONITOR_SAFE_REPORT').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.reportSafe = response.data.data
      } else {
      }
    }).catch(() => {})
    this.$store.dispatch('DOMAIN_MONITOR_EXPIRE_REPORT').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.reportExpire = response.data.data
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
.contReportOwn .h3T{
  font-size: 25px;
  font-weight: normal;
  padding: 0 0 20px 20px;
}
.contReportOwn .h3T .tR{
  float: right;
  font-size: 12px;
}
.contReportOwn .h3T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportOwn .h3T .tR .ivu-btn{
  margin: 0 10px;
}
.contReportOwn .secBox{
  background: #fff;
  padding: 13px 0;
  margin-bottom: 20px;
}
.contReportOwn .secBox .h4T{
  font-weight: normal;
}
.contReportOwn .secBox .h4T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.contReportOwn .secBox .h4T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.contReportOwn .secBox .h4T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportOwn .secBox .h4T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.contReportOwn .secBox1{
  padding-bottom: 50px;
}
.contReportOwn .secBox1 .ivu-row{
  margin-top: 32px;
}
.contReportOwn .secBox1 .ivu-col{
  height: 170px;
  text-align: center;
}
.contReportOwn .secBox1 .ivu-col .ivu-icon{
  font-size: 20px;
  font-weight: 600;
}
.contReportOwn .secBox1 .ivu-col .ivu-icon.add{
  color: #f00
}
.contReportOwn .secBox1 .ivu-col .ivu-icon.del{
  color: #4db321
}
.contReportOwn .secBox1 .ivu-col:nth-child(2){
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
}
.contReportOwn .secBox1 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportOwn .secBox1 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportOwn .secBox1 .ivu-col .num:after{
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
.contReportOwn .secBox1 .ivu-col ul{
  font-size: 12px;
  padding: 20px 55px 0 55px;
}
.contReportOwn .secBox1 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportOwn .secBox1 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportOwn .secBox1 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportOwn .secBox2{
  padding-bottom: 50px;
}
.contReportOwn .secBox2 .ivu-row{
  margin-top: 32px;
}
.contReportOwn .secBox2 .ivu-col{
  height: 170px;
  text-align: center;
}
.contReportOwn .secBox2 .ivu-col .ivu-icon{
  font-size: 20px;
  font-weight: 600;
}
.contReportOwn .secBox2 .ivu-col .ivu-icon.add{
  color: #f00
}
.contReportOwn .secBox2 .ivu-col .ivu-icon.del{
  color: #4db321
}
.contReportOwn .secBox2 .ivu-col:nth-child(2){
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
}
.contReportOwn .secBox2 .ivu-col:nth-child(3){
  border-right: 1px solid #ededed;
}
.contReportOwn .secBox2 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportOwn .secBox2 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportOwn .secBox2 .ivu-col .num:after{
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
.contReportOwn .secBox2 .ivu-col .num i{
  font-size: 25px;
}
.contReportOwn .secBox2 .ivu-col ul{
  font-size: 12px;
  padding: 20px 55px 0 55px;
}
.contReportOwn .secBox2 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportOwn .secBox2 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportOwn .secBox2 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportOwn .secBox3{
  margin-bottom: 50px;
}
.contReportOwn .secTable{
  padding: 0 20px 20px 20px;
  background: #fff;
}
</style>
