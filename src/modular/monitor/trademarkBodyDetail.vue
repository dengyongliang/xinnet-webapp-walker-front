<template lang="pug">
.contTrademarkBodyDetail
  <!-- 标题区 -->
  h1.pageTitle.clear
    router-link.text(to="/monitor/brand") 商标监控
    span  -{{applicantCn}}
  .secMain()
    .secFilter()
      form.filterWrap(ref="exportForm")
        table
          tr.row1
            td.td1
              span.n 搜索商标：
              .inputWrap
                <Input v-model="value" ref="keyword" placeholder="商标名称/注册号/申请主体" />
            td.td2
              //- span.n 商标状态：
              //- .inputWrap
              //-   comp-select(:list="currentStatusList", ref="siteTypes", styles="width:100%",placeholder="全部")
            td.td3

            td.tdBtn
              Button(type="primary", @click="searchListData()",:loading="loadingBtn") 查询
          tr.row2
            td(colspan="4")
              span.n 国际分类：
              .inputWrap
                RadioGroup(v-model="facetsGroup", @on-change="handleRadioChange")
                  Radio(label="", key="0") 全部
                  Radio(v-for="item in facetsList", :label="item.code", :key="item.id") {{item.code}} {{item.codeName}}

    <!-- 列表主体 -->
    .secTable.secTable2
      <Table :columns="columns" ref="selection" :data="list" :loading="loadingTable"  @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange" @on-sort-change="sortChange"></Table>
      //- .tableTool
      //-   a(href="javascript:;", @click="handleSelectAll(true)") 全选
      //-   a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
      //-   Button(@click="handleCancelFollow", class="toolBtn") 取消关注

    <!-- 翻页区 -->
    Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")
    comp-trademark-notify-set(ref="compTrademarkNotifySet")
    comp-trademark-focus(ref="compTrademarkFocus", type="body", :regNo="regNo", :intCls="intCls", @queryList="queryList")
</template>

<script>
import { mapState } from 'vuex'
import compSelect from '@/components/compSelect'
import compTrademarkNotifySet from '@/components/compTrademarkNotifySet'
import compTrademarkFocus from '@/components/compTrademarkFocus'
export default {
  components: {
    compSelect,
    compTrademarkNotifySet,
    compTrademarkFocus
  },
  props: {

  },
  data () {
    return {
      value: '',
      loadingBtn: false,
      loadingTable: false,
      facetsGroup: '',
      facetsList: [],
      columns: [
        // {
        //   type: 'selection',
        //   width: 50,
        //   align: 'center'
        // },
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
          className: 'col7',
          sortable: 'custom'
        },
        {
          title: '状态',
          key: 'status',
          className: 'col8'
        },
        {
          title: '操作',
          key: 'operate',
          width: 150,
          className: 'operate',
          render: (h, params) => {
            return h('div', [
              h('a', {
                attrs: {
                  target: '_blank',
                  href: `/brandDetail?regNo=${this.list[params.index].regNo}&intCls=${this.list[params.index].intClsInfo.split('-')[0]}`
                }
              }, '详情'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    if (this.list[params.index].whetherFollow) {
                      this.handleCancelFollow(this.list[params.index])
                    } else {
                      this.handleShowModalFocus(this.list[params.index])
                    }
                  }
                }
              }, [
                h('Icon', {
                  props: {
                    type: this.list[params.index].whetherFollow ? 'md-star' : 'ios-star-outline',
                  },
                  style: {
                    'color': this.list[params.index].whetherFollow ? '#f6bb42' : '#666',
                    'font-size': '15px',
                    'margin-top': '-2px'
                  }
                }, '*'),
                h('span', {
                  attrs: {
                  },
                  style: {
                    'color': '#666'
                  }
                }, this.list[params.index].whetherFollow ? '取消关注' : '关注商标')
              ])
            ])
          }
        }
      ],
      list: [],
      selectData: [],
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
          label: '无效',
          value: '无效',
          key: 5
        }
      ],
      regNo: '',
      intCls: '',
      applicantCn: '',
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
    sortChange (v) {
      console.log(v)
      this.orderType = v.order === 'normal' ? '' : v.order
      this.queryList(1)
    },
    handleRadioChange (checked) {
      this.queryList(1)
    },
    pageChange: function (curPage) {
      this.queryList(curPage)
    },
    handleSelectAll () {
      this.$refs.selection.selectAll(status)
    },
    handleCancelFollow (param) {
      let params = {}
      params.ids = [param.id]
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否要取消选中项关注！</p>',
        loading: true,
        onOk: () => {
          this.$Modal.remove()
          setTimeout(() => {
            this.$store.dispatch('FOLLOW_TRADEMARK_UNFOLLOW', params).then(response => {
              if (!response) {
                return false
              }
              if (response.data.code === '1000') {
                this.$Message.success('取消成功')
                this.queryList(1)
              } else {
                this.$Message.error(response.data.msg)
              }
            }).catch(() => {})
          }, 1000)
        },
        onCancel: () => {
        }
      })
    },
    tableSelectChange (selected) {
      this.selectData = selected
    },
    handleShowModal () {
      this.$refs.compTrademarkNotifySet.handleShowModal()
    },
    handleShowModalFocus (v) {
      this.regNo = v.regNo
      this.intCls = v.intClass
      this.$refs.compTrademarkFocus.handleShowModal()
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        monitorBodyId: this.$route.params.monitorBodyId,
        keyWords: this.value,
        intClass: this.facetsGroup,
        orderType: this.orderType
      }
      return params
    },
    queryList (num) {
      this.list = []
      this.$store.dispatch('BODY_TRADEMARK_LIST', this.queryListParam({pageNum: num})).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.list = response.data.data
          this.page.pageItems = response.data.totalNum
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
      })
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
      this.applicantCn = this.$route.params.applicantCn
      this.queryList(1)
      this.getIntClsList()
    })
  },
  watch: {
  }
}
</script>
<style>
.contTrademarkBodyDetail .pageTitle a{
  color: #2271f4;
}
.contTrademarkBodyDetail .secFilter{
  padding-top: 5px;
}
.contTrademarkBodyDetail .secMain {
    background: none!important;
}
.contTrademarkBodyDetail .ivu-tabs-bar{
  background: #fff;
  margin-bottom: 0px;
}
.contTrademarkBodyDetail .ivu-tabs-bar .ivu-tabs-tab{
  height: 50px;
  line-height: 50px;
  padding: 0 30px;
  /* margin: 0px; */
}
/* .contTrademarkBodyDetail .btnTop{
  display: none;
} */
.contTrademarkBodyDetail .btnMore{
  border: none;
  background: none;
  padding: 0px;
}
.contTrademarkBodyDetail .btnMore span{
  color: #333;
}
.contTrademarkBodyDetail .secFilter{
  /* background: #ecf3fb; */
  padding-top: 10px;
  padding-right: 20px;
}
.contTrademarkBodyDetail .filterWrap {
  padding: 10px 0px;
}
.contTrademarkBodyDetail .filterWrap .td1,
.contTrademarkBodyDetail .filterWrap .td2,
.contTrademarkBodyDetail .filterWrap .td3{
  width: 30%;
}
.contTrademarkBodyDetail .filterWrap .tdBtn{
  width: 10%;
}

.contTrademarkBodyDetail .secFilter .compSelect{
  width: 100%;
}
.contTrademarkBodyDetail .secFilter .compCheckbox{
  padding: 8px 0;
}
.contTrademarkBodyDetail .secFilter .inputWrap{
  background: none;
}
.contTrademarkBodyDetail .secFilter .inputWrap{
  background: none;
}
.contTrademarkBodyDetail .secFilter .ivu-radio-group{
  overflow: hidden;
}
.contTrademarkBodyDetail .secFilter .ivu-radio-group-item{
  float: left;
  width: 100px;
  height: 26px;
  line-height: 26px;
  background: none;
  margin-right: 5px;
  margin-bottom: 2.5px;
  margin-top: 2.5px;
}
.contTrademarkBodyDetail .secFilter .ivu-radio-group-item .ivu-radio{
  opacity: 0;
  width: 10px;
}
.contTrademarkBodyDetail .secFilter .ivu-radio-group-item em{
  color: #999;
}
.contTrademarkBodyDetail .secFilter .ivu-radio-wrapper-checked{
  background: #2271f4;
  color: #fff;
}
.contTrademarkBodyDetail .secFilter .ivu-radio-wrapper-checked span{
  color: #fff;
}
.contTrademarkBodyDetail .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.contTrademarkBodyDetail .tableTool .ivu-btn{
  margin: 0 5px;
}
.contTrademarkBodyDetail .tableTool .toolBtn span{
  color:#333;
}
.contTrademarkBodyDetail .tableTool a{
  display:inline-block;
  margin: 0 10px;
}
</style>
