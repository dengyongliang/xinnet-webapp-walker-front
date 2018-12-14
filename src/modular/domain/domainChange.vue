<template lang="pug">
.contDomainChange
  <!-- 标题区 -->
  h1.pageTitle.clear 域名过户
  .secFilter
    form.filterWrap(ref="exportForm")
      table
        tr.row1
          td.td1
            span.n 搜索：
            .inputWrap
              <Input v-model="value" placeholder="请输入域名" />
          td.td2
            span.n 提交时间：
            .inputWrap
              DatePicker(type="daterange",placeholder="全部",v-model="times",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
          td.td3
            span.n 过户状态：
            .inputWrap
              comp-select(:list="statusList", ref="transferStatus", styles="width:100%")
          td.tdBtn
            Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
            Button(type="primary", @click="",:loading="loadingBtn") 批量过户
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
import compSelect from '@/components/compSelect'
export default {
  components: {
    compSelect
  },
  data () {
    return {
      value: '',
      times: [],
      statusList: [],
      columns: [
        {
          title: '域名',
          key: 'domainName',
          className: 'col1'
        },
        {
          title: '提交时间',
          key: 'createTime',
          className: 'col2'
        },
        {
          title: '过户时间',
          key: 'tansferInTime',
          className: 'col3'
        },
        {
          title: '过户状态',
          key: 'transferStatus',
          className: 'col4'
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
      }
    }
  },
  methods: {
    searchListData () {
      this.queryChangeList(this.queryListParam({pageNum: 1}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryChangeList(this.queryListParam({pageNum: curPage}))
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          domainName: this.value,
          transferStatus: this.$refs.transferStatus.value,
          createTimeBegin: this.times[0] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(this.times[0]) : '',
          createTimeEnd: this.times[1] !== '' ? this.GLOBALS.CRT_TIME_FORMAT(this.times[1]) : ''
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
      queryChangeList: types.QUERY_CHANGE_LIST
    })
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    this.queryChangeList(this.queryListParam({pageNum: 1}))
  }
}
</script>

<style scoped>
.contDomainChange .tdBtn button{
  margin-left:20px;
}
.contDomainChange .filterWrap .compSelect{
  width:100%;
}
</style>
