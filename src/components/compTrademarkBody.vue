<template lang="pug">
  div
    .secFilter()
      form.filterWrap(ref="exportForm")
        table
          tr.row1
            td.td1
            td.td2
              span.n 申请主体：
              .inputWrap
                <Input v-model="value" ref="applicantCn" placeholder="" />
            td(colspan="2").tdBtn
              Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
              Button(type="default", @click="handleShowModal",:loading="loadingBtn", style="margin-left: 5px") 添加监控主体

      <!-- 列表主体 -->
    .secTable.secTable2
      <Table :columns="columns" ref="selection" :data="list" :loading="loadingTable"  @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange" @on-sort-change="sortChange"></Table>
      //- .tableTool
      //-   a(href="javascript:;", @click="handleSelectAll(true)") 全选
      //-   a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
      //-   Button(@click="handleCancelFollow", class="toolBtn") 取消监控

    <!-- 翻页区 -->
    Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")
    comp-trademark-body-add(ref="compTrademarkBodyAdd", @queryList="queryList")
</template>

<script>
import { mapState } from 'vuex'
import compSelect from '@/components/compSelect'
import compTrademarkBodyAdd from '@/components/compTrademarkBodyAdd'

export default {
  components: {
    compSelect,
    compTrademarkBodyAdd
  },
  props: {

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
          title: '申请主体',
          key: 'applicantCn',
          className: 'col1'
        },
        {
          title: '总商标数',
          key: 'trademarkTotal',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.list[params.index].trademarkTotal + '个')
            ])
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('a', {
                attrs: {
                  target: '_blank',
                  href: `/monitor/bodyTrademarkDetail/monitorBodyId/${this.list[params.index].id}/applicantCn/${this.list[params.index].applicantCn}`
                }
              }, '详情'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.handleCancelFollow(this.list[params.index])
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
                }, '取消监控')
              ])
            ])
          }
        }
      ],
      list: [],
      selectData: [],
      modalshow: false,
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
    handleShowModal () {
      this.$refs.compTrademarkBodyAdd.handleShowModal()
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
            this.$store.dispatch('BODY_TRADEMARK_UNFOLLOW', params).then(response => {
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
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        applicantCn: this.value
      }
      return params
    },
    queryList (num) {
      this.list = []
      this.$store.dispatch('BODY_TRADEMARK_SEARCH', this.queryListParam({pageNum: num})).then(response => {
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
