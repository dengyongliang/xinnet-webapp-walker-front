<template lang="pug">
.contOrderMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 工单管理
    .tR
      Button(@click="drawerWorkOrderSubmit=true") + 提交工单
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 提交工单 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerWorkOrderSubmit", title="提交工单", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-work-order-submit(
      v-if="drawerWorkOrderSubmit",
      :on-close="closeDrawer",
      @refreshData="searchListData"
    )

  <!-- 详情工单 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerWorkOrderDetail", title="工单详情", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-work-order-detail(
      v-if="drawerWorkOrderDetail",
      :on-close="closeDrawer",
      :orderData = "orderDetailInfo"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compWorkOrderSubmit from '@/components/compWorkOrderSubmit'
import compWorkOrderDetail from '@/components/compWorkOrderDetail'

export default {
  components: {
    compWorkOrderSubmit,
    compWorkOrderDetail
  },
  data () {
    return {
      columns: [
        {
          title: '提交时间',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '姓名',
          key: 'userName',
          className: 'col2'
        },
        {
          title: '用户ID',
          key: 'userId',
          className: 'col3'
        },
        {
          title: '问题类型',
          key: 'questionType',
          className: 'col4',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.DATAS.QUESTION_TYPE[this.list[params.index].questionType])
            ])
          }
        },
        {
          title: '域名',
          key: 'domainName',
          className: 'col5'
        },
        {
          title: '状态',
          key: 'status',
          className: 'col6',
          render: (h, params) => {
            if (this.list[params.index].status === 1) {
              return h('div', [
                h('span', {}, '待处理')
              ])
            }
            if (this.list[params.index].status === 2) {
              return h('div', [
                h('span', {}, '处理中')
              ])
            }
            if (this.list[params.index].status === 3) {
              return h('div', [
                h('span', {}, '已完成')
              ])
            }
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
                    this.showDetail(this.list[params.index].id)
                  }
                }
              }, '查看详情')
            ])
          }
        }
      ],
      refresh: false,
      drawerWorkOrderSubmit: false,
      drawerWorkOrderDetail: false,
      list: [],
      loadingTable: true,
      loadingBtn: false,
      orderDetailInfo: {},
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
      this.queryWorkOrderManageList(this.queryOrderListParam({pageNum: 1}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryWorkOrderManageList(this.queryOrderListParam({pageNum: curPage}))
    },
    closeDrawer () {
      this.drawerWorkOrderSubmit = false
    },
    drawerChange () {
    },
    showDetail (id) {
      let params = {
        param: {
          id: id
        },
        callback: (response) => {
          if (response.data.code === '1000') {
            this.orderDetailInfo = response.data.data
          } else {
            this.$Message.error('查询失败')
          }
        }
      }
      this.queryWorkOrderDetail(params)
      this.drawerWorkOrderDetail = true
    },
    queryOrderListParam (obj) {
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
            if (response.data.code === '900') {
              this.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    ...mapActions({
      queryWorkOrderManageList: types.QUERY_WORK_ORDER_MANAGE_LIST,
      queryWorkOrderDetail: types.QUERY_WORK_ORDER_DETAIL
    })
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
    this.queryWorkOrderManageList(this.queryOrderListParam({pageNum: 1}))
  }
}
</script>

<style scoped>

</style>
