<template lang="pug">
.compMonitorFocusDetail
  .domainName
    h2 {{detailData.domainName}}
      Icon(type="md-star", style="color:#f00")
      span.brand 品牌：{{detailData.brandName}}
      .time(v-if="detailData.syncTime") 更新时间：{{detailData.syncTime | dateformat('YYYY-MM-DD')}}
      .time(v-else) 更新时间：
    span.item(v-for="item in detailData.excepInfo") <Icon type="md-information-circle" size="24" style="color:#f00" />{{item}}
  .secBox.secBox1
    h3.h3T.clear
      span.t 域名whois信息
    .c
      table
        tr
          td.td1 注册商信息
          td.td2 注册商：{{detailData.registrarName}}
          td.td3
          td.td4
        tr
          td.td1 域名所有人信息
          td.td2 域名所有人：{{detailData.whoisUserName}}
          td.td3 注册邮箱：{{detailData.whoisUserEmail}}
          td.td4
        tr
          td.td1 时间信息
          td.td2(v-if="detailData.whoisApplyTime") 注册时间：{{detailData.whoisApplyTime | dateformat('YYYY-MM-DD')}}
          td.td2(v-else) 注册时间：
          td.td3(v-if="detailData.whoisExpireTime") 到期时间：{{detailData.whoisExpireTime | dateformat('YYYY-MM-DD')}}
          td.td3(v-else) 到期时间：
          td.td4(v-if="detailData.whoisUpdateTime") 更新日期：{{detailData.whoisUpdateTime | dateformat('YYYY-MM-DD')}}
          td.td4(v-else) 更新日期：
        tr
          td.td1 域名状态
          td.td2
            p(v-for="item in detailData.whoisDomainStatusInfo") {{item}}
          td.td3
          td.td4
        tr
          td.td1 DNS服务器
          td.td2(colspan="3")
            span.dns(v-for="item in detailData.whoisDomainDnsInfo") {{item}}

  .secBox.secBox2
    h3.h3T.clear
      span.t 网站信息
    .c
      table
        tr
          td.td1 解析情况
          td.td2 IP地址：{{detailData.dnsIpContent}}
          td.td3 IP的物理位置：{{detailData.dnsIpAddress}}
          td.td4
          td.td5
        tr
          td.td1 备案情况
          td.td2 备案号：{{detailData.beianNum}}
          td.td3 主办单位性质：{{detailData.beianCompanyType}}
          td.td4 主办单位名称：{{detailData.beianCompany}}
          td.td5 审核时间：{{detailData.beianAuditTime}}
        tr
          td.td1 网站信息
          td.td2(colspan="4")
            p 网站类型：{{detailData.siteInfo}}
            p 网站标题：{{detailData.siteTitle}}
            p 关键词：{{detailData.siteKey}}
            p 网站描述：{{detailData.siteDesc}}

  .secBox.secBox3
    h3.h3T.clear
      span.t 监控日志
    .secFilter
      form.filterWrap(ref="exportForm", method="post" accept-charset="utf-8" :action="exportLink")
        table
          tr.row1
            td.td1
              span.n 日志记录时间：
              .inputWrap
                DatePicker(type="daterange",placeholder="全部",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
              span.n 事件类型：
              .inputWrap
                Select(v-model="recordType")
                  Option(v-for="item in typeList",:value="item.value",:key="item.value") {{ item.label }}
              Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
              input(type="hidden", name="domainId", :value="id")
              input(type="hidden", name="createDateBegin", :value="createDateBegin")
              input(type="hidden", name="createDateEnd", :value="createDateEnd")
            td.tdBtn
              a(href="javascript:;", @click="exportOrder") 导出日志
    .secTable.secTable2
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
    <!-- 翻页区 -->
    Page(:total="page.pageItems",:current="page.pageNo",:page-size=20,show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange")
</template>

<script>
import * as actions from '@/actions/followdomain.js'
import moment from 'moment'
export default {
  name: 'compMonitorFocusDetail',
  components: {
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      recordType: '',
      time: [],
      createDateBegin: '',
      createDateEnd: '',
      loadingTable: false,
      loadingBtn: false,
      detailData: {},
      exportLink: actions.FOLLOW_RECORD_EXPORT,
      columns: [
        {
          title: '日志记录时间',
          width: 200,
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '域名',
          width: 200,
          key: 'domainName',
          className: 'col2'
        },
        {
          title: '事件类型',
          width: 180,
          key: 'recordType',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.DATAS.RECORD_FOCUS_DOMAIN_EVENT_TYPE[this.list[params.index].recordType])
            ])
          }
        },
        {
          title: '日志详情',
          key: 'recordContent',
          className: 'content',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.list[params.index].recordContent)
            ])
          }
        }
      ],
      list: [],
      typeList: (function (vm) {
        let array = [
          {
            label: '全部',
            value: ''
          }
        ]
        for (var i in vm.DATAS.RECORD_FOCUS_DOMAIN_EVENT_TYPE) {
          array.push({
            label: vm.DATAS.RECORD_FOCUS_DOMAIN_EVENT_TYPE[i],
            value: i
          })
        }
        return array
      })(this),
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchListData () {
      this.queryDomainMonitorLog(1)
    },
    pageChange: function (curPage) {
    },
    exportOrder () {
      this.$refs.exportForm.submit()
    },
    getParamDetail () {
      let params = {
        id: this.id
      }
      return params
    },
    getParamLog (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        domainId: this.id,
        createDateBegin: this.time[0] !== '' ? moment(this.time[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        createDateEnd: this.time[1] !== '' ? moment(this.time[1]).format('YYYY-MM-DD') + ' 23:59:59' : '',
        recordType: this.recordType
      }
      return params
    },
    queryDomainMonitorDetail () {
      this.$store.dispatch('FOLLOW_DOMAIN_INFO', this.getParamDetail()).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.detailData = response.data.data
          console.log(this.detailData)
        } else {
        }
      }).catch(() => {})
    },
    queryDomainMonitorLog (num) {
      this.$store.dispatch('FOLLOW_RECORD_LIST', this.getParamLog({pageNum: num})).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.list = response.data.data.list
          this.page.pageItems = response.data.data.totalNum
        } else {
        }
      }).catch(() => {})
    }
  },
  beforeMount () {
  },
  mounted () {
    if (this.id !== 0) {
      this.queryDomainMonitorDetail()
      this.queryDomainMonitorLog(1)
    }
  },
  computed: {
  },
  watch: {
    id: function (val, oldVal) {
      if (val !== 0) {
        this.time = ['', '']
        this.queryDomainMonitorDetail()
        this.queryDomainMonitorLog(1)
      }
    },
    time: {
      handler (val, oldVal) {
        this.createTimeBegin = (val[0] !== '' ? val[0] + ' 00:00:00' : '')
        this.createTimeEnd = (val[1] !== '' ? val[1] + '23:59:59' : '')
      },
      deep: true
    }
  }
}
</script>
<style>
.compMonitorFocusDetail{
  padding: 0 20px;
}
.compMonitorFocusDetail .domainName{
  background:#fff;
  padding: 20px;
  border-radius: 20px;
  margin-bottom:20px;
}
.compMonitorFocusDetail .domainName h2{
  font-size: 40px;
}
.compMonitorFocusDetail .domainName strong{
  display:block;
  padding: 15px 0;
}
.compMonitorFocusDetail .domainName .ivu-icon{
  font-size: 24px;
}
.compMonitorFocusDetail .domainName .time{
  font-size: 12px;
  color: #676767;
  float: right;
  font-weight: normal;
  padding: 18px 0 0 0;
}
.compMonitorFocusDetail .domainName .brand{
  font-size: 12px;
  color: #676767;
  font-weight: normal;
  padding:  0 0 0 20px;
}
.compMonitorFocusDetail .domainName .item{
  display:inline-block;
  margin-right:30px;
  font-size:12px;
  padding: 10px 0;
}
.compMonitorFocusDetail .domainName .item .ivu-icon{
  font-size: 24px;
  color:#aaa;
  margin-right:5px;
}
.compMonitorFocusDetail .secBox{
  background: #fff;
  padding: 13px 0;
}
.compMonitorFocusDetail .secBox .h3T{
  font-weight: normal;
}
.compMonitorFocusDetail .secBox .h3T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.compMonitorFocusDetail .secBox .h3T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.compMonitorFocusDetail .secBox .h3T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.compMonitorFocusDetail .secBox1{
  margin-bottom: 20px;
}
.compMonitorFocusDetail .secBox1 .c{
  padding: 20px;
}
.compMonitorFocusDetail .secBox1 td{
  border-bottom: 1px dashed #ededed;
  padding: 14px 0;
  color: #666;
  font-size: 12px;
}
.compMonitorFocusDetail .secBox1 td .dns{
  display: inline-block;
  margin-right: 20px;
}
.compMonitorFocusDetail .secBox1 .ivu-icon{
  color: #3aaafe;
}
.compMonitorFocusDetail .secBox2{
  margin-bottom: 20px;
}
.compMonitorFocusDetail .secBox2 .c{
  padding: 20px;
}
.compMonitorFocusDetail .secBox2 td{
  border-bottom: 1px dashed #ededed;
  padding: 14px 0;
  color: #666;
  font-size: 12px;
}
.compMonitorFocusDetail .secBox2 td.td1{
  width: 10%;
}
.compMonitorFocusDetail .secBox2 td.td2{
  width: 25%;
}
.compMonitorFocusDetail .secBox2 td.td3{
  width: 25%;
}
.compMonitorFocusDetail .secBox2 td.td4{
  width: 20%;
}
.compMonitorFocusDetail .secBox2 td.td5{
  width: 20%;
}
.compMonitorFocusDetail .secBox2 p{
  line-height: 18px;
  color: #666;
}
.compMonitorFocusDetail .secBox3 .h3T{
  margin-bottom: 10px;
}
.compMonitorFocusDetail .secBox3 .secFilter{
  background: #ecf3fb;
}
.compMonitorFocusDetail .secBox3 .filterWrap{
  padding: 20px;
}
.compMonitorFocusDetail .secBox3 .filterWrap td{
  padding: 0px;
}
.compMonitorFocusDetail .secBox3 .filterWrap .td1{
  width: 75%!important;
}
.compMonitorFocusDetail .secBox3 .filterWrap .td1 .n{
  width: 90px;
  display:inline-block;
  float: none;
}
.compMonitorFocusDetail .secBox3 .filterWrap .td1 .inputWrap{
  width: 200px;
  margin: 0px;
  display: inline-block;
  text-align: left;
}
.compMonitorFocusDetail .secBox3 .filterWrap .td1 .ivu-btn{
  margin-left: 10px;
}
</style>
