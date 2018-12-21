<template lang="pug">
.contDomainMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="toBackList" class="backlist">域名管理</span>
    <span @click="" v-show="showDetail" class="backDetail"> > 域名详情</span>

    .tR(v-show="!showDetail")
      span 搜索
      Input(style="width:200px",placeholder="请输入域名", name="", v-model.trim="value")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
      a(href="javascript:;",class="exportOrder",@click="") 导出域名列表
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
    .secTable(v-show="!showDetail")
      <Table :columns="columns" :data="list" :loading="loadingTable" ref="selection" @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange"></Table>
      .tableTool
        a(href="javascript:;", @click="handleSelectAll(true)") 全选
        a(href="javascript:;", @click="handleSelectAll(false)") 取消全选

        Poptip(placement="bottom", width="350", v-model="visible")
          Button(@click="", :disabled="disabledSafeLv", class="btnSafeLv") 移动至
          comp-user-auth-groups(slot="content", :on-parentmethod="hidePop", :domainIds="getDomainId", @refreshData = "searchListData", :groupsData="userAuthGroups")

        Button(@click="", :disabled="disabledSafeLv", class="btnSafeLv") 续费
        Button(@click="", :disabled="disabledSafeLv", class="btnSafeLv") 过户


  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20, v-show="!showDetail")

  <!-- 详情 -->
  comp-domain-mgmt-detail(
    @refreshData = "searchListData"
  )

</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compUserAuthGroups from '@/components/compUserAuthGroups'
import compDomainMgmtDetail from '@/components/compDomainMgmtDetail'
export default {
  components: {
    compUserAuthGroups,
    compDomainMgmtDetail
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
      disabledSafeLv: false,
      colllapseValue: '',
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
          width: 200,
          key: 'domainName',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-star',
                  size: "18"
                },
                on: {
                  click: () => {
                    this.$router.push({path: '/domain/security'})
                  }
                },
                style: {
                  margin: "0 5px 0 0",
                  color: "#f00",
                  cursor: 'pointer',
                  display: (this.list[params.index].importantFlag===1 ? 'inline-block' : 'none')
                }
              }),
              h('span', {
              }, this.list[params.index].domainName),
              h('span', {
                style: {
                  color: "#aaa",
                }
              }, this.list[params.index].depositFlag ? '(托管域名)' : '')
            ])
          }
        },
        {
          title: '到期日期',
          key: 'expireDate',
          className: 'col2'
        },
        {
          title: '服务状态',
          key: 'serviceStatus',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.DATAS.SERVICE_STATE[this.list[params.index].serviceStatus])
            ])
          }
        },
        {
          title: '域名所有者',
          key: 'organizeNameCn',
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
              }, '详情'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                  }
                }
              }, this.list[params.index].depositFlag ? '' : '解析')
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
          serviceState: '',
          createDay: '',
          expireDay: ''
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
      queryList: types.QUERY_DOMAIN_LIST
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
      },
      userAuthGroups (state) {
        let arrGroups = []
        if (state.user.userAuthGroups.companys) {
          arrGroups = this.GLOBALS.CONVERT_TREE(state.user.userAuthGroups.companys, {
            title: 'id',
            label: 'name',
            checked: 'checked',
            children: 'groups'
          })
        }
        return arrGroups
      }
    })
  },
  beforeMount () {
  },
  mounted () {
    this.queryList(this.queryListParam({pageNum: 1}))
  },
  watch: {
    userAuthGroups: {
      handler (newValue, oldValue) {
      },
      deep: true
    }
  }
}
</script>

<style>
.contDomainMgmt .pageTitle .exportOrder{
  margin-left: 20px;
}
.contDomainMgmt .secMain{
  background:none;
}
.contDomainMgmt .backDetail,
.contDomainMgmt .backlist{
  cursor:pointer;
}
.contDomainMgmt .filter{
  float:left;
  width:220px;
  background:#fff;
  margin-right:20px;
}

.contDomainMgmt .secTable{
  background:none;
  margin-left: 240px;
}
.contDomainMgmt .ivu-page{
  padding-top:20px;
}
.contDomainMgmt .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.contDomainMgmt .tableTool .ivu-btn{
  margin: 0 5px;
}
.contDomainMgmt .tableTool .btnSafeLv span{
  color:#333;
}
.contDomainMgmt .tableTool a{
  display:inline-block;
  margin: 0 10px;
}

</style>
