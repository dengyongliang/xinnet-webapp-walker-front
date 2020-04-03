<template lang="pug">
.contBrand
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span>商标监控</span>
    .tR
      Button(type="default", class="btnTop" @click="",:loading="loadingBtn", v-if="tabIdx==='name1'") 通知设置
      Button(type="default", class="btnTop" @click="",:loading="loadingBtn", v-if="tabIdx==='name2'") 添加关键词
      Button(type="default", class="btnTop" @click="",:loading="loadingBtn", v-if="tabIdx==='name3'") 添加监控主体
  .secMain()
    Tabs(value="name1", :animated="false", @on-click="handleTabChange")
      TabPane(label="关注的商标", name="name1", class="tabCont1")
        .secFilter()
          form.filterWrap(ref="exportForm")
            table
              tr.row1
                td.td1
                  span.n 搜索商标：
                  .inputWrap
                    <Input v-model="value" ref="domainName" placeholder="商标名称/注册号/申请主体" />
                td.td2
                  span.n 商标状态：
                  .inputWrap
                    comp-select(:list="siteTypesList", ref="siteTypes", styles="width:100%",placeholder="全部")
                td.td3

                td.tdBtn
                  Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
              tr.row3
                td(colspan="3")
                  span.n 后缀：
                  .inputWrap
                    comp-checkbox(:list="suffixList", ref="domainSuffixs")
                td.tdBtn
                  Button(class="btnMore",type="default", @click="",:loading="loadingBtn") 更多
                    Icon(type="ios-arrow-down")

        <!-- 列表主体 -->
        .secTable.secTable2
          <Table :columns="columns" ref="selection" :data="list" :loading="loadingTable"  @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange" @on-sort-change="sortChange"></Table>
          .tableTool
            a(href="javascript:;", @click="handleSelectAll(true)") 全选
            a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
            Button(@click="delDomains", class="toolBtn") 取消关注

        <!-- 翻页区 -->
        Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")

      TabPane(label="近似商标监控", name="name2", class="tabCont2")
        .secFilter()
          form.filterWrap(ref="exportForm")
            table
              tr.row1
                td.td1
                  span.n 搜索商标：
                  .inputWrap
                    <Input v-model="value" ref="domainName" placeholder="商标名称/注册号/申请主体" />
                td.td2
                  span.n 商标状态：
                  .inputWrap
                    comp-select(:list="siteTypesList", ref="siteTypes", styles="width:100%",placeholder="全部")
                td.td3
                  span.n 品牌名称：
                  .inputWrap
                    comp-select(:list="brandList",  ref="brandIds", styles="width:100%", placeholder="全部")
                td.tdBtn
                  Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询

          <!-- 列表主体 -->
          .secTable.secTable2
            <Table :columns="columns" ref="selection" :data="list" :loading="loadingTable"  @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange" @on-sort-change="sortChange"></Table>
            .tableTool
              a(href="javascript:;", @click="handleSelectAll(true)") 全选
              a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
              Button(@click="delDomains", class="toolBtn") 取消监控

        <!-- 翻页区 -->
        Page(:total="page2.pageItems",:current="page2.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange2",:page-size="20")

      TabPane(label="按申请主体监控", name="name3", class="tabCont3")
        .secFilter()
          form.filterWrap(ref="exportForm")
            table
              tr.row1
                td.td1
                td.td2
                td.td3
                  span.n 申请主体：
                  .inputWrap
                    <Input v-model="value" ref="domainName" placeholder="" />
                td.tdBtn
                  Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询

          <!-- 列表主体 -->
          .secTable.secTable2
            <Table :columns="columns" ref="selection" :data="list" :loading="loadingTable"  @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange" @on-sort-change="sortChange"></Table>
            .tableTool
              a(href="javascript:;", @click="handleSelectAll(true)") 全选
              a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
              Button(@click="delDomains", class="toolBtn") 取消监控

        <!-- 翻页区 -->
        Page(:total="page3.pageItems",:current="page3.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange3",:page-size="20")

</template>
<script>
import compSelect from '@/components/compSelect'
import compCheckbox from '@/components/compCheckbox'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  components: {
    compSelect,
    compCheckbox
  },
  data () {
    return {
      id: 0,
      value: '',
      tabIdx: 'name1',
      columns: [
        {
          type: 'expand',
          width: 1,
          render: (h, params) => {
            return params.row.excepInfo.length ? h(compFocusDomainTableExpand, {
              props: {
                row: params.row
              }
            }) : ''
          }
        },
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '域名',
          key: 'domainName',
          className: 'col1',
          sortable: 'custom',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.list[params.index].domainName + '(' + (this.list[params.index].isReg === 0 ? '未注册' : (this.list[params.index].isReg === 1 ? '已注册' : '不支持')) + ')')
            ])
          }
        },
        {
          title: '品牌',
          key: 'brandName',
          className: 'col2'
        },
        {
          title: '注册商',
          key: 'registrarName',
          className: 'col3',
          sortable: 'custom'
        },
        {
          title: '注册时间',
          width: 150,
          key: 'whoisApplyTime',
          className: 'col4',
          sortable: 'custom'
        },
        {
          title: '到期时间',
          width: 150,
          key: 'whoisExpireTime',
          className: 'col5',
          sortable: 'custom'
        },
        {
          title: '建站情况',
          width: 150,
          key: 'siteInfo',
          className: 'col6'
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
                    this.showDetailFun(this.list[params.index].id)
                  }
                }
              }, this.list[params.index].isReg === 1 ? '查看详情' : '')
            ])
          }
        }
      ],
      list: [],
      suffixList: [
        {
          value: '.com',
          label: '.com'
        },
        {
          value: '.cn',
          label: '.cn'
        },
        {
          value: '.net',
          label: '.net'
        },
        {
          value: '.com.cn',
          label: '.com.cn'
        },
        {
          value: '其他',
          label: 'other'
        }
      ],
      loadingTable: true,
      loadingBtn: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      page2: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      page3: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    pageChange: function (curPage) {
      // this.queryList({pageNum: curPage})
    },
    pageChange2: function (curPage) {
      // this.queryList({pageNum: curPage})
    },
    pageChange3: function (curPage) {
      // this.queryList({pageNum: curPage})
    },
    handleTabChange: function (name) {
      this.tabIdx = name
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
    this.$nextTick(function () {
    })
  },
  watch: {
  }
}
</script>
<style>
.contBrand .secMain {
    background: none!important;
}
.contBrand .ivu-tabs-bar{
  background: #fff;
  margin-bottom: 0px;
}
.contBrand .ivu-tabs-bar .ivu-tabs-tab{
  height: 50px;
  line-height: 50px;
  padding: 0 30px;
  /* margin: 0px; */
}
/* .contBrand .btnTop{
  display: none;
} */
.contBrand .btnMore{
  border: none;
  background: none;
  padding: 0px;
}
.contBrand .btnMore span{
  color: #333;
}
.contBrand .secFilter{
  background: #ecf3fb;
  padding-top: 10px;
  padding-right: 20px;
}
.contBrand .filterWrap {
  padding: 10px 0px;
}
.contBrand .filterWrap .td1,
.contBrand .filterWrap .td2,
.contBrand .filterWrap .td3{
  width: 30%;
}
.contBrand .filterWrap .tdBtn{
  width: 10%;
}

.contBrand .secFilter .compSelect{
  width: 100%;
}
.contBrand .secFilter .compCheckbox{
  padding: 8px 0;
}
.contBrand .secFilter .inputWrap{
  background: none;
}
.contBrand .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.contBrand .tableTool .ivu-btn{
  margin: 0 5px;
}
.contBrand .tableTool .toolBtn span{
  color:#333;
}
.contBrand .tableTool a{
  display:inline-block;
  margin: 0 10px;
}
</style>
