<template lang="pug">
.contDomainMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="toBackList" class="backlist">域名管理</span>
    <span @click="toBackDetail" v-show="showDetail || showDns" class="backDetail"> > 域名详情</span>
    <span @click="" v-show="showDns" > > 修改DNS</span>

    form.tR(v-show="!showDetail && !showDns", ref="exportForm", method="post" accept-charset="utf-8" :action="exportLink")
      input(type="hidden", :value='this.value', name="domainName")
      input(type="hidden", :value='this.asideFilterResult.domainSuffixs', name="domainSuffixs")
      input(type="hidden", :value='this.asideFilterResult.otherSuffix', name="otherSuffix")
      input(type="hidden", :value='this.asideFilterResult.allSuffix', name="allSuffix")
      input(type="hidden", :value='this.asideFilterResult.groupIds', name="groupIds")
      input(type="hidden", :value='this.asideFilterResult.serviceState', name="serviceState")
      input(type="hidden", :value='this.asideFilterResult.createDay', name="createDay")
      input(type="hidden", :value='this.asideFilterResult.expireDay', name="expireDay")
      input(type="hidden", :value='this.asideFilterResult.createTimeBegin', name="createTimeBegin")
      input(type="hidden", :value='this.asideFilterResult.createTimeEnd', name="createTimeEnd")
      input(type="hidden", :value='this.asideFilterResult.expireTimeBegin', name="expireTimeBegin")
      input(type="hidden", :value='this.asideFilterResult.expireTimeEnd', name="expireTimeEnd")

      span 搜索
      Input(style="width:200px",placeholder="请输入域名", name="domainName", v-model.trim="value")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
      a(href="javascript:;",class="exportOrder",@click="exportOrder") 导出域名列表

  .secMain(v-show="!showDetail && !showDns")
    .filter
      comp-aside-filter(:show="[3,4,6,7,8]", @asideFilterSubmit="asideFilterSubmit", @asideFilterReset="asideFilterReset", :total="page.pageItems", :filterTitle="filterTitle")

    <!-- 列表主体 -->
    .secTable(v-show="!showDetail && !showDns")
      <Table :columns="columns" :data="list" :loading="loadingTable" ref="selection" @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange"></Table>
      .tableTool
        a(href="javascript:;", @click="handleSelectAll(true)") 全选
        a(href="javascript:;", @click="handleSelectAll(false)") 取消全选

        Poptip(placement="bottom", width="350", v-model="visible")
          Button(@click="", :disabled="moveGroupDisabled", class="toolBtn") 移动至
          comp-user-auth-groups(slot="content", :on-parentmethod="hidePop", :domainIds="getDomainId", @refreshData = "searchListData", :groupsData="userAuthGroups", type="list")

        Button(@click="renewFun", :disabled="renewDisabled", class="toolBtn") 续费
        Button(@click="domainChangeFun", :disabled="disabledSafeLv", class="toolBtn") 过户

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20, v-show="!showDetail && !showDns")

  <!-- 详情 -->
  comp-domain-mgmt-detail(
    @refreshData = "searchListData",
    @showDnsFun = "showDnsFun",
    @setVerificationCode = "setVerificationCode",
    @setDetailFun = "setDetailFun",
    :detailData = "detailData",
    v-if="showDetail"
  )
  <!-- 修改DNS -->
  comp-domain-modify-dns(
    @refreshData = "searchListData",
    @setDetailFun = "setDetailFun",
    v-if="showDns",
    :detailData = "detailData",
    :verificationCode = "verificationCode"
  )

  <!-- 过户提交 抽屉 -->
  Drawer(:closable="true", width="650", v-model="drawerDomainChange", title="提交过户", :mask-closable="maskClosable", @on-visible-change="drawerChange",)
    comp-domain-change(
      v-if="drawerDomainChange",
      :on-close="closeDrawer",
      @refreshData="searchListData",
      :defaultValue="defaultValueChange"
    )
</template>

<script>
import { mapState } from 'vuex'
import compDomainChange from '@/components/compDomainChange'
import compUserAuthGroups from '@/components/compUserAuthGroups'
import compDomainMgmtDetail from '@/components/compDomainMgmtDetail'
import compDomainModifyDns from '@/components/compDomainModifyDns'
import compAsideFilter from '@/components/compAsideFilter'
import * as actions from '@/actions/domain.js'
import moment from 'moment'
export default {
  components: {
    compUserAuthGroups,
    compDomainMgmtDetail,
    compDomainModifyDns,
    compDomainChange,
    compAsideFilter
  },
  data () {
    return {
      value: '',
      filterTitle: '域名管理',
      refresh: false,
      visible: false,
      selectData: [],
      loadingTable: true,
      loadingBtn: false,
      showDetail: false,
      drawerDomainChange: false,
      verificationCode: '',
      showDns: false,
      domainType: 0,
      disabledSafeLv: false,
      moveGroupDisabled: true,
      renewDisabled: true,
      defaultValueChange: '',
      detailData: {},
      exportLink: actions.EXPORT_DOMAIN,
      list: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '域名',
          width: 250,
          key: 'domainName',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-star',
                  size: '18'
                },
                on: {
                  click: () => {
                    this.$router.push({path: '/domain/security'})
                  }
                },
                style: {
                  margin: '0 5px 0 0',
                  color: '#f00',
                  cursor: 'pointer',
                  'line-height': '14px',
                  'vertical-align': 'top',
                  display: (this.list[params.index].importantFlag === 1 ? 'inline-block' : 'none')
                }
              }),
              h('span', {
                style: {
                  margin: (this.list[params.index].importantFlag === 1 ? '0' : '0 0 0 23px')
                }
              }, this.list[params.index].domainName),
              h('span', {
                style: {
                  color: '#aaa'
                }
              }, this.list[params.index].depositFlag ? '(托管域名)' : '')
            ])
          }
        },
        {
          title: '到期日期',
          key: 'expireDate',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, moment(this.list[params.index].expireDate).format('YYYY-MM-DD'))
            ])
          }
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
          width: 200,
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
                    this.showDetailFun(this.list[params.index])
                  }
                }
              }, '详情'),
              // h('a', {
              //   props: {
              //     href: 'javascript:;'
              //   },
              //   on: {
              //     click: () => {
              //     }
              //   }
              // }, this.list[params.index].depositFlag ? '' : '解析')
            ])
          }
        }
      ],
      asideFilterResult: {
        domainSuffixs: '',
        otherSuffix: '',
        allSuffix: '',
        groupIds: '',
        serviceState: '',
        createDay: '',
        expireDay: '',
        createTimeBegin: '',
        createTimeEnd: '',
        expireTimeBegin: '',
        expireTimeEnd: ''
      }
    }
  },
  methods: {
    searchListData () {
      this.moveGroupDisabled = true
      this.queryList(1)
    },
    pageChange: function (curPage) {
      this.queryList(curPage)
    },
    exportOrder () {
      this.$refs.exportForm.submit()
    },
    closeDrawer () {
      this.drawerDomainChange = false
    },
    drawerChange () {
    },
    setVerificationCode (v) {
      alert(v)
      this.verificationCode = v
    },
    toBackList () {
      this.searchListData()
      this.showDns = false
      this.showDetail = false
    },
    toBackDetail () {
      this.showDetail = true
      this.showDns = false
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    tableSelectChange (selected) {
      this.selectData = selected
      this.moveGroupDisabled = !selected.length
      this.renewDisabled = !selected.length
    },
    renewFun () {
      var newWin =  window.open('')
      let depositFlag = true
      let serviceStatus = true
      let params = {
        jsonObj: this.selectData.map((v) => {
          if (v.depositFlag === 1) {
            depositFlag = false
          }
          if (v.serviceStatus === 2) {
            serviceStatus = false
          }
          return {
            domainName: v.domainName,
            orderGoodsType: 2,
            orderType: 2
          }
        })
      }
      console.log(params)
      if (depositFlag && serviceStatus) {
        this.$store.dispatch('ORDER_CONFIRM', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            response.data.type = '2_2'
            response.data.jsonObj.map((v) => {
              v.price = v.goodsNumAndPrice[0].price + '_' + v.goodsNumAndPrice[0].unit
              v.num = v.goodsNumAndPrice[0].num
              v.unit = v.goodsNumAndPrice[0].unit
            })
            // this.$store.commit('SET_PAY_ORDERS', response.data)
            localStorage.setItem('data_pay_confirm', JSON.stringify(response.data))
            //this.$router.push({path: '/payConfirm'})
            newWin.location.href='/payConfirm'
            // window.open('/payConfirm','_blank')
          } else {
            newWin.close()
            if (response.data.code === '100') {
              this.$Message.error('模板不存在')
            } else if (response.data.code === '200') {
              this.$Message.error('分组不存在')
            } else if (response.data.code === '300') {
              this.$Message.error('账户错误')
            } else if (response.data.code === '400') {
              this.$Message.error('json数据错误')
            } else {
            }
          }
        }).catch(() => {})
      } else {
        newWin.close()
        if (!depositFlag) {
          this.$Message.error('选择域名包含托管域名，如需续费请您联系管家！')
        }
        // 域名管理，域名进入偿还期不允许点击续费，点击"续费"弹出提示："域名已进入偿还期不允许续费，请尽快联系管理赎回域名！"
        if (!serviceStatus) {
          this.$Message.error('域名已进入偿还期不允许续费，请尽快联系管理赎回域名！')
        }
      }
    },
    domainChangeFun () {
      let flag = true
      let domainString = this.selectData.map((v) => {
        if (v.depositFlag === 1) {
          flag = false
        }
        return v.domainName
      }).join(',')
      // flag===true 执行过户，否则提示 错误信息
      if (flag) {
        this.defaultValueChange = domainString
        this.drawerDomainChange = true
      } else {
        this.$Message.error('存在托管域名，禁止过户')
      }
    },
    showDetailFun (item) {
      this.domainType = item.depositFlag
      this.showDetail = true
      let params = {
        domainId: item.id
      }
      this.$store.dispatch('DOMAIN_DOMAIN_MANAGE', params).then(response => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.detailData = response.data.data
        } else {

        }
      }).catch(() => {})
    },
    setDetailFun (obj) {
      this.detailData = obj
    },
    showDnsFun () {
      this.showDetail = false
      this.showDns = true
    },
    hidePop () {
      this.visible = false
    },
    asideFilterSubmit (result) {
      console.log(result)
      // 返回 参数 处理
      this.asideFilterResult.allSuffix = result.dataDomainSuffix.checkAll ? 1 : ''
      this.asideFilterResult.otherSuffix = (!result.dataDomainSuffix.checkAll && result.dataDomainSuffix.value.indexOf('otherSuffix') >= 0) ? 1 : ''
      this.asideFilterResult.domainSuffixs = result.dataDomainSuffix.checkAll ? '' : (result.dataDomainSuffix.value.indexOf('otherSuffix') < 0 ? result.dataDomainSuffix.value.join(',') : result.dataDomainSuffix.value.filter(v => v !== 'otherSuffix').join(','))
      this.asideFilterResult.groupIds = result.dataMgmtCompany.reduce((pre, cur) => {
        return pre.concat(cur)
      }, []).join(',')

      this.asideFilterResult.serviceState = result.dataServiceState.join(',')

      this.asideFilterResult.createDay = result.dataTimeReg.value === 'custom' ? '' : result.dataTimeReg.value
      this.asideFilterResult.createTimeBegin = result.dataTimeReg.value === 'custom' ? result.dataTimeReg.time[0] : ''
      this.asideFilterResult.createTimeEnd = result.dataTimeReg.value === 'custom' ? result.dataTimeReg.time[1] : ''

      this.asideFilterResult.expireDay = result.dataTimeExpire.value === 'custom' ? '' : result.dataTimeExpire.value
      this.asideFilterResult.expireTimeBegin = result.dataTimeExpire.value === 'custom' ? result.dataTimeExpire.time[0] : ''
      this.asideFilterResult.expireTimeEnd = result.dataTimeExpire.value === 'custom' ? result.dataTimeExpire.time[1] : ''

      console.log(this.asideFilterResult)
      // 加载数据
      this.queryList(1)
    },
    asideFilterReset () {
      this.asideFilterResult.domainSuffixs = ''
      this.asideFilterResult.otherSuffix = ''
      this.asideFilterResult.allSuffix = ''
      this.asideFilterResult.groupIds = ''
      this.asideFilterResult.serviceState = ''
      this.asideFilterResult.createDay = ''
      this.asideFilterResult.expireDay = ''
      this.asideFilterResult.createTimeBegin = ''
      this.asideFilterResult.createTimeEnd = ''
      this.asideFilterResult.expireTimeBegin = ''
      this.asideFilterResult.expireTimeEnd = ''

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
        domainSuffixs: this.asideFilterResult.domainSuffixs,
        otherSuffix: this.asideFilterResult.otherSuffix,
        allSuffix: this.asideFilterResult.allSuffix,
        groupIds: this.asideFilterResult.groupIds,
        serviceState: this.asideFilterResult.serviceState,
        createDay: this.asideFilterResult.createDay,
        expireDay: this.asideFilterResult.expireDay,
        createTimeBegin: this.asideFilterResult.createTimeBegin,
        createTimeEnd: this.asideFilterResult.createTimeEnd,
        expireTimeBegin: this.asideFilterResult.expireTimeBegin,
        expireTimeEnd: this.asideFilterResult.expireTimeEnd
      }
      return params
    },
    queryList (num) {
      this.$store.dispatch('DOMAIN_LIST', this.queryListParam({pageNum: num})).then(response => {
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
      },
      userAuthGroups (state) {
        let arrGroups = []
        if (state.user.userAuthGroups.companys) {
          arrGroups = this.GLOBALS.CONVERT_TREE(state.user.userAuthGroups.companys, {
            title: 'name',
            label: 'id',
            checked: 'checked',
            children: 'groups',
            disabled_lv1: true,
            disabled_lv2: false
          })
        }
        return arrGroups
      }
    })
  },
  beforeMount () {
  },
  mounted () {
    this.queryList(1)
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
.contDomainMgmt .tableTool .toolBtn span{
  color:#333;
}
.contDomainMgmt .tableTool a{
  display:inline-block;
  margin: 0 10px;
}
</style>
