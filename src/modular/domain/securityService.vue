<template lang="pug">
.contSecurityService
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="toBackList" class="backlist">域名安全服务</span>
    <span @click="toDetail" v-show="showDetail" class="backDetail"> > 实名信息详情</span>
    <span v-show="showLock"> > 注册局锁</span>

    .tR(v-show="!showDetail")
      span 搜索
      Input(style="width:200px",placeholder="请输入域名", name="", v-model.trim="value")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
  .secMain(v-show="!showDetail")
    .filter
      Collapse(v-model="colllapseValue")
        Panel(name="1") 按公司筛选
          div(slot="content")
            Tree(:data="userCompanys", show-checkbox, ref="Tree",)
        Panel(name="2") 按域名管理权限筛选
          div(slot="content")
            Tree(:data="userCompanys", show-checkbox, ref="Tree2",)
    <!-- 列表主体 -->
    .secTable.table1(v-show="!showDetail")
      <Table :columns="columns" :data="list" :loading="loadingTable" ref="selection" @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange"></Table>
      .tableTool
        a(href="javascript:;", @click="handleSelectAll(true)") 全选
        a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
        Poptip(placement="top", width="240", v-model="visible")
          Button(@click="", :disabled="disabledSafeLv", class="btnSafeLv") 设置保护等级
          comp-important-select(slot="content", :on-parentmethod="hidePop", :domainIds="getDomainId", @refreshData = "searchListData")


  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20, v-show="!showDetail")

  <!-- 安全服务详情 -->
  comp-domain-safe-detail(v-if="showDetail", :showLock="showLock", :on-parentmethod="parentMethod", :detailData="detailData", @refreshData = "searchListData")

</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compImportantSelect from '@/components/compImportantSelect'
import compDomainSafeDetail from '@/components/compDomainSafeDetail'
export default {
  components: {
    compImportantSelect,
    compDomainSafeDetail
  },
  data () {
    return {
      value: '',
      refresh: false,
      visible: false,
      selectData: [],
      loadingTable: true,
      loadingBtn: false,
      showDetail: false,
      showLock: false,
      disabledSafeLv: true,
      colllapseValue: '',
      detailData:{},
      list: [],
      userCompanys: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '域名',
          key: 'domainName',
          className: 'col1'
        },
        {
          title: '保护等级',
          key: 'importantFlag',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.DATAS.IMPORTANT_FLAG[this.list[params.index].importantFlag])
            ])
          }
        },
        {
          title: '自动续费',
          key: 'renewFlag',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: function (vm) {
                    if (vm.list[params.index].renewFlag===1) {
                      return "#46a405"
                    }
                    if (vm.list[params.index].renewFlag===2) {
                      return "#aaa"
                    }
                  }(this)
                }
              }, this.DATAS.RENEWFLAG[this.list[params.index].renewFlag])
            ])
          }
        },
        {
          title: '注册局锁',
          key: 'backendLockFlag',
          className: 'col4',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: function (vm) {
                    if (vm.list[params.index].backendLockFlag===1) {
                      return "#46a405"
                    }
                    if (vm.list[params.index].backendLockFlag===2) {
                      return "#aaa"
                    }
                  }(this)
                }
              }, this.DATAS.BACKENDLOCKFLAG[this.list[params.index].backendLockFlag])
            ])
          }
        },
        {
          title: '禁止更新',
          key: 'updateFlag',
          className: 'col5',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: function (vm) {
                    if (vm.list[params.index].updateFlag===1) {
                      return "#46a405"
                    }
                    if (vm.list[params.index].updateFlag===2) {
                      return "#aaa"
                    }
                  }(this)
                }
              }, this.DATAS.UPDATEFLAG[this.list[params.index].updateFlag])
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
                    this.showDetailFun(this.list[params.index])
                  }
                }
              }, '详情')
            ])
          }
        }
      ]
    }
  },
  methods: {
    searchListData () {
      this.queryList(this.queryListParam({pageNum: 1}))
    },
    pageChange: function (curPage) {
      this.queryList(this.queryListParam({pageNum: curPage}))
    },
    toBackList () {
      this.searchListData()
      this.showDetail = false
    },
    toDetail () {
      this.showDetail = true
      this.showLock = false
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    tableSelectChange (selected) {
      this.selectData = selected
      this.disabledSafeLv = selected.length ? false : true
    },
    hidePop () {
      this.visible = false
    },
    showDetailFun (item) {
      this.detailData = item
      this.showDetail = true
    },
    parentMethod () {
      this.showLock = true
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
          domainSuffixs: '',
          otherSuffix: '',
          allSuffix: '',
          groupIds: '',
          importantFlag: '',
          renewFlag: '',
          updateFlag: '',
          backendLockFlag: ''
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
      queryList: types.QUERY_DOMAIN_SAFE_LIST
    })
  },
  computed: {
    getDomainId () {
      console.log(this.selectData)
      return this.selectData.map((v) => {
        return v.id
      }).join(",")
    },
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
  },
  mounted () {
    this.queryList(this.queryListParam({pageNum: 1}))
  }
}
</script>

<style>
.contSecurityService .secMain{
  background:none;
}
.contSecurityService .backDetail,
.contSecurityService .backlist{
  cursor:pointer;
}
.contSecurityService .filter{
  float:left;
  width:220px;
  background:#fff;
  margin-right:20px;
}

.contSecurityService .secTable.table1{
  background:none;
  margin-left: 240px;
}
.contSecurityService .ivu-page{
  padding-top:20px;
}
.contSecurityService .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.contSecurityService .tableTool .ivu-btn{
  margin: 0 5px;
}
.contSecurityService .tableTool .btnSafeLv span{
  color:#333;
}
.contSecurityService .tableTool a{
  display:inline-block;
  margin: 0 10px;
}

</style>
