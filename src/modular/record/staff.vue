<template lang="pug">
.contRecordDomain
  <!-- 标题区 -->
  h1.pageTitle.clear 员工监控日志
  .secFilter
    form.filterWrap(ref="exportForm",target="_blank" method="post" accept-charset="utf-8" :action="exportLink")
      table
        tr.row1
          td.td1
            span.n 搜索：
            .inputWrap
              <Input v-model="value" placeholder="请输入员工" />
          td.td2
            span.n 日志记录时间：
            .inputWrap
              DatePicker(type="daterange",placeholder="全部",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
          td.td3
            span.n 通知类型：
            .inputWrap
              Select(v-model="levelType")
                Option(v-for="item in typeList",:value="item.value",:key="item.value") {{ item.label }}
          td.tdBtn(colspan="3")
            Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
            a(href="javascript:;",class="exportOrder",@click="exportOrder") 导出日志
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import * as links from '@/global/linkdo.js'
export default {
  components: {
  },
  data () {
    return {
      value: '',
      time: '',
      levelType: '',
      exportLink: links.EXPORT_MONITOR_USER_LOG,
      typeList: [
        {
            value: '',
            label: '全部'
        },
        {
            value: 1,
            label: '普通'
        },
        {
            value: 2,
            label: '重要'
        }
      ],
      columns: [
        {
          title: '时间',
          width: 150,
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '员工',
          width: 150,
          key: 'userId',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {}, `${this.list[params.index].userName}(${this.list[params.index].userCode})` )
            ])
          }
        },
        {
          title: '事件类型',
          width: 200,
          key: 'type',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.DATAS.RECORD_USER_EVENT_TYPE[this.list[params.index].type] )
            ])
          }
        },
        {
          title: '日志详情',
          key: 'content',
          className: 'col4'
        }
      ],
      list: [],
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
      // 查询数据
      this.queryList(this.queryListParam({pageNum: 1}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryList(this.queryListParam({pageNum: curPage}))
    },
    exportOrder () {
      this.$refs.exportForm.submit()
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          userName: this.value,
          createTimeBegin: this.time[0] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(this.time[0]) : '',
          createTimeEnd: this.time[1] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(this.time[1]) : '',
          levelType: this.levelType
        },
        callback: (response) => {
          this.loadingBtn = false
          this.loadingTable = false
          if (response.data.code === '1000'){
            this.list = response.data.data.list
            this.page.pageItems = response.data.data.totalNum
          } else {
          }
        }
      }
      return params
    },
    ...mapActions({
      queryList: types.QUERY_USER_MONITOR_MANAGE,
      setMailRecordRead: types.SET_MAIL_RECORD_READ
    })
  },
  computed: {
  },
  beforeMount () {
    this.queryList(this.queryListParam({pageNum: 1}))
  }
}
</script>

<style>
.contRecordDomain .td1,
.contRecordDomain .td2,
.contRecordDomain .td3{
  width: 28%
}
.contRecordDomain .tdBtn{
  width: 16%;
}
.contRecordDomain .filterWrap td .n{
  width: 90px;
}
.contRecordDomain .filterWrap td .inputWrap{
  margin-left: 90px;
}
.contRecordDomain .exportOrder{
  margin-left:20px;
}
</style>
