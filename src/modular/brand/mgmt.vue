<template lang="pug">
.contBrandMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span class="backlist">商标管理</span>
    .tR
      Button(type="default",@click="showAddBrand=true") 添加商标
  .secMain()
    .secFilter()
      form.filterWrap(ref="exportForm")
        table
          tr.row1
            td.td1
              span.n 搜索商标：
              .inputWrap
                <Input v-model="value" ref="keyWords" placeholder="商标名称/注册号/申请主体" />
            td.td2
              span.n 商标状态：
              .inputWrap
                Select(v-model="currentStatus", style="width:100%", ref="currentStatus", placeholder="全部")
                  Option(v-for="item in currentStatusList", :value="item.value", :key="item.key") {{item.label}}

            td.td3
              span.n 品牌名称：
              .inputWrap
                Select(v-model="brandId", style="width:100%", ref="brandId", placeholder="全部")
                  Option(v-for="item in brandList", :value="item.value", :key="item.value") {{item.label}}
            td.tdBtn
              Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
          tr.row3
            td(colspan="4")
              span.n 国际分类：
              .inputWrap
                RadioGroup(v-model="facetsGroup", @on-change="handleRadioChange")
                  Radio(label="0", key="0") 全部
                  Radio(v-for="item in facetsList", :label="item.code", :key="item.id") {{item.code}} {{item.codeName}}
            //- td.tdBtn
            //-   Button(class="btnMore",type="default", @click="",:loading="loadingBtn") 更多
            //-     Icon(type="ios-arrow-down")

      <!-- 列表主体 -->
      .secTable.secTable2
        <Table :columns="columns" ref="selection" :data="list" :loading="loadingTable"  @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange"></Table>
        .tableTool
          a(href="javascript:;", @click="handleSelectAll(true)") 全选
          a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
          Button(@click="delDomains", class="toolBtn") 删除商标

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20",)
  Modal(v-model="showAddBrand",title="添加商标", width="625px", class-name="compAddBrand",:mask-closable="maskClosable",:footer-hide="true")
    comp-add-brand(
      v-if="showAddBrand",
      @closeModal = "closeModal",
      @queryList = "searchListData"
  )
</template>

<script>
import compAddBrand from '@/components/compAddBrand'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  components: {
    compAddBrand
  },
  data () {
    return {
      value: '',
      intCls: '0',
      showAddBrand: false,
      currentStatus: '',
      brandId: '',
      removeDisabled: true,
      selectData: [],
      facetsGroup: '',
      currentStatusList: [
        {
          label: '全部',
          value: '',
          key: 0
        },
        {
          label: '申请中',
          value: '申请中',
          key: 1
        },
        {
          label: '初审公告期',
          value: '初审公告期',
          key: 2
        },
        {
          label: '续展/宽限期',
          value: '续展/宽限期',
          key: 3
        },
        {
          label: '有效',
          value: '有效',
          key: 4
        },
        {
          label: '已失效',
          value: '已失效',
          key: 5
        }
      ],
      facetsList: [
      ],
      brandList: [],
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '商标图样',
          key: 'domainName',
          className: 'col1',
          render: (h, params) => {
            return h('div', {
              style: {
                width: '76px',
                height: '35px',
                'line-height': '33px',
                'vertical-align': 'middle',
                'text-align': 'center',
                'background': '#fff',
                border: '1px solid #f0f0f0'
              }
            }, [
              h('img', {
                attrs: {
                  src: `http://tmpic.tmkoo.com/${this.list[params.index].tmImg}-m`
                },
                style: {
                  'max-width': '74px',
                  'max-height': '33px',
                  'vertical-align': 'middle'
                }
              })
            ])
          }
        },
        {
          title: '商标名称',
          key: 'tmName',
          className: 'col2'
        },
        {
          title: '所属品牌',
          key: 'brandName',
          className: 'col3'
        },
        {
          title: '申请主体',
          key: 'applicantCn',
          className: 'col4'
        },
        {
          title: '注册号',
          key: 'regNo',
          className: 'col5'
        },
        {
          title: '类别',
          key: 'intClsInfo',
          className: 'col6'
        },
        {
          title: '申请时间',
          key: 'appDate',
          className: 'col7'
        },
        {
          title: '状态',
          key: 'currentStatus',
          className: 'col8'
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            return h('div', [
              h('a', {
                attrs: {
                  target: '_blank',
                  href: `/brandDetail?regNo=${this.list[params.index].regNo}&intCls=${this.list[params.index].intClsInfo.split('-')[0]}`
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
      this.queryList(1)
    },
    pageChange: function (curPage) {
      this.queryList(curPage)
    },
    handleRadioChange (checked) {
      this.intCls = checked
      // this.queryList(1)
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        keyWords: this.value,
        currentStatus: this.currentStatus,
        brandId: this.brandId,
        intCls: this.facetsGroup
      }

      return params
    },
    closeModal () {
      this.showAddBrand = false
    },
    queryList (num) {
      this.list = []
      this.$store.dispatch('TRADEMARK_LIST', this.queryListParam({'pageNum': num})).then(response => {
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
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    tableSelectChange (selected) {
      this.selectData = selected
      this.removeDisabled = !selected.length
    },
    delDomains () {
      if (!this.getDomainId.length) {
        this.$Message.error('请选择商标')
      } else {
        this.$Modal.confirm({
          title: '确认',
          content: '<p>请确认是否删除该商标？</p>',
          loading: true,
          onOk: () => {
            this.$Modal.remove()
            setTimeout(() => {
              let params = {
                id: this.getDomainId
              }
              this.$store.dispatch('DELETE_TRADEMARK', params).then(response => {
                this.loadingTable = false
                this.loadingBtn = false
                if (!response) {
                  return false
                }
                if (response.data.code === '1000') {
                  this.queryList(1)
                  this.$Message.success('删除成功')
                } else {
                  // if (response.data.code === '100') {
                  //   this.$Message.error('域名信息错误')
                  // }
                }
              }).catch(() => {})
            }, 1000)
          },
          onCancel: () => {
          }
        })
      }
    },
    getBrandList () {
      // 品牌列表
      this.$store.dispatch('FOLLOW_BRAND_LIST', {pageNum: -1, pageSize: -1}).then(response => {
        this.loadingTable = false
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.brandList = [{
            label: '全部',
            domainCount: 0,
            value: ''
          }]
          response.data.data.list.map((v) => {
            this.brandList.push({
              label: v.brandName,
              domainCount: v.domainCount,
              value: v.id
            })
          })
        } else {
        }
      }).catch(() => {})
    },
    getIntClsList () {
      // 品牌列表
      this.$store.dispatch('TRADEMARK_SORT').then(response => {
        this.loadingTable = false
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.facetsList = response.data.data
        } else {
        }
      }).catch(() => {})
    }
  },
  computed: {
    getDomainId () {
      return this.selectData.map((v) => {
        return v.id
      }).join(',')
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
    this.$nextTick(function () {
      this.queryList(1)
      this.getIntClsList()
      this.getBrandList()
    })
  },
  watch: {
  }
}
</script>

<style>
.contBrandMgmt .secMain{
  background:none;
}
.contBrandMgmt .backlist{
  cursor: pointer;
}
.contBrandMgmt .secTable2{
  background:none;
}
.contBrandMgmt .btnMore{
  border: none;
  background: none;
  padding: 0px;
}
.contBrandMgmt .btnMore span{
  color: #333;
}
.contBrandMgmt .filterWrap {
  padding: 10px 0px;
}
.contBrandMgmt .secFilter .compSelect{
  width: 100%;
}
.contBrandMgmt .secFilter .inputWrap{
  background: none;
}
.contBrandMgmt .secFilter .ivu-radio-group{
  overflow: hidden;
}
.contBrandMgmt .secFilter .ivu-radio-group-item{
  float: left;
  width: 100px;
  height: 26px;
  line-height: 26px;
  background: none;
  margin-right: 5px;
  margin-bottom: 5px;
}
.contBrandMgmt .secFilter .ivu-radio-group-item .ivu-radio{
  opacity: 0;
  width: 10px;
}
.contBrandMgmt .secFilter .ivu-radio-group-item em{
  color: #999;
}
.contBrandMgmt .secFilter .ivu-radio-wrapper-checked{
  background: #2271f4;
  color: #fff;
}
.contBrandMgmt .secFilter .ivu-radio-wrapper-checked span{
  color: #fff;
}
.contBrandMgmt .table1 .col1 i{
  font-size: 14px;
  padding-right: 3px;
  color: #fff;
}
.contBrandMgmt .table1 .col1 .unRead{
  color: #ff6a5f;
}
.contBrandMgmt .table1 .col2{
  text-align: right;
}
.contBrandMgmt .ivu-table-cell-with-expand{
  display: none;
}
.contBrandMgmt .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.contBrandMgmt .tableTool .ivu-btn{
  margin: 0 5px;
}
.contBrandMgmt .tableTool .toolBtn span{
  color:#333;
}
.contBrandMgmt .tableTool a{
  display:inline-block;
  margin: 0 10px;
}
</style>
