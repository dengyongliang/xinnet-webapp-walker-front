<template lang="pug">
.contMonitorFocus
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="showDetail=false" class="backlist">关注域名监控</span>
    <span v-show="showDetail"> > 域名监控详情</span>
    .tR
      router-link(to="/report/focus?type=focus", target="_blank")
        Button(type="primary",) 关注域名监控报告
  .secMain(v-show="!showDetail")
    h2.h2T.clear 重要监控通知
      .tR
        router-link(to="/notice/monitoring") 查看全部监控通知
    .secTable.secTable1
      Table(class="table1", :columns="columnsTop", :data="listTop", :loading="loadingTable", ref="", :show-header="false")

    h2.h2T.clear.list 监控域名列表
      //- span.time 更新时间：2019-1-1
      .tR
        comp-brand-set(@queryList="queryList({pageNum: 1})", @getBrandList="getBrandList", :list="brandList")
        comp-add-focus-domain(@queryList="queryList({pageNum: 1})", @getBrandList="getBrandList", :brandList="brandList")
    .secFilter()
      form.filterWrap(ref="exportForm", method="post" accept-charset="utf-8" :action="exportLink")
        table
          tr.row1
            td.td1
              span.n 搜索：
              .inputWrap
                <Input v-model="value" ref="domainName" placeholder="请输入域名" />
            td.td2
              span.n 网站类型：
              .inputWrap
                comp-select(:list="siteTypesList", ref="siteTypes", styles="width:100%",placeholder="全部")
            td.td3
              span.n 异常情况：
              .inputWrap
                comp-select(:list="excepTypeList",  ref="excepType", styles="width:100%", placeholder="全部")
            td.td4
              span.n 注册情况：
              .inputWrap
                comp-select(:list="regList", ref="isReg", styles="width:100%")
          tr.row2
            td.td1
              span.n 品牌：
              .inputWrap
                comp-select(:list="brandList",  ref="brandIds", styles="width:100%", placeholder="全部")
            td.td2
              span.n 添加时间：
              .inputWrap
                DatePicker(type="daterange",placeholder="全部",v-model="timesCreate",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
            td.td3
              span.n 注册时间：
              .inputWrap
                DatePicker(type="daterange",placeholder="全部",v-model="timesReg",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
            td.td4
              span.n 到期时间：
              .inputWrap
                DatePicker(type="daterange",placeholder="全部",v-model="timesExp",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%", placement="bottom-end")
          tr.row3
            td(colspan="3")
              span.n 后缀：
              .inputWrap
                comp-checkbox(:list="suffixList", ref="domainSuffixs")
            td.tdBtn
              Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
              a(href="javascript:;",class="exportOrder",@click="exportOrder") 导出表格
              input(type="hidden", name="createTimeBegin", :value="createTimeBegin")
              input(type="hidden", name="createTimeEnd", :value="createTimeEnd")
              input(type="hidden", name="applyTimeBegin", :value="applyTimeBegin")
              input(type="hidden", name="applyTimeEnd", :value="applyTimeEnd")
              input(type="hidden", name="expireTimeBegin", :value="expireTimeBegin")
              input(type="hidden", name="expireTimeEnd", :value="expireTimeEnd")
      <!-- 列表主体 -->
      .secTable.secTable2
        <Table :columns="columns" ref="selection" :data="list" :loading="loadingTable"  @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange" @on-sort-change="sortChange"></Table>
        .tableTool
          a(href="javascript:;", @click="handleSelectAll(true)") 全选
          a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
          Button(@click="delDomains", class="toolBtn") 移除关注

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20,v-show="!showDetail")

  .pageDetail(v-show="showDetail")
    comp-monitor-focus-detail(:id="id")
  <!-- 通知详情 弹窗 -->
  Modal(
    width="600",
    v-model="modelMailRecordDetail",
    class-name="modelMailRecordDetail",
    :footer-hide="true"
  )
    div(v-html="modelMailContent")
</template>

<script>
import compMonitorFocusDetail from '@/components/compMonitorFocusDetail'
import compFocusDomainTableExpand from '@/components/compFocusDomainTableExpand'
import compBrandSet from '@/components/compBrandSet'
import compAddFocusDomain from '@/components/compAddFocusDomain'
import compSelect from '@/components/compSelect'
import compCheckbox from '@/components/compCheckbox'
import moment from 'moment'
import * as actions from '@/actions/followdomain.js'

export default {
  components: {
    compMonitorFocusDetail,
    compFocusDomainTableExpand,
    compBrandSet,
    compAddFocusDomain,
    compSelect,
    compCheckbox
  },
  data () {
    return {
      id: 0,
      value: '',
      modelMailRecordDetail: false,
      modelMailContent: '',
      timesCreate: ['', ''],
      timesReg: ['', ''],
      timesExp: ['', ''],
      createTimeBegin: '',
      createTimeEnd: '',
      applyTimeBegin: '',
      applyTimeEnd: '',
      expireTimeBegin: '',
      expireTimeEnd: '',
      colllapseValue: '',
      userCompanys: [],
      showDetail: false,
      removeDisabled: true,
      exportLink: actions.FOLLOW_DOMAIN_EXPORT,
      selectData: [],
      siteTypesList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未建站',
          value: '0'
        },
        {
          label: '正规网站',
          value: '1'
        },
        {
          label: '疑似非法网站',
          value: '2'
        },
        {
          label: '域名出售站',
          value: '3'
        }
      ],
      excepTypeList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '疑似非法网站',
          value: '0'
        },
        {
          label: '指向非大陆IP',
          value: '1'
        },
        {
          label: '正在出售',
          value: '2'
        },
        {
          label: '正在抢注',
          value: '3'
        },
        {
          label: '即将到期',
          value: '4'
        }
      ],
      regList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未注册',
          value: '0'
        },
        {
          label: '已注册',
          value: '1'
        }
      ],
      brandList: [],
      statusList: [],
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
      columnsTop: [
        {
          title: '时间',
          width: 200,
          key: 'sendTime',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('i', {
                class: this.listTop[params.index].readFlag === 1 ? 'unRead' : ''
              }, '●'),
              h('span', {
              }, moment(this.listTop[params.index].sendTime).format('YYYY-MM-DD'))
            ])
          }
        },
        {
          title: '通知内容',
          key: 'title',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-alert',
                  size: '17'
                },
                style: {
                  color: '#f00',
                  margin: '0 5px 0 0',
                  display: this.listTop[params.index].sendType === 2 ? 'inline-block' : 'none'
                }
              }, ''),
              h('a', {
                style: {
                  display: 'inline-block',
                  margin: '0 100px 0 0'
                },
                on: {
                  click: () => {
                    this.handleShowDetail(this.listTop[params.index])
                  }
                }
              }, this.listTop[params.index].title)
            ])
          }
        }
      ],
      listTop: [],
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
          sortable: true,
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
          sortable: true
        },
        {
          title: '注册时间',
          width: 150,
          key: 'whoisApplyTime',
          className: 'col4',
          sortable: true
        },
        {
          title: '到期时间',
          width: 150,
          key: 'whoisExpireTime',
          className: 'col5',
          sortable: true
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
      this.queryList({pageNum: 1})
    },
    sortChange (v) {
      let orderByProperty = ''
      if (v.key === 'whoisApplyTime') {
        orderByProperty = 'applyDate'
      } else if (v.key === 'whoisExpireTime') {
        orderByProperty = 'expireDate'
      } else {
        orderByProperty = v.key
      }
      // sort.sortValue = v.order
      // console.log(sort)
      this.queryList({pageNum: 1, orderByProperty: orderByProperty, orderByType: v.order})
    },
    pageChange: function (curPage) {
      this.queryList({pageNum: curPage})
    },
    showDetailFun (id) {
      this.id = id
      this.showDetail = true
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true
      // console.log("=======================================================")
      // console.log(this.$refs.siteTypes)
      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        domainName: this.value,
        siteTypes: this.$refs.siteTypes.value,
        excepType: this.$refs.excepType.value,
        isReg: this.$refs.isReg.value,
        brandIds: this.$refs.brandIds.value,
        domainSuffixs: this.$refs.domainSuffixs.value.join(',').replace(/,?other,?/g, ''),
        otherSuffixs: this.$refs.domainSuffixs.value.join(',').indexOf('other') >= 0 ? '1' : '0',
        createTimeBegin: this.timesCreate[0] !== '' ? moment(this.timesCreate[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        createTimeEnd: this.timesCreate[1] !== '' ? moment(this.timesCreate[1]).format('YYYY-MM-DD') + ' 23:59:59' : '',
        applyTimeBegin: this.timesReg[0] !== '' ? moment(this.timesReg[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        applyTimeEnd: this.timesReg[1] !== '' ? moment(this.timesReg[1]).format('YYYY-MM-DD') + ' 23:59:59' : '',
        expireTimeBegin: this.timesExp[0] !== '' ? moment(this.timesExp[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        expireTimeEnd: this.timesExp[1] !== '' ? moment(this.timesExp[1]).format('YYYY-MM-DD') + ' 23:59:59' : '',
        orderByProperty: '',
        orderByType: ''
      }
      Object.assign(params, obj)
      console.log('=======================================================')
      console.log(params)
      console.log('=======================================================')
      return params
    },
    queryList (obj) {
      this.$store.dispatch('FOLLOW_DOMAIN_LIST', this.queryListParam(obj)).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.list = response.data.data.list.map((v) => {
            if (v.excepInfo.length) {
              v._expanded = true
            }
            return v
          })
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
    handleShowDetail (item) {
      this.$store.dispatch('MAIL_RECORD_DETAIL', {id: item.id}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.modelMailContent = response.data.data.detail
          // 设为已读
          this.$store.dispatch('MAIL_RECORD_READ', {id: item.id}).then(response => {
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              // 查找 所在 索引值
              let idx = this.listTop.findIndex((item2) => (item2.id === item.id))
              // 设为已读
              this.listTop[idx].readFlag = 2
            } else {
            }
          }).catch(() => {})
        } else {
        }
      }).catch(() => {})
      this.modelMailRecordDetail = true
    },
    exportOrder () {
      this.$refs.exportForm.submit()
    },
    delDomains () {
      if (!this.getDomainId.length) {
        this.$Message.error('请选择域名')
      } else {
        this.$Modal.confirm({
          title: '确认',
          content: '<p>请确认是否要删除选中域名！</p>',
          loading: true,
          onOk: () => {
            this.$Modal.remove()
            setTimeout(() => {
              let params = {
                id: this.getDomainId
              }
              this.$store.dispatch('DELETE_DOMAIN', params).then(response => {
                this.loadingTable = false
                this.loadingBtn = false
                if (!response) {
                  return false
                }
                if (response.data.code === '1000') {
                  this.queryList({pageNum: 1})
                  this.$Modal.info({
                    title: '提示',
                    content: `<p>删除成功：${response.data.successCount}个</p><p>删除失败：${response.data.faildCount}个</p>`
                  })
                } else {
                  if (response.data.code === '100') {
                    this.$Message.error('域名信息错误')
                  }
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
    }
  },
  computed: {
    getDomainId () {
      return this.selectData.map((v) => {
        return v.id
      }).join(',')
    }
  },
  beforeMount () {
    // 监控通知列表
    this.$store.dispatch('MAIL_MANAGE_TOP').then(response => {
      this.loadingTable = false
      this.loadingBtn = false
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.listTop = response.data.data.list
      } else {
      }
    }).catch(() => {})
  },
  mounted () {
    this.$nextTick(function () {
      // 域名列表
      this.queryList({pageNum: 1})
      // 监控通知
      this.getBrandList()
      let id = this.$route.params.id
      if (id) {
        this.showDetailFun(id)
      }
    })
  }
  // ,
  // watch: {
  //   brandList: {
  //     handler (val, oldVal) {
  //       this.brandList(val)
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style>
.contMonitorFocus .secMain{
  background:none;
}
.contMonitorFocus .backlist{
  cursor: pointer;
}
.contMonitorFocus .secTable1{
  margin-bottom: 20px;
}
.contMonitorFocus .secTable2{
  background:none;
}
.contMonitorFocus .h2T{
  font-weight: normal;
  padding: 20px 0;
}
.contMonitorFocus .h2T .tR{
  float: right;
  font-size: 12px;
}
.contMonitorFocus .h2T .tR .ivu-input-wrapper{
  width: 200px;
  margin: 0 10px;
}
.contMonitorFocus .h2T .tR a{
  color: #256ff4;
}
.contMonitorFocus .h2T .tR button{
  margin-left: 10px;
}
.contMonitorFocus .h2T.list{
  border-bottom: 1px solid #ededef;
  padding-bottom: 10px;
  margin-bottom: 0px;
  line-height: 32px;
}
.contMonitorFocus .h2T.list .time{
  display: inline-block;
  font-size: 12px;
  margin-left: 20px;
  color: #999;
}
.contMonitorFocus .filterWrap {
  padding: 10px 0px;
}
.contMonitorFocus .secFilter .compSelect{
  width: 100%;
}
.contMonitorFocus .secFilter tr.row3>td:nth-child(1) .inputWrap{
  background: none;
}
.contMonitorFocus .secFilter .compCheckbox{
  padding: 8px 0;
}
.contMonitorFocus .secFilter .tdBtn button{
  margin-right: 10px;
}
.contMonitorFocus .table1 .col1 i{
  font-size: 14px;
  padding-right: 3px;
  color: #fff;
}
.contMonitorFocus .table1 .col1 .unRead{
  color: #ff6a5f;
}
.contMonitorFocus .table1 .col2{
  text-align: right;
}
.contMonitorFocus .ivu-table-cell-with-expand{
  display: none;
}
.contMonitorFocus .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.contMonitorFocus .tableTool .ivu-btn{
  margin: 0 5px;
}
.contMonitorFocus .tableTool .toolBtn span{
  color:#333;
}
.contMonitorFocus .tableTool a{
  display:inline-block;
  margin: 0 10px;
}
</style>
