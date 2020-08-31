<template lang="pug">
  div
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
                comp-select(:list="currentStatusList", ref="siteTypes", styles="width:100%",placeholder="全部")
            td.td3
              span.n 所属品牌：
              .inputWrap
                comp-select(:list="[{label: '全部',value: ''},...brandList]", ref="brandId", styles="width:100%", placeholder="全部")
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
      .tableTool
        a(href="javascript:;", @click="handleSelectAll(true)") 全选
        a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
        Button(@click="handleCancelFollow('batch')", class="toolBtn") 取消关注

    <!-- 翻页区 -->
    Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")

</template>

<script>
import { mapState } from 'vuex'
import compSelect from '@/components/compSelect'
export default {
  components: {
    compSelect
  },
  props: {
    onClose: {
      type: Function
    },
    currentStatusList: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    brandList: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
      value: '',
      loadingBtn: false,
      loadingTable: false,
      facetsGroup: '',
      facetsList: [],
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
                    this.handleCancelFollow('single', this.list[params.index])
                  }
                }
              }, [
                h('Icon', {
                  props: {
                    type: 'md-star'
                  },
                  style: {
                    'color': '#f6bb42',
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
                }, '取消关注')
              ])
            ])
          }
        }
      ],
      list: [],
      selectData: [],
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
    sortChange () {

    },
    handleRadioChange (checked) {
      this.intCls = checked
      this.queryList(1)
    },
    pageChange: function (curPage) {
      this.queryList(curPage)
    },
    handleSelectAll () {
      this.$refs.selection.selectAll(status)
    },
    handleCancelFollow (type, param) {
      const params = {}
      if (type === 'single') {
        params.ids = [param.id]
      } else {
        params.ids = this.getDomainId
        if (!this.getDomainId.length) {
          this.$Message.error('请选择')
          return false
        }
      }
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否要取消选中项关注！</p>',
        loading: true,
        onOk: () => {
          this.$Modal.remove()
          setTimeout(() => {
            console.log(params)
            this.$store.dispatch('FOLLOW_TRADEMARK_UNFOLLOW', params).then(response => {
              if (!response) {
                return false
              }
              if (response.data.code === '1000') {
                this.$Message.success('取消监控成功')
                this.queryList(1)
              } else {
                if (response.data.code === '400') {
                  this.$Message.error('操作记录已存在')
                } else if (response.data.code === '600') {
                  this.$Message.error('未知错误')
                } else if (response.data.code === '700') {
                  this.$Message.error('TMKOO接口错误')
                } else {
                  this.$Message.error('操作失败')
                }
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
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        keyWords: this.value,
        brandId: this.$refs.brandId.value,
        intCls: this.facetsGroup,
        currentStatus: this.$refs.siteTypes.value
      }
      console.error(params)
      return params
    },
    queryList (num) {
      this.list = []
      this.$store.dispatch('FOLLOW_TRADEMARK_SEARCH', this.queryListParam({pageNum: num})).then(response => {
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
      this.queryList(1)
      this.getIntClsList()
    })
  },
  watch: {
  }
}
</script>
<style>

</style>
