<template lang="pug">
.contDomainChange
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="toBackList" class="backlist">域名过户</span>
    <span v-show="showDetail"> > 过户详情</span>
  .secFilter(v-show="!showDetail")
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
              comp-select(:list="statusList", ref="changeStatus", styles="width:100%")
          td.tdBtn
            Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
            Button(type="primary", @click="drawerDomainChange=true",:loading="loadingBtn") 批量过户
  .secMain(v-show="!showDetail")
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(v-show="!showDetail", :total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  comp-domain-change-detail(v-show="showDetail", :detailData="detailData")

  <!-- 过户提交 抽屉 -->
  Drawer(:closable="true", width="650", v-model="drawerDomainChange", title="提交过户", :mask-closable="maskClosable", @on-visible-change="drawerChange",)
    comp-domain-change(
      v-if="drawerDomainChange",
      :on-close="closeDrawer",
      @refreshData="searchListData",
    )
</template>

<script>
import { mapState } from 'vuex'
import compSelect from '@/components/compSelect'
import compDomainChangeDetail from '@/components/compDomainChangeDetail'
import compDomainChange from '@/components/compDomainChange'
import moment from 'moment'
export default {
  components: {
    compSelect,
    compDomainChange,
    compDomainChangeDetail
  },
  data () {
    return {
      value: '',
      refresh: false,
      showDetail: false,
      drawerDomainChange: false,
      times: [],
      statusList: [],
      detailData: {},
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
          key: 'changeTime',
          className: 'col3'
        },
        {
          title: '过户状态',
          key: 'changeStatus',
          className: 'col4',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.DATAS.DOMAIN_CHANGE_TYPE[this.list[params.index].changeStatus])
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
                    this.showDomainDetail(this.list[params.index].id)
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
      this.closeDrawer()
      this.queryChangeList(1)
    },
    showDomainDetail (id) {
      let params = {
        changeId: id
      }
      this.$store.dispatch('CHANGE_INFO', params).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.detailData = response.data.data
        } else {

        }
      }).catch(() => {})
      this.showDetail = true
    },
    closeDrawer () {
      this.drawerDomainChange = false
    },
    drawerChange () {
    },
    toBackList () {
      this.showDetail = false
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryChangeList(curPage)
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        domainName: this.value,
        changeStatus: this.$refs.changeStatus.value,
        createTimeBegin: this.times[0] !== '' ? moment(this.times[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        createTimeEnd: this.times[1] !== '' ? moment(this.times[1]).format('YYYY-MM-DD') + ' 23:59:59' : ''
      }
      return params
    },
    queryChangeList (num) {
      this.$store.dispatch('CHANGE_LIST', this.queryListParam({pageNum: num})).then(response => {
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
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
  },
  mounted () {
    this.statusList = (function (vm) {
      let array = [{
        label: '全部',
        value: ''
      }]
      for (var i in vm.DATAS.DOMAIN_CHANGE_TYPE) {
        array.push({
          label: vm.DATAS.DOMAIN_CHANGE_TYPE[i],
          value: parseInt(i)
        })
      }
      return array
    })(this)
    this.queryChangeList(1)
  }
}
</script>

<style scoped>
.contDomainChange .backlist{
  cursor: pointer;
}
.contDomainChange .tdBtn button{
  margin-left:20px;
}
.contDomainChange .filterWrap .compSelect{
  width:100%;
}
</style>
