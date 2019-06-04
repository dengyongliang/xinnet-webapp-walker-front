<template lang="pug">
.contMonitorOwn
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="showDetail=false" class="backlist">自有域名监控</span>
    <span v-show="showDetail"> > 域名监控详情</span>
    .tR
      router-link(to="/report/own?type=own")
        Button(type="primary",) 自有域名监控报告

  .secMain(v-show="!showDetail")
    h2.h2T.clear 监控通知
      .tR
        router-link(to="/notice/monitoring") 查看全部监控通知
    .secTable.secTable1
      Table(class="table1", :columns="columnsTop", :data="listTop", :loading="loadingTable", ref="", :show-header="false")

    h2.h2T.clear 监控域名列表
      .tR
        span.text 搜索
        <Input v-model="value" placeholder="请输入域名" />
        Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
    .filter()
      comp-aside-filter(:show="[3,4,5]", @asideFilterSubmit="asideFilterSubmit", @asideFilterReset="asideFilterReset", :total="page.pageItems", :filterTitle="filterTitle")
    <!-- 列表主体 -->
    .secTable.secTable2
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20", v-show="!showDetail")

  .pageDetail(v-if="showDetail")
    comp-monitor-own-detail(:domainName="domainName")
</template>

<script>
import compMonitorOwnDetail from '@/components/compMonitorOwnDetail'
import compAsideFilter from '@/components/compAsideFilter'
import moment from 'moment'
export default {
  components: {
    compMonitorOwnDetail,
    compAsideFilter
  },
  data () {
    return {
      value: '',
      filterTitle: '域名',
      userCompanys: [],
      showDetail: false,
      domainName: '',
      columnsTop: [
        {
          title: '时间',
          width: 200,
          key: 'sendTime',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('i', {
                class: this.listTop[params.index].readFlag === 1 ? 'unRead' : ''
              }, '●'),
              h('span', {
              }, moment(this.listTop[params.index].sendTime).format('YYYY-MM-DD'))
            ])
          }
        },
        {
          title: '通知内容',
          key: 'title',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-alert',
                  size: '17'
                },
                style: {
                  color: '#f00',
                  margin: '0 5px 0 0',
                  display: this.listTop[params.index].sendType === 2 ? 'inline-block' : 'none'
                }
              }, ''),
              h('a', {
                style: {
                  display: 'inline-block',
                  margin: '0 100px 0 0'
                }
              }, this.listTop[params.index].title)
            ])
          }
        }
      ],
      listTop: [],
      columns: [
        {
          title: '域名',
          key: 'domainName',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  'font-size': '16px',
                  'line-height': '18px',
                  'vertical-align': 'top'
                }
              }, this.list[params.index].domainName),
              h('Icon', {
                props: {
                  type: 'md-star',
                  size: '18'
                },
                style: {
                  margin: '0 5px 0 0',
                  color: '#f00',
                  display: (this.list[params.index].levelType === 2 ? 'inline-block' : 'none')
                }
              })
            ])
          }
        },
        {
          title: '域名所有人',
          key: 'organizeNameCn',
          width: 150,
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('p', {}, this.list[params.index].organizeNameCn),
              h('p', {}, this.list[params.index].userEmail)
            ])
          }
        },
        {
          title: '到期时间',
          width: 90,
          key: 'expireDate',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('p', {}, moment(this.list[params.index].expireDate).format('YYYY-MM-DD'))
            ])
          }
        },
        // 监控日志显示错误,监控日志显示如下,:
        // A.若监控域名距离当前日期15天内有变化时显示详细的日志对应事件类型，最多显示3条，重要程度为“重要”的显示“重要”标签；
        // B.若监控域名距离当前日期15天内没有任何变化日志时直接显示：“近期无变化”。
        {
          title: '监控日志',
          width: 180,
          key: 'type',
          className: 'col4',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-alert',
                  size: '17'
                },
                style: {
                  color: '#f00',
                  margin: '0 5px 0 0',
                  display: (this.list[params.index].levelType === 2 && this.list[params.index].type && moment(new Date()).diff(this.list[params.index].createTime, 'days')<=15) ? 'inline-block' : 'none'
                }
              }, ''),
              h('span', {}, (this.list[params.index].type && moment(new Date()).diff(this.list[params.index].createTime, 'days')<=15) ? this.DATAS.RECORD_DOMAIN_EVENT_TYPE[this.list[params.index].type] : '近期无变化')
            ])
          }
        },
        {
          title: '操作',
          key: 'operate',
          width: 60,
          className: 'operate',
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.showDetailFun(this.list[params.index].domainName)
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      list: [],
      loadingTable: true,
      loadingBtn: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      asideFilterResult: {
        groupIds: '',
        serviceState: '',
        monitorLog: ''
      }
    }
  },
  methods: {
    searchListData () {
      this.queryList(1)
    },
    pageChange: function (curPage) {
      this.queryList(curPage)
    },
    showDetailFun (domainName) {
      this.domainName = domainName
      this.showDetail = true
    },
    asideFilterSubmit (result) {
      console.log(result)
      // 返回 参数 处理
      this.asideFilterResult.groupIds = result.dataMgmtCompany.reduce((pre, cur) => {
        return pre.concat(cur)
      }, []).join(',')
      this.asideFilterResult.serviceState = result.dataServiceState.join(',')
      this.asideFilterResult.monitorLog = result.dataMonitorLog.join(',')
      console.log(this.asideFilterResult)
      // 加载数据
      this.queryList(1)
    },
    asideFilterReset () {
      this.asideFilterResult.groupIds = ''
      this.asideFilterResult.monitorLog = ''
      this.asideFilterResult.serviceState = ''

      this.queryList(1)
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        domainName: this.value,
        groupIds: this.asideFilterResult.groupIds,
        serviceState: this.asideFilterResult.serviceState,
        monitorLog: this.asideFilterResult.monitorLog
      }
      return params
    },
    queryList (num) {
      this.$store.dispatch('DOMAIN_MONITOR', this.queryListParam({pageNum: num})).then(response => {
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
  computed: {
  },
  beforeMount () {
    this.$store.dispatch('MAIL_MANAGE_TOP').then(response => {
      this.loadingTable = false
      this.loadingBtn = false
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.listTop = response.data.data.list
      } else {
      }
    }).catch(() => {})
    this.queryList(1)
  }
}
</script>

<style>
.contMonitorOwn .secMain{
  background:none;
}
.contMonitorOwn .backlist{
  cursor: pointer;
}
.contMonitorOwn .filter{
  float:left;
  width:220px;
  background:#fff;
  margin-right:20px;
}
.contMonitorOwn .secTable1{
  margin-bottom: 20px;
}
.contMonitorOwn .secTable2{
  margin-left: 240px;
  background:none;
}
.contMonitorOwn .h2T{
  font-weight: normal;
  padding: 20px 0;
}
.contMonitorOwn .h2T .tR{
  float: right;
  font-size: 12px;
}
.contMonitorOwn .h2T .tR .ivu-input-wrapper{
  width: 200px;
  margin: 0 10px;
}
.contMonitorOwn .h2T .tR a{
  color: #256ff4;
}
.contMonitorOwn .table1 .col1 i{
  font-size: 14px;
  padding-right: 3px;
  color: #fff;
}
.contMonitorOwn .table1 .col1 .unRead{
  color: #ff6a5f;
}
.contMonitorOwn .table1 .col2{
  text-align: right;
}
</style>
