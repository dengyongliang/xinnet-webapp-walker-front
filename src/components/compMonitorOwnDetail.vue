<template lang="pug">
.compMonitorOwnDetail
  .domainName
    h2 {{detailData.domain?detailData.domain.domainName:''}}
      Icon(type="md-star", style="color:#f00")
      .time 更新时间：{{detailData.domain?detailData.domain.modifyDate:''}}

  .secBox.secBox1
    h3.h3T.clear
      span.t 域名信息
    .c
      table
        tr
          td.td1 注册商信息
          td.td2 注册商：{{detailData.domain?detailData.domain.modifyDate:''}}
          td.td3
          td.td4
        tr
          td.td1 域名所有人信息
          td.td2 域名所有人：{{detailData.domainUser?detailData.domainUser.organizeNameCn:''}}
          td.td3 注册邮箱：{{detailData.domainUser?detailData.domainUser.userEmail:''}}
          td.td4
        tr
          td.td1 时间信息
          td.td2 注册时间：{{detailData.domain?detailData.domain.applyDate:''}}
          td.td3 到期时间：{{detailData.domain?detailData.domain.expireDate:''}}
          td.td4 更新日期：{{detailData.domain?detailData.domain.modifyDate:''}}
        tr
          td.td1 域名状态
          td.td2 {{detailData.domain?detailData.domain.domainStatus:''}}
            Tooltip(placement="top-start")
              span(slot="content", style="color:#fff") 解析监控列表仅记录3个月内解析修改情况，<br />详细域名解析监控日志，<br />请查看下方全部域名监控日志。
              Icon(custom="i-icon i-icon-tips", size="16")
          td.td3
          td.td4
        tr
          td.td1 DNS服务器
          td.td2(colspan="3")
            span.dns(v-for="item in detailData.domainDnsList") {{item.dnsName}}

  .secBox.secBox2(style="display:none")
    h3.h3T.clear
      span.t 解析监控

  .secBox.secBox3
    h3.h3T.clear
      span.t 监控日志
    .secFilter
      form.filterWrap(ref="exportForm",target="_blank" method="post" accept-charset="utf-8" :action="exportLink")
        table
          tr.row1
            td.td1
              span.n 日志记录时间：
              .inputWrap
                DatePicker(type="daterange",placeholder="全部",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
              span.n 事件类型：
              .inputWrap
                Select(v-model="type")
                  Option(v-for="item in typeList",:value="item.value",:key="item.value") {{ item.label }}
              Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
              input(type="hidden", name="domainName", :value="domainName")
              input(type="hidden", name="createTimeBegin", :value="time[0] !== '' ? moment(time[0]).format('YYYY-MM-DD') + ' 00:00:00' : ''")
              input(type="hidden", name="createTimeEnd", :value="time[1] !== '' ? moment(time[1]).format('YYYY-MM-DD') + ' 23:59:59' : ''")

            td.tdBtn
              a(href="javascript:;", @click="exportOrder") 导出日志
    .secTable.secTable2
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
    <!-- 翻页区 -->
    Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import * as links from '@/global/linkdo.js'
import moment from 'moment'
export default {
  name: 'compMonitorOwnDetail',
  components: {
  },
  props: {
    domainName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      type: '',
      time: ['',''],
      loadingTable: false,
      loadingBtn: false,
      detailData: {},
      exportLink: links.EXPORT_DOMAIN_LOG,
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
          key: 'type',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.DATAS.RECORD_DOMAIN_EVENT_TYPE[this.list[params.index].type] )
            ])
          }
        },
        {
          title: '日志详情',
          key: 'title',
          className: 'content',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-alert',
                  size: "17"
                },
                style: {
                  color: '#f00',
                  margin: '0 5px 0 0',
                  display: this.list[params.index].levelType === 2 ? "inline-block" : "none"
                }
              }, ),
              h('span', {}, this.list[params.index].content )
            ])
          }
        }
      ],
      list: [],
      typeList: function (vm) {
        let array = []
        for (var i in vm.DATAS.RECORD_DOMAIN_EVENT_TYPE) {
          array.push({
            label: vm.DATAS.RECORD_DOMAIN_EVENT_TYPE[i],
            value: i
          })
        }
        return array
      }(this),
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchListData () {
      this.queryDomainMonitorLog(this.getParamLog({pageNum: 1}))
    },
    pageChange: function (curPage) {
    },
    exportOrder () {
      this.$refs.exportForm.submit()
    },
    getParamDetail () {
      let params = {
        param: {
          domainName: this.domainName
        },
        callback: (response) => {
          this.loadingBtn = false
          this.loadingTable = false
          if (response.data.code === '1000'){
            this.detailData = response.data.data
          } else {
          }
        }
      }
      return params
    },
    getParamLog (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          domainName: this.domainName,
          createTimeBegin: this.time[0] !== '' ? moment(this.time[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
          createTimeEnd: this.time[1] !== '' ? moment(this.time[1]).format('YYYY-MM-DD') + ' 23:59:59' : '',
          type: this.type
        },
        callback: (response) => {
          this.loadingBtn = false
          this.loadingTable = false
          if (response.data.code === '1000'){
            this.list = response.data.data.list
          } else {
          }
        }
      }
      return params
    },
    ...mapActions({
      queryDomainMonitorDetail: types.QUERY_DOMAIN_MONITOR_DETAIL,
      queryDomainMonitorLog: types.QUERY_DOMAIN_MONITOR_LOG
    })
  },
  beforeMount () {

  },
  mounted () {
    if (this.domainName!=="") {
      this.queryDomainMonitorDetail(this.getParamDetail())
      this.queryDomainMonitorLog(this.getParamLog({pageNum: 1}))
    }
  },
  computed: {
  },
  watch: {
    domainName: function (val, oldVal) {
      if (val!=="") {
        this.time = ['','']
        this.queryDomainMonitorDetail(this.getParamDetail())
        this.queryDomainMonitorLog(this.getParamLog({pageNum: 1}))
      }
    }
  }
}
</script>
<style>
.compMonitorOwnDetail{
  padding: 0 20px;
}
.compMonitorOwnDetail .domainName{
  background:#fff;
  padding: 20px;
  border-radius: 20px;
  margin-bottom:20px;
}
.compMonitorOwnDetail .domainName h2{
  font-size: 40px;
}
.compMonitorOwnDetail .domainName strong{
  display:block;
  padding: 15px 0;
}
.compMonitorOwnDetail .domainName .ivu-icon{
  font-size: 24px;
}
.compMonitorOwnDetail .domainName .time{
  font-size: 12px;
  color: #676767;
  float: right;
  font-weight: normal;
  padding: 18px 0 0 0;
}
.compMonitorOwnDetail .secBox{
  background: #fff;
  padding: 13px 0;
}
.compMonitorOwnDetail .secBox .h3T{
  font-weight: normal;
}
.compMonitorOwnDetail .secBox .h3T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.compMonitorOwnDetail .secBox .h3T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.compMonitorOwnDetail .secBox .h3T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.compMonitorOwnDetail .secBox1{
  margin-bottom: 20px;
}
.compMonitorOwnDetail .secBox1 .c{
  padding: 20px;
}
.compMonitorOwnDetail .secBox1 td{
  border-bottom: 1px dashed #ededed;
  padding: 14px 0;
  color: #666;
  font-size: 12px;
}
.compMonitorOwnDetail .secBox1 td .dns{
  display: inline-block;
  margin-right: 20px;
}
.compMonitorOwnDetail .secBox1 .ivu-icon{
  color: #3aaafe;
}
.compMonitorOwnDetail .secBox2{
  margin-bottom: 20px;
}
.compMonitorOwnDetail .secBox3 .h3T{
  margin-bottom: 10px;
}
.compMonitorOwnDetail .secBox3 .secFilter{
  background: #ecf3fb;
}
.compMonitorOwnDetail .secBox3 .filterWrap{
  padding: 20px;
}
.compMonitorOwnDetail .secBox3 .filterWrap td{
  padding: 0px;
}
.compMonitorOwnDetail .secBox3 .filterWrap .td1{
  width: 75%!important;
}
.compMonitorOwnDetail .secBox3 .filterWrap .td1 .n{
  width: 90px;
  display:inline-block;
  float: none;
}
.compMonitorOwnDetail .secBox3 .filterWrap .td1 .inputWrap{
  width: 200px;
  margin: 0px;
  display: inline-block;
  text-align: left;
}
.compMonitorOwnDetail .secBox3 .filterWrap .td1 .ivu-btn{
  margin-left: 10px;
}
</style>
