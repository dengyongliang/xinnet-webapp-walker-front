<template lang="pug">
.contNoticeMonitoring
  <!-- 标题区 -->
  h1.pageTitle.clear 监控通知
    .tR
      a(href="javascript:;", class="btnSet", @click="drawerNoticeSet=true",) 通知设置
  .secFilter
    form.filterWrap
      table
        tr.row1
          td.td1
            Button(@click="setRead",:loading="loadingBtn", :disabled="setReadDisabled") 设为已读
          td.tdBtn(colspan="3")
            span.n 通知时间：
            .inputWrap
              DatePicker(type="daterange",placeholder="全部",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
            span.n 通知类型：
            .inputWrap
              Select(v-model="type")
                Option(v-for="item in typeList",:value="item.value",:key="item.value") {{ item.label }}
            Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询

  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable" ref="selection" @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange"></Table>
      .tableTool
        a(href="javascript:;", @click="handleSelectAll(true)") 全选
        a(href="javascript:;", @click="handleSelectAll(false)") 取消全选

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")

  <!-- 通知设置 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerNoticeSet", title="通知设置", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-notice-set(
      v-if="drawerNoticeSet",
      :on-close="closeDrawer",
      @refreshData="searchListData"
    )
  <!-- 通知详情 弹窗 -->
  Modal(
    width="600",
    v-model="modelMailRecordDetail",
    class-name="modelMailRecordDetail",
    :footer-hide="true"
  )
    div(v-html="modelMailContent")
</template>

<script>
import { mapState } from 'vuex'
import compNoticeSet from '@/components/compNoticeSet'
import moment from 'moment'
export default {
  components: {
    compNoticeSet
  },
  data () {
    return {
      value: '',
      time: ['', ''],
      type: '',
      refresh: false,
      drawerNoticeSet: false,
      setReadDisabled: true,
      selectData: [],
      modelMailContent: '',
      modelMailRecordDetail: false,
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
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '时间',
          width: 200,
          key: 'sendTime',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('i', {
                class: this.list[params.index].readFlag === 1 ? 'unRead' : ''
              }, '●'),
              h('span', {
              }, moment(this.list[params.index].sendTime).format('YYYY-MM-DD HH:mm:ss'))
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
                  display: this.list[params.index].sendType === 2 ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.handleShowDetail(this.list[params.index])
                  }
                }
              }, this.list[params.index].title),
              h('a', {
                style: {
                  color: '#2271f4',
                  display: 'inline-block',
                  margin: '0 100px 0 0'
                },
                on: {
                  click: () => {
                    this.handleShowDetail(this.list[params.index])
                  }
                }
              }, this.list[params.index].title)
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
      // 查询数据
      this.drawerNoticeSet = false
      this.queryList(1)
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryList(curPage)
    },
    closeDrawer () {
      this.drawerNoticeSet = false
    },
    drawerChange () {
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    tableSelectChange (selected) {
      this.selectData = selected
      this.setReadDisabled = !selected.length
    },
    handleShowDetail (item) {
      this.$store.dispatch('MAIL_RECORD_DETAIL', {id: item.id}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.modelMailContent = response.data.data.detail
          // 设为已读
          this.$store.dispatch('MAIL_RECORD_READ', {id: item.id}).then(response => {
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              // 查找 所在 索引值
              let idx = this.list.findIndex((item2) => (item2.id === item.id))
              // 设为已读
              this.list[idx].readFlag = 2
            } else {
            }
          }).catch(() => {})
        } else {
        }
      }).catch(() => {})
      this.modelMailRecordDetail = true
    },
    setRead () {
      this.getDomainId.map((v) => {
        this.$store.dispatch('MAIL_RECORD_READ', {id: v}).then(response => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            // 查找 所在 索引值
            let idx = this.list.findIndex((item) => (item.id === v))
            // 设为已读
            this.list[idx].readFlag = 2
          } else {
          }
        }).catch(() => {})
      })
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        createTimeBegin: this.time[0] !== '' ? moment(this.time[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        createTimeEnd: this.time[1] !== '' ? moment(this.time[1]).format('YYYY-MM-DD') + ' 23:59:59' : '',
        type: this.type
      }
      console.log(params)
      return params
    },
    queryList (num) {
      this.$store.dispatch('MAIL_MANAGE', this.queryListParam({pageNum: num})).then(response => {
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
    getDomainId () {
      return this.selectData.map((v) => {
        return v.id
      })
    },
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
    this.queryList(1)
  }
}
</script>

<style>
.contNoticeMonitoring .filterWrap .tdBtn{
  text-align: right;
  width: 75%;
}
.contNoticeMonitoring .filterWrap .tdBtn .n{
  display:inline-block;
  float: none;
}
.contNoticeMonitoring .filterWrap .tdBtn .inputWrap{
  width: 200px;
  margin: 0px;
  display: inline-block;
  text-align: left;
}
.contNoticeMonitoring .filterWrap .tdBtn .ivu-btn{
  margin-left: 10px;
}
.contNoticeMonitoring .btnSet{
  color: #2271f4;
  font-size: 14px;
}
.contNoticeMonitoring .col2{
  text-align: right;
}
.contNoticeMonitoring .col1 i{
  font-size: 14px;
  padding-right: 3px;
  color: #fff;
}
.contNoticeMonitoring .col1 .unRead{
  color: #ff6a5f;
}
.contNoticeMonitoring .tableTool {
  background:#fff;
  padding: 0px 20px;
  height: 52px;
  line-height: 52px;
}
.contNoticeMonitoring .tableTool .ivu-btn{
  margin: 0 5px;
}
.contNoticeMonitoring .tableTool .toolBtn span{
  color:#333;
}
.contNoticeMonitoring .tableTool a{
  display:inline-block;
  margin: 0 10px;
}
</style>
