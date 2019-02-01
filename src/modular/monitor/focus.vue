<template lang="pug">
.contMonitorFocus
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="showDetail=false" class="backlist">关注域名监控</span>
    <span v-show="showDetail"> > 域名监控详情</span>
  .secMain(v-show="!showDetail")
    h2.h2T.clear 重要监控通知
      .tR
        router-link(to="/notice/monitoring") 查看全部监控通知
    .secTable.secTable1
      Table(class="table1", :columns="columns1", :data="list1", :loading="loadingTable", ref="selection", :show-header="false")

    h2.h2T.clear 监控域名列表
      .tR
        Button(type="primary", @click="",:loading="loadingBtn") 添加关注域名

    <!-- 列表主体 -->
    .secTable.secTable2
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20,v-show="!showDetail")

  .pageDetail(v-show="showDetail")
    comp-monitor-focus-detail()
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compMonitorFocusDetail from '@/components/compMonitorFocusDetail'
export default {
  components: {
    compMonitorFocusDetail
  },
  data () {
    return {
      value: '',
      colllapseValue: '',
      userCompanys: [],
      showDetail: false,
      columns1: [
        {
          title: '时间',
          width: 200,
          key: 'sendTime',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('i', {
                class: this.list1[params.index].readFlag === 1 ? 'unRead' : ''
              }, '●'),
              h('span', {
              }, this.list1[params.index].sendTime)
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
                  display: this.list1[params.index].sendType === 2 ? 'inline-block' : 'none'
                }
              }, this.list1[params.index].title),
              h('a', {
                style: {
                  color: '#2271f4'
                }
              }, this.list1[params.index].title)
            ])
          }
        }
      ],
      list1: [],
      columns: [
        {
          title: '时间',
          width: 150,
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '域名',
          width: 150,
          key: 'domainName',
          className: 'col2'
        },
        {
          title: '事件类型',
          width: 200,
          key: 'type',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.DATAS.RECORD_DOMAIN_EVENT_TYPE[this.list[params.index].type])
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
                    this.showDetailFun()
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      list: [
        {}
      ],
      loadingTable: true,
      loadingBtn: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchListData () {
      this.queryList(this.queryListParam({pageNum: 1}))
    },
    pageChange: function (curPage) {
      this.queryList(this.queryListParam({pageNum: curPage}))
    },
    showDetailFun () {
      this.showDetail = true
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20
        },
        callback: (response) => {
          this.loadingBtn = false
          this.loadingTable = false
          if (response.data.code === '1000') {
            this.list = response.data.data.list
            this.page.pageItems = response.data.data.totalNum
          } else {
          }
        }
      }
      return params
    },
    ...mapActions({
      queryList1: types.QUERY_MAIL_MANAGE,
      queryList: types.QUERY_DOMAIN_MONITOR_MANAGE,
      setMailRecordRead: types.SET_MAIL_RECORD_READ
    })
  },
  computed: {
  },
  beforeMount () {
    let params = {
      param: {
      },
      callback: (response) => {
        this.loadingTable = false
        this.loadingBtn = false
        if (response.data.code === '1000') {
          this.list1 = response.data.data.list
        } else {
        }
      }
    }
    this.queryList1(params)
    // this.queryList(this.queryListParam({pageNum: 1}))
  }
}
</script>

<style>
.contMonitorFocus .secMain{
  background:none;
}
.contMonitorFocus .backlist{
  cursor: pointer;
}
.contMonitorFocus .secTable1{
  margin-bottom: 20px;
}
.contMonitorFocus .secTable2{
  background:none;
}
.contMonitorFocus .h2T{
  font-weight: normal;
  padding: 20px 0;
}
.contMonitorFocus .h2T .tR{
  float: right;
  font-size: 12px;
}
.contMonitorFocus .h2T .tR .ivu-input-wrapper{
  width: 200px;
  margin: 0 10px;
}
.contMonitorFocus .h2T .tR a{
  color: #256ff4;
}
.contMonitorFocus .table1 .col1 i{
  font-size: 14px;
  padding-right: 3px;
  color: #fff;
}
.contMonitorFocus .table1 .col1 .unRead{
  color: #ff6a5f;
}
.contMonitorFocus .table1 .col2{
  text-align: right;
}
</style>
