<template lang="pug">
.trademarkSimilarDetail
  <!-- 标题区 -->
  h1.pageTitle.clear
    span
      router-link.text(to="/monitor/brand") 商标监控
      span  -近似商标监控
  .secMain()
    .secT
      strong {{details.keyword}}
      p
        span.item 所属品牌：{{details.brandName}}
        span.item <Tooltip max-width="200" content="申请主体提交的商标，不会进入到商标近似监控的统计范围" placement="bottom"><Icon type="ios-alert-outline" /></Tooltip> 排除申请主体：
          Poptip(trigger="hover", content="content", placement="bottom") {{details.excludeApplicant.split(',')[0]}}
            <Icon type="ios-menu" style="color:#666;font-size: 15px;font-weight:200" />
            div(slot="content")
              p(v-for="item in details.excludeApplicant.split(',')") {{item}}
        span.item 全部公告期内近似商标/高度近似商标：{{details.similarCount}}/<em style="color: #f90a0d">{{details.heightSimilarCount}}</em>
    .secFilter()
      form.filterWrap(ref="exportForm")
        table
          tr.row1
            td(colspan="4")
              span.n 国际分类：
              .inputWrap
                RadioGroup(v-model="facetsGroup", @on-change="handleRadioChange")
                  Radio(label="", key="0") 全部
                  Radio(v-for="item in facetsList", :label="item.intClass", :key="item.id") {{item.intClsInfo}}
          tr.row2
            td(colspan="4")
              span.n 公告期数：
              .inputWrap
                RadioGroup(v-model="issueNumberGroup", @on-change="handleRadioChange")
                  Radio(label="", key="0") 全部
                  Radio(v-for="item in issueNumberList", :label="item.issueNumber", :key="item.issueNumber") {{item.issueNumber}}({{item.similarCount}}/<em>{{item.heightSimilarCount}}</em>)

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
    comp-trademark-focus(ref="compTrademarkFocus", type="similar", :ids="ids", @queryList="queryList")
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
      issueNumberGroup: '',
      issueNumberList: [],
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
      columns: [
        // {
        //   type: 'selection',
        //   width: 50,
        //   align: 'center'
        // },
        {
          title: '近似度',
          key: 'similar_degree',
          className: 'col1',
          sortable: 'custom',
          width: 90,
          render: (h, params) => {
            return h('span', {
              // attrs: {
              //   src: `http://tmpic.tmkoo.com/${this.list[params.index].tmImg}-m`
              // },
              style: {
                'display': 'inline-block',
                'width': '35px',
                'height': '35px',
                'line-height': '36px',
                'vertical-align': 'middle',
                'text-align': 'center',
                'background': this.list[params.index].similarDegree * 1 <= 20 ? '#4ac77f' : ((this.list[params.index].similarDegree * 1 <= 40 && this.list[params.index].similarDegree > 21) ? '#7479d7' : ((this.list[params.index].similarDegree * 1 <= 60 && this.list[params.index].similarDegree > 41) ? '#2071f6' : ((this.list[params.index].similarDegree * 1 <= 80 && this.list[params.index].similarDegree > 61) ? '#fe9242' : '#ff4040'))),
                'border-radius': '100%',
                'color': '#fff'
              }
            }, this.list[params.index].similarDegree)
          }
        },
        {
          title: '商标图样',
          key: 'tmImg',
          className: 'col2',
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
          title: '公告批次',
          key: 'issueNumber',
          className: 'col7'
        },
        {
          title: '申请时间',
          key: 'appDate',
          className: 'col8',
          sortable: 'custom'
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
      details: {},
      order: 'similar_degree',
      orderType: 'desc',
      ids: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchListData () {
      console.log()
    },
    sortChange (v) {
      console.log(v)
      this.order = v.key === 'appDate' ? 'app_date' : v.key
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
    handleShowModalFocus (params) {
      this.ids = [params.id]
      this.$refs.compTrademarkFocus.handleShowModal()
    },
    queryDetail () {
      this.$store.dispatch('SIMILAR_TRADEMARK_DETAIL', this.queryListParam({id: this.$route.params.id})).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.details = response.data.data.similar
          this.facetsList = response.data.data.tradeMarks
          this.issueNumberList = response.data.data.issues
        } else {
        }
      }).catch(() => {})
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        id: this.$route.params.id,
        issueNumber: this.issueNumberGroup,
        intClass: this.facetsGroup,
        order: this.order,
        orderType: this.orderType
      }
      console.error(params)
      return params
    },
    queryList (num) {
      this.list = []
      this.$store.dispatch('SIMILAR_TRADEMARK_LIST', this.queryListParam({pageNum: num})).then(response => {
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
    // getIntClsList () {
    //   // 品牌列表
    //   this.$store.dispatch('TRADEMARK_SORT').then(response => {
    //     this.loadingTable = false
    //     this.loadingBtn = false
    //     if (!response) {
    //       return false
    //     }
    //     if (response.data.code === '1000') {
    //       this.facetsList = response.data.data
    //     } else {
    //     }
    //   }).catch(() => {})
    // }
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
      this.queryDetail()
      this.queryList(1)
      // this.getIntClsList()
    })
  },
  watch: {
  }
}
</script>
<style>
.trademarkSimilarDetail .pageTitle a{
  color: #2271f4;
}
.trademarkSimilarDetail .secT{
  padding: 20px;
  background: #fff;
}
.trademarkSimilarDetail .secT strong{
  font-size: 24px;
  color: #333;
  font-weight: normal;
  display: block;
  margin-bottom: 23px;
}
.trademarkSimilarDetail .secT p{
  font-size: 12px;
  color: #333;
}
.trademarkSimilarDetail .secT p span{
  display: inline-block;
  margin-right: 95px;
  color: #666666;
}
.trademarkSimilarDetail .secT p span .ivu-icon{
  font-size: 17px;
  color: #4db1ff;
  font-weight: 600;
}
.trademarkSimilarDetail .secFilter{
  padding-top: 0px;
}
.trademarkSimilarDetail .filterWrap tr:nth-child(1) td{
  border-bottom: 1px dashed #dcdbd9;
}
.trademarkSimilarDetail .filterWrap tr:nth-last-child(1) td{
  padding-top: 10px;
  padding-bottom: 0px;
}
.trademarkSimilarDetail .secMain {
    background: none!important;
}
.trademarkSimilarDetail .ivu-tabs-bar{
  background: #fff;
  margin-bottom: 0px;
}
.trademarkSimilarDetail .ivu-tabs-bar .ivu-tabs-tab{
  height: 50px;
  line-height: 50px;
  padding: 0 30px;
  /* margin: 0px; */
}
/* .trademarkSimilarDetail .btnTop{
  display: none;
} */
.trademarkSimilarDetail .btnMore{
  border: none;
  background: none;
  padding: 0px;
}
.trademarkSimilarDetail .btnMore span{
  color: #333;
}
.trademarkSimilarDetail .secFilter{
  background: #ecf3fb;
  padding-right: 20px;
}
.trademarkSimilarDetail .filterWrap {
  padding: 10px 0px;
}
.trademarkSimilarDetail .filterWrap .td1,
.trademarkSimilarDetail .filterWrap .td2,
.trademarkSimilarDetail .filterWrap .td3{
  width: 30%;
}
.trademarkSimilarDetail .filterWrap .tdBtn{
  width: 10%;
}

.trademarkSimilarDetail .secFilter .compSelect{
  width: 100%;
}
.trademarkSimilarDetail .secFilter .compCheckbox{
  padding: 8px 0;
}
.trademarkSimilarDetail .secFilter .inputWrap{
  background: none;
}
.trademarkSimilarDetail .secFilter .inputWrap{
  background: none;
}
.trademarkSimilarDetail .secFilter .ivu-radio-group{
  overflow: hidden;
}
.trademarkSimilarDetail .secFilter .ivu-radio-group-item{
  float: left;
  width: 100px;
  height: 26px;
  line-height: 26px;
  background: none;
  margin-right: 5px;
  margin-bottom: 2.5px;
  margin-top: 2.5px;
}
.trademarkSimilarDetail .secFilter .ivu-radio-group-item .ivu-radio{
  opacity: 0;
  width: 10px;
}
.trademarkSimilarDetail .secFilter .ivu-radio-group-item em{
  color: #ff4040;
}
.trademarkSimilarDetail .secFilter .ivu-radio-wrapper-checked{
  background: #2271f4;
  color: #fff;
}
.trademarkSimilarDetail .secFilter .ivu-radio-wrapper-checked span{
  color: #fff;
}
.trademarkSimilarDetail .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.trademarkSimilarDetail .tableTool .ivu-btn{
  margin: 0 5px;
}
.trademarkSimilarDetail .tableTool .toolBtn span{
  color:#333;
}
.trademarkSimilarDetail .tableTool a{
  display:inline-block;
  margin: 0 10px;
}

</style>
