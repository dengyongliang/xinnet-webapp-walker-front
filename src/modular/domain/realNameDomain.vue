<template lang="pug">
.contRealNameDomain
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="toBackList" class="backlist">域名实名制管理</span>
    <span v-show="showSubmit"> > 实名信息详情</span>
    .tR(v-show="!showSubmit")
      span 搜索
      Input(style="width:200px",placeholder="请输入域名/域名所有者", name="", v-model.trim="value")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
  .secMain
    Alert.alert1(type="warning", show-icon) 温馨提示：
      Icon(custom="i-icon i-icon-notice_", size="16", slot="icon")
      template(slot="desc") 1、请准确上传与域名所有人证件号码一致的扫描件或照片，证件需要在有效期内。<br />2、请准确选择域名所有人证件类型，避免由于证件类型不符影响网站备案审核。<br />3、可使用已保存模板信息快速填充，但仍需进行实名审核。

    .filter(v-show="!showSubmit")
      comp-aside-filter(ref="asideFilter",:show="[3,4,11,12,13]", @asideFilterSubmit="asideFilterSubmit", @asideFilterReset="asideFilterReset", :total="page.pageItems", :filterTitle="filterTitle")
    <!-- 列表主体 -->
    .secTable(v-show="!showSubmit")
      <Table :columns="columns" :data="list" :loading="loadingTable" ref="selection" @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange"></Table>
      .tableTool
        a(href="javascript:;", @click="handleSelectAll(true)") 全选
        a(href="javascript:;", @click="handleSelectAll(false)") 取消全选
        Button(@click="batchRealName", :disabled="btnRealNameDisabled") 批量实名
        Button(@click="batchUpdate", :disabled="btnUpdateStatusDisabled") 更新状态

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20", v-show="!showSubmit")

  <!-- 提交资料 -->
  comp-domain-real-name-detail(
    v-if="showSubmit",
    :templateList="templateList",
    :rnvcStatus = "rnvcStatus",
    :organizeNameCn = "organizeNameCn",
    :domainIds = "getDomainId",
    @refreshData = "searchListData"
  )
</template>

<script>
import { mapState } from 'vuex'
import compDomainRealNameDetail from '@/components/compDomainRealNameDetail'
import compAsideFilter from '@/components/compAsideFilter'
import moment from 'moment'
export default {
  components: {
    compDomainRealNameDetail,
    compAsideFilter
  },
  data () {
    return {
      value: '',
      refresh: false,
      filterTitle: '实名制管理',
      selectData: [],
      templateObj: {},
      organizeNameCn: '',
      rnvcStatus: 0,
      btnRealNameDisabled: true,
      btnUpdateStatusDisabled: true,
      loadingTable: true,
      loadingBtn: false,
      templateList: [],
      list: [],
      userCompanys: [],
      domainIds: '',
      showSubmit: false,
      asideFilterResult: {
        groupIds: '',
        serviceState: '',
        rnvcStatus: '',
        dnvcStatus: '',
        verifyDay: '',
        verifyTimeBegin: '',
        verifyTimeEnd: ''
      },
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
          title: '域名所有者',
          key: 'organizeNameCn',
          className: 'col2'
        },
        {
          title: '联系邮箱',
          key: 'userEmail',
          className: 'col3'
        },
        {
          title: '提交日期',
          key: 'verifyTime',
          className: 'col4',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, (this.list[params.index].verifyTime ? moment(this.list[params.index].verifyTime).format('YYYY-MM-DD HH:mm') : ''))
            ])
          }
        },
        {
          title: '实名状态',
          key: 'rnvcStatus',
          className: 'col5',
          render: (h, params) => {
            if (this.list[params.index].rnvcStatus === 3) {
              return h('Tooltip', {
                props: {
                  content: this.list[params.index].rnvcFaildReason,
                  placement: 'top'
                }
              },
              [
                h('Icon', {
                  props: {
                    custom: 'i-icon i-icon-tips',
                    size: '16'
                  },
                  style: {
                    margin: '0 5px 0 0',
                    color: '#48affe'
                  }
                }),
                h('a', {
                  props: {
                    href: ''
                  },
                  style: {
                    color: '#f00'
                  }
                }, '审核拒绝')
              ])
            } else {
              if (this.list[params.index].rnvcStatus === null) {
                return h('div', [
                  h('span', {
                  }, '未提交资料')
                ])
              } else {
                return h('div', [
                  h('span', {
                  }, this.DATAS.REAL_NAME_VERIFY_STATUS[this.list[params.index].rnvcStatus])
                ])
              }
            }
          }
        },
        {
          title: '命名状态',
          key: 'dnvcStatus',
          className: 'col6',
          render: (h, params) => {
            if (this.list[params.index].dnvcStatus === 3) {
              return h('Tooltip', {
                props: {
                  content: this.list[params.index].dnvcFaildReason,
                  placement: 'top'
                }
              },
              [
                h('Icon', {
                  props: {
                    custom: 'i-icon i-icon-tips',
                    size: '16'
                  },
                  style: {
                    margin: '0 5px 0 0',
                    color: '#48affe'
                  }
                }),
                h('a', {
                  props: {
                    href: ''
                  },
                  style: {
                    color: '#f00'
                  }
                }, '审核拒绝')
              ])
            } else {
              return h('div', [
                h('span', {
                }, this.DATAS.DOMAIN_NAME_VERIFY_STATUS[this.list[params.index].dnvcStatus])
              ])
            }
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            if (this.list[params.index].rnvcStatus === null || this.list[params.index].rnvcStatus === 0 || this.list[params.index].rnvcStatus === 3) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.showRealNameSubmit(this.list[params.index])
                    }
                  }
                }, '提交资料')
              ])
            }
          }
        }
      ]
    }
  },
  methods: {
    searchListData () {
      this.showSubmit = false
      this.btnRealNameDisabled = true
      this.btnUpdateStatusDisabled = true
      this.$refs.asideFilter.filterSubmit()
      // this.queryList(1)
    },
    pageChange: function (curPage) {
      this.queryList(curPage)
    },
    toBackList () {
      this.showSubmit = false
    },
    showRealNameSubmit (item) {
      this.$store.dispatch('CHECK_UPLOAD_DOMAIN_VERIFY', {domainIds: item.id}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.selectData = [item]
          this.organizeNameCn = item.organizeNameCn
          this.rnvcStatus = item.rnvcStatus
          this.showSubmit = true
        } else {
          if (response.data.code === '700') {
            this.$Message.error('域名包含正在进行过户或转移信息更新中请等待完成后再提交实名制审核资料！')
          }
        }
      }).catch(() => {})
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    tableSelectChange (selected) {
      this.selectData = selected
      this.btnUpdateStatusDisabled = !selected.length
      this.btnRealNameDisabled = !selected.length
    },
    batchRealName () {
      let flag = true
      let ing = true
      this.selectData.reduce((cur, next) => {
        // 若选择域名所有人名称不同时，点击“批量实名”提示：“请您选择域名所有人相同的域名批量实名！”；
        if (cur.organizeNameCn !== next.organizeNameCn) {
          flag = false
        }
        return next
      })
      // 若选择域名资料审核中、审核通过时，点击“批量实名”弹出提示：“实名制状态处于资料审核中或审核通过，不允许批量实名！”
      this.selectData.map((v, i, arr) => {
        console.log(v.rnvcStatus)
        if (v.rnvcStatus === 1 || v.rnvcStatus === 2) {
          ing = false
        }
      })
      if (!flag) {
        this.$Message.error('请您选择域名所有人相同的域名批量实名！')
      } else {
        if (!ing) {
          this.$Message.error('实名制状态处于资料审核中或审核通过，不允许批量实名！')
        } else {
          this.$store.dispatch('CHECK_UPLOAD_DOMAIN_VERIFY', {domainIds: this.getDomainId}).then(response => {
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.organizeNameCn = this.selectData[0].organizeNameCn
              this.showSubmit = true
            } else {
              if (response.data.code === '700') {
                this.$Message.error('域名包含正在进行过户或转移信息更新中请等待完成后再提交实名制审核资料！')
              }
            }
          }).catch(() => {})
        }
      }
    },
    batchUpdate () {
      // 若选择域名资料审核中、审核通过时，点击“更新”弹出提示：“实名制状态处于资料审核中或审核通过，不允许更新！”
      // let flag = []
      // flag = this.selectData.filter((v, i, arr) => {
      //   return (v.rnvcStatus === 1 || v.rnvcStatus === 2)
      // })
      // if (flag.length) {
      //   this.$Message.error('实名制状态处于资料审核中或审核通过，不允许更新状态！')
      // } else {
      this.loadingBtn = true
      this.$store.dispatch('UPDATE_DOMAIN_AUDIT_STATUS', {domainIds: this.getDomainId}).then(response => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.$Message.success('更新成功')
          this.searchListData()
        } else {
          this.$Message.error('更新失败')
        }
      }).catch(() => {})
      // }
    },
    asideFilterSubmit (result) {
      console.log(result)
      // 返回 参数 处理
      this.asideFilterResult.groupIds = result.dataMgmtCompany.reduce((pre, cur) => {
        console.log(pre)
        console.log(cur)
        return pre.concat(cur)
      }, []).join(',')
      this.asideFilterResult.serviceState = result.dataServiceState.join(',')
      this.asideFilterResult.rnvcStatus = result.dataRealName.join(',')
      this.asideFilterResult.dnvcStatus = result.dataNamingState.join(',')
      this.asideFilterResult.verifyDay = result.dataTimeSubmit.value === 'custom' ? '' : result.dataTimeSubmit.value
      this.asideFilterResult.verifyTimeBegin = result.dataTimeSubmit.value === 'custom' ? (result.dataTimeSubmit.time[0] + ' 00:00:00') : ''
      this.asideFilterResult.verifyTimeEnd = result.dataTimeSubmit.value === 'custom' ? (result.dataTimeSubmit.time[1] + ' 23:59:59') : ''
      // 加载数据
      this.queryList(1)
    },
    asideFilterReset () {
      this.asideFilterResult.groupIds = ''
      this.asideFilterResult.serviceState = ''
      this.asideFilterResult.rnvcStatus = ''
      this.asideFilterResult.dnvcStatus = ''
      this.asideFilterResult.verifyDay = ''
      this.asideFilterResult.verifyTimeBegin = ''
      this.asideFilterResult.verifyTimeEnd = ''
      this.queryList(1)
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        domainName: this.value,
        groupIds: this.asideFilterResult.groupIds,
        serviceState: this.asideFilterResult.serviceState,
        rnvcStatus: this.asideFilterResult.rnvcStatus,
        dnvcStatus: this.asideFilterResult.dnvcStatus,
        verifyDay: this.asideFilterResult.verifyDay,
        verifyTimeBegin: this.asideFilterResult.verifyTimeBegin,
        verifyTimeEnd: this.asideFilterResult.verifyTimeEnd
      }
      return params
    },
    queryList (num) {
      this.$store.dispatch('DOMAIN_VERIFY_LIST', this.queryListParam({pageNum: num})).then(response => {
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
    }
  },
  computed: {
    getDomainId () {
      console.log(this.selectData)
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
    this.$store.dispatch('TEMPLATES').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.templateList = this.GLOBALS.CONVERT_SELECT(response.data.data, {
          label: 'templateName',
          value: 'id'
        })
      } else {
      }
    }).catch(() => {})
  },
  mounted () {
    this.queryList(1)
  }
}
</script>

<style>
.contRealNameDomain .secMain{
  background:none;
}
.contRealNameDomain .backlist{
  cursor:pointer;
}
.contRealNameDomain .alert1{
  padding: 10px 10px 10px 32px;
  margin-bottom: 30px;
}
.contRealNameDomain .alert1 .ivu-alert-icon{
  top: -3px;
  left: 10px;
  margin:0px;
}
.contRealNameDomain .alert1 .ivu-alert-icon i{
  color: #ffad02;
}
.contRealNameDomain .alert1 .ivu-alert-message{
  float: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}
.contRealNameDomain .alert1 .ivu-alert-desc{
  overflow: hidden;
}
.contRealNameDomain .filter{
  float:left;
  width:220px;
  background:#fff;
  margin-right:20px;
}

.contRealNameDomain .secTable{
  overflow:hidden;
  background:none;
}
.contRealNameDomain .ivu-page{
  padding-top:20px;
}
.contRealNameDomain .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.contRealNameDomain .tableTool .ivu-btn{
  margin: 0 5px;
}
.contRealNameDomain .tableTool .ivu-btn span{
  color:#333;
}
.contRealNameDomain .tableTool a{
  display:inline-block;
  margin: 0 10px;
}
</style>
