<template lang="pug">
  div
    .secFilter()
      form.filterWrap(ref="exportForm")
        table
          tr.row1
            td.td1
              span.n 搜索商标：
              .inputWrap
                <Input v-model="value" ref="keyWords" placeholder="关键词" />
            td.td2
              span.n 所属品牌：
              .inputWrap
                comp-select(:list="[{label: '全部',value: ''},...brandList]", ref="brandId", styles="width:100%", placeholder="全部")
            td(colspan="2").tdBtn
              Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
              Button(type="default", @click="handleShowModal('insert')",:loading="loadingBtn", style="margin-left: 5px") 添加关键词
      <!-- 列表主体 -->
    .secTable.secTable2
      <Table :columns="columns" ref="selection" :data="list" :loading="loadingTable"  @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange" @on-sort-change="sortChange"></Table>
      //- .tableTool
      //-   a(href="javascript:;", @click="handleSelectAll(true)") 全选
      //-   a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
      //-   Button(@click="handleCancelFollow", class="toolBtn") 取消监控

    <!-- 翻页区 -->
    Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")
    comp-trademark-similar-keyword-insert(ref="compTrademarkSimilarKeywordInsert", :brandList="brandList", @queryList="queryList", :insert="insert", :monitorType="monitorType", :keyWords="keyWords", :monitorCondition="monitorCondition", :intClasses="intClasses", :brandId="brandId", :excludeApplicant="excludeApplicant",:id="id")
</template>

<script>
import { mapState } from 'vuex'
import compSelect from '@/components/compSelect'
import compTrademarkSimilarKeywordInsert from '@/components/compTrademarkSimilarKeywordInsert'
export default {
  components: {
    compSelect,
    compTrademarkSimilarKeywordInsert
  },
  props: {
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
      columns: [
        // {
        //   type: 'selection',
        //   width: 50,
        //   align: 'center'
        // },
        {
          title: '商标关键词',
          key: 'keyword',
          className: 'col1'
        },
        {
          title: '排除申请主体',
          key: 'excludeApplicant',
          className: 'col2',
          render: (h, params) => {
            var newArr = []
            params.row.excludeApplicant.split(',').forEach((a, index)=>{
              newArr.push(h('div',[
                h('span', a)
              ]))
            })
            return h('div', [
              h('Poptip', {
                props: {
                  placement: 'bottom',
                  trigger: 'hover'
                },
                on: {
                  // click: () => {
                  //   this.handleCancelFollow(this.list[params.index])
                  // }
                }
              }, [
                h('span', {
                }, params.row.excludeApplicant.split(',')[0]),
                h('Icon', {
                  props: {
                    type: 'ios-menu'
                  },
                  style: {
                    'font-size': '15px'
                  }
                }, ''),
                h('div', {
                  slot: 'content'
                }, newArr)
              ])
            ])
          }
        },
        {
          title: '所属品牌',
          key: 'brandName',
          className: 'col3'
        },
        {
          title: '监控类别',
          key: 'intClsInfo',
          width: 150,
          className: 'col4',
          render: (h, params) => {
            var newArr = []
            params.row.intClsInfo.forEach((a, index)=>{
              newArr.push(h('div',[
                h('span', a)
              ]))
            })
            return h('div', [
              h('Poptip', {
                props: {
                  placement: 'bottom',
                  trigger: 'hover'
                },
                on: {
                  // click: () => {
                  //   this.handleCancelFollow(this.list[params.index])
                  // }
                }
              }, [
                h('span', {
                }, params.row.intClsInfo[0]),
                h('Icon', {
                  props: {
                    type: 'ios-menu'
                  },
                  style: {
                    'font-size': '15px'
                  }
                }, ''),
                h('div', {
                  slot: 'content',
                  class: 'intClsInfoDiv'
                }, newArr)
              ])
            ])
          }
        },
        {
          title: '公告期内近似',
          width: 150,
          key: 'similarCount',
          className: 'col5'
        },
        {
          title: '高度近似',
          width: 150,
          key: 'heightSimilarCount',
          className: 'col6'
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('a', {
                attrs: {
                  target: '_blank',
                  href: `/monitor/similarTrademarkDetail/id/${this.list[params.index].id}`
                }
              }, '详情'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.handleShowModal('update', this.list[params.index])
                  }
                }
              }, '设置'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.handleCancelFollow(this.list[params.index])
                  }
                }
              }, '取消监控')
            ])
          }
        }
      ],
      list: [],
      selectData: [],
      id: '',
      insert: false,
      monitorType: '',
      keyWords: '',
      monitorCondition: '',
      intClasses: [],
      brandId: '',
      excludeApplicant: '',
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
            this.$store.dispatch('SIMILAR_TRADEMARK_UNFOLLOW', params).then(response => {
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
    handleShowModal (type, param) {
      if (type === 'insert') {
        this.insert = true
        this.monitorType = ''
        this.keyWords = ''
        this.monitorCondition = ''
        this.intClasses = []
        this.brandId = ''
        this.excludeApplicant = ''
      } else {
        this.id = param.id + ''
        this.insert = false
        this.$store.dispatch('SIMILAR_TRADEMARK_QUERY', {id: param.id}).then(response => {
          this.loadingBtn = false
          this.loadingTable = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.monitorType = response.data.data.monitorType + ''
            this.keyWords = response.data.data.keyword
            this.monitorCondition = response.data.data.monitorCondition + ''
            this.intClasses = response.data.data.intClasses.split(',')
            this.brandId = response.data.data.brandId + ''
            this.excludeApplicant = response.data.data.excludeApplicant.replace(/,/gm, '\n')
          } else {
          }
        }).catch(() => {})
      }
      this.$refs.compTrademarkSimilarKeywordInsert.handleShowModal()
    },
    handleHideModal () {
      this.show = false
    },
    showDetailFun (data) {
      this.$router.push({path: '/monitor/brand', query: { id: '123', issueNumber: '456', intClass: '789', order: 'similar_degree', orderType: 'desc', pageNum: 1, pageSize: 20 }})
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        keyWords: this.value,
        brandId: this.$refs.brandId.value
      }
      return params
    },
    queryList (num) {
      this.list = []
      this.$store.dispatch('SIMILAR_TRADEMARK_SEARCH', this.queryListParam({pageNum: num})).then(response => {
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
    })
  },
  watch: {
  }
}
</script>
<style>

</style>
