<template lang="pug">
.contDomainTransferIn
  <!-- 标题区 -->
  h1.pageTitle.clear 域名转入管理
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
            span.n 状态：
            .inputWrap
              comp-select(:list="statusList", ref="transferStatus", styles="width:100%")
          td.tdBtn
            Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
            Button(type="primary", @click="drawerTransferIn=true",:loading="loadingBtn") 提交转入
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 提交转入 抽屉 -->
  Drawer(:closable="true", width="650", v-model="drawerTransferIn", title="提交转入", :mask-closable="maskClosable", @on-visible-change="drawerChange",)
    comp-domain-transfer-in(
      v-if="refresh",
      :on-close="closeDrawer"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compSelect from '@/components/compSelect'
import compDomainTransferIn from '@/components/compDomainTransferIn'
import moment from 'moment'
export default {
  components: {
    compSelect,
    compDomainTransferIn
  },
  data () {
    return {
      value: '',
      times: [],
      statusList: [],
      refresh: false,
      drawerTransferIn: false,
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
            if (this.list[params.index].transferStatus===4) {
              return h('Tooltip', {
                  props: {
                    content: '转入失败，已退款',
                    placement: "top"
                  }
                },
                [
                  h('Icon', {
                    props: {
                      custom: 'i-icon i-icon-tips',
                      size: "16"
                    },
                    style: {
                      margin: "0 5px 0 0",
                      color: "#48affe"
                    }
                  }),
                  h('a', {
                    props: {
                      href: ''
                    },
                    style: {
                      color: "#f00"
                    }
                  }, this.DATAS.DOMAIN_TRANSFER_STATUS[this.list[params.index].transferStatus])
                ]
              )
            }

            if (this.list[params.index].transferStatus!==4) {
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
      this.queryTransferInList(this.queryListParam({pageNum: 1}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryTransferInList(this.queryListParam({pageNum: curPage}))
    },
    closeDrawer () {
      this.drawerTransferIn = false
    },
    drawerChange () {
      this.refresh = this.drawerTransferIn ? true : false
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
          createTimeBegin: this.times[0] !== '' ? moment(this.times[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
          createTimeEnd: this.times[1] !== '' ? moment(this.times[1]).format('YYYY-MM-DD') + ' 23:59:59' : ''
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
      queryTransferInList: types.QUERY_TRANSFER_IN_LIST
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
  },
  mounted () {
    this.statusList = function (vm) {
      let array = [{
        label: '全部',
        value: ''
      }]
      for (var i in vm.DATAS.DOMAIN_TRANSFER_STATUS) {
        array.push({
          label: vm.DATAS.DOMAIN_TRANSFER_STATUS[i],
          value: parseInt(i)
        })
      }
      return array
    }(this)
    this.queryTransferInList(this.queryListParam({pageNum: 1}))
  }
}
</script>

<style scoped>
.contDomainTransferIn .tdBtn button{
  margin-left:20px;
}
.contDomainTransferIn .filterWrap .compSelect{
  width:100%;
}
</style>
