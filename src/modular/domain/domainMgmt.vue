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
      Button(type="primary", @click="handleShowModalsMultiUpdate('import')", :loading="loadingBtn") 导入域名
      Button(type="default", @click="handleShowModalsMultiUpdate('update')", :loading="loadingBtn") 批量修改
      a(href="javascript:;",class="exportOrder",@click="exportOrder") 导出域名列表

  .secMain(v-show="!showDetail && !showDns")
    .filter
      comp-aside-filter(ref="asideFilter",:show="[3,4,6,7,8]", @asideFilterSubmit="asideFilterSubmit", @asideFilterReset="asideFilterReset", :total="page.pageItems", :filterTitle="filterTitle")

    <!-- 列表主体 -->
    .secTable(v-show="!showDetail && !showDns")
      <Table :columns="columns" :data="list" :loading="loadingTable" ref="selection" @on-select="tableSelectChange" @on-select-cancel="tableSelectChange" @on-select-all="tableSelectChange" @on-select-all-cancel="tableSelectChange" @on-sort-change="sortChange"></Table>
      .tableTool
        a(href="javascript:;", @click="handleSelectAll(true)") 全选
        a(href="javascript:;", @click="handleSelectAll(false)") 取消全选

        Poptip(placement="bottom", width="350", v-model="visible1")
          Button(@click="", class="toolBtn") 移动至
          comp-user-auth-groups(slot="content", :on-parentmethod="hidePop1", :domainIds="getDomainId", @refreshData = "searchListData", :groupsData="userAuthGroups", type="list")

        Button(@click="renewFun", class="toolBtn") 续费
        Button(@click="domainChangeFun", class="toolBtn") 过户
        Button(@click="domainDelFun", class="toolBtn") 删除
        Poptip(placement="bottom", width="350", v-model="visible2")
          Button(@click="", class="toolBtn") 设置所属品牌
          comp-brand-list(slot="content", :on-parentmethod="hidePop2", :domainIds="getDomainId", @refreshData = "searchListData")

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20, v-show="!showDetail && !showDns")

  <!-- 详情 -->
  comp-domain-mgmt-detail(
    @refreshData = "searchListData",
    @showDnsFun = "showDnsFun",
    @setVerificationCode = "setVerificationCode",
    @setDetailFun = "setDetailFun",
    @refreshDomainDetail = "showDetailFun",
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
  <!-- 批量修改 -->
  Modal(
    v-model="showModalsMultiUpdate",
    :title="modalUpdateDomainTitle",
    :loading="loadingModalsMultiUpdate",
    @on-visible-change="handleVisibleChange",
    @on-ok="upload",
    :footer-hide="true"
  )
    Form(:label-width="100")
      FormItem(label="添加方式：", v-if="modalUpdateDomainType==='import'")
        comp-radio(:list="monthedList", ref="monthed", defaultValue="1", :on-parentmethod="setMonthedValue")
      FormItem(label="请输入域名：", v-if="modalUpdateDomainType==='import' && method==='1'")
        comp-input(name='domainNames',label="域名",ref="domainNames", type="textarea", styles="width:80%;", placeholder="每行一个,支持中英文数字和连字符“-”")
      FormItem(label="管理公司：", v-if="modalUpdateDomainType==='import' && method==='1'")
        comp-select(name='companyId',label="管理公司",ref="companyId", :list="companysList")
      FormItem(label="分组：", v-if="modalUpdateDomainType==='import' && method==='1'")
        comp-select(name='groupId',label="分组",ref="groupId", :list="userAuthGroupsSelect", :optionGroup="true" )
      FormItem(label="品牌：", v-if="modalUpdateDomainType==='import' && method==='1'")
        comp-radio(:list="brandList", ref="brandId")
      FormItem(label="", v-if="modalUpdateDomainType==='update' || (modalUpdateDomainType==='import' && method==='2')")
        Upload(
          v-if="showModalsMultiUpdate",
          ref="upload",
          :action="uploadLink",
          name="file",
          accept=".xlsx",
          :format="['xlsx']",
          :show-upload-list="true",
          :on-success="handleSuccess",
          :on-error="handleError",
          :on-format-error="handleFormatError",
          :before-upload="handleUpload"
        )
          Button(type="primary", icon="ios-cloud-upload-outline") 上传文件
          a(style="display:inline-block;margin-left: 20px;", slot="tip") 下载模板
        div(v-if="file !== null", style="padding: 20px 0 0 0;") {{ file.name }}
    div.ivu-modal-footer(style="padding-bottom: 20px;")
      Button(type="primary",@click="submitForm",:loading="loadingBtn", v-if="modalUpdateDomainType==='import' && method==='1'") 立即添加
      Button(type="primary",@click="upload",:loading="loadingBtn", v-else) 立即添加
</template>

<script>
import { mapState } from 'vuex'
import compInput from '@/components/compInput'
import compSelect from '@/components/compSelect'
import compRadio from '@/components/compRadio'
import compDomainChange from '@/components/compDomainChange'
import compUserAuthGroups from '@/components/compUserAuthGroups'
import compBrandList from '@/components/compBrandList'
import compDomainMgmtDetail from '@/components/compDomainMgmtDetail'
import compDomainModifyDns from '@/components/compDomainModifyDns'
import compAsideFilter from '@/components/compAsideFilter'
import * as actions from '@/actions/domain.js'
import moment from 'moment'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compSelect,
    compRadio,
    compUserAuthGroups,
    compBrandList,
    compDomainMgmtDetail,
    compDomainModifyDns,
    compDomainChange,
    compAsideFilter
  },
  data () {
    return {
      value: '',
      filterTitle: '域名管理',
      modalUpdateDomainTitle: '',
      modalUpdateDomainType: null,
      refresh: false,
      visible1: false,
      visible2: false,
      selectData: [],
      loadingTable: true,
      loadingBtn: false,
      loadingModalsMultiUpdate: true,
      showDetail: false,
      showModalsMultiUpdate: false,
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
      uploadLink: actions.BATCH_UPDATE_DEPOSIT_DOMAIN,
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
          title: '注册商',
          key: 'registrarName',
          className: 'col2'
        },
        {
          title: '到期日期',
          key: 'expireDate',
          className: 'col3',
          sortable: true,
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
          className: 'col4',
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
          className: 'col5'
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
              }, '详情')
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
      },
      file: null,
      loadingStatus: false,
      monthedList: [
        {
          value: '1',
          label: '直接添加'
        },
        {
          value: '2',
          label: '导入域名'
        }
      ],
      brandList: [],
      method: '1'
    }
  },
  methods: {
    setMonthedValue (obj) {
      this.method = obj.value
    },
    handleShowModalsMultiUpdate (type) {
      if (type === 'import') {
        this.modalUpdateDomainTitle = '添加非新网域名'
      } else {
        this.modalUpdateDomainTitle = '修改域名信息'
      }
      this.modalUpdateDomainType = type
      this.showModalsMultiUpdate = true
    },
    searchListData () {
      this.moveGroupDisabled = true
      this.$refs.asideFilter.filterSubmit()
    },
    pageChange: function (curPage) {
      this.queryList({pageNum: curPage})
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
      if (!this.selectData.length) {
        this.$Message.error('请选择域名!')
        this.loadingBtn = false
        return false
      }
      var newWin = window.open('')
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
            // this.$router.push({path: '/payConfirm'})
            newWin.location.href = '/payConfirm'
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
      // this.domainType = item.depositFlag
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
    domainDelFun () {
      let flag = true
      if (this.selectData.length) {
        let domainString = this.selectData.map((v) => {
          if (v.depositFlag !== 1) {
            flag = false
          }
          return v.id
        }).join(',')
        // flag===true 执行过户，否则提示 错误信息
        if (flag) {
          this.$Modal.confirm({
            title: '确认',
            content: '<p>请确认是否要此域名！</p>',
            loading: true,
            onOk: () => {
              this.$store.dispatch('DELETE_DEPOSIT_DOMAIN', {domainIds: domainString}).then(response => {
                this.$Modal.remove()
                if (!response) {
                  return false
                }
                if (response.data.code === '1000') {
                  this.$Message.success('删除成功')
                  // 删除成功，重新加载列表数据
                  this.queryList({pageNum: 1})
                } else {
                  if (response.data.code === '200') {
                    this.$Message.error('用户不存在')
                  } else if (response.data.code === '300') {
                    setTimeout(() => {
                      this.$Modal.warning({
                        title: '无法删除',
                        content: '该账号为域名分组负责人，请将域名分组负责人设为其他账号后再删除该账号'
                      })
                    }, 300)
                    // this.$Message.error('该客户下已有负责分组，请先将分组移至其它客户再删除当前客户！')
                  } else {
                    this.$Message.error('操作失败')
                  }
                }
              }).catch(() => {})
            },
            onCancel: () => {
            }
          })
        } else {
          this.$Message.error('存在非托管域名，禁止删除！')
        }
      } else {
        this.$Message.error('请选择要删除的域名！')
      }
    },
    hidePop1 () {
      this.visible1 = false
    },
    hidePop2 () {
      this.visible2 = false
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
      this.asideFilterResult.expireTimeBegin = result.dataTimeExpire.value === 'custom' ? (result.dataTimeExpire.time[0] + ' 00:00:00') : ''
      this.asideFilterResult.expireTimeEnd = result.dataTimeExpire.value === 'custom' ? (result.dataTimeExpire.time[1] + ' 23:59:59') : ''

      console.log(this.asideFilterResult)
      // 加载数据
      this.queryList({pageNum: 1})
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

      this.queryList({pageNum: 1})
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
    queryList (obj) {
      this.$store.dispatch('DOMAIN_LIST', this.queryListParam(obj)).then(response => {
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
    sortChange (v) {
      console.log(v)
      // let sort = v.order
      // sort.sortType = v.key === 'flowTime' ? 'time' : 'money'
      // sort.sortValue = v.order
      // console.log(sort)
      this.queryList({pageNum: 1, orderExpireDate: v.order})
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
          this.brandList = response.data.data.list.map((v) => {
            return {
              label: v.brandName,
              domainCount: v.domainCount,
              value: v.id
            }
          })
        } else {
        }
      }).catch(() => {})
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '格式错误',
        desc: '请下载固定格式模板'
      })
    },
    handleSuccess () {
      this.file = null
      this.$Message.success('添加成功')
      this.queryList(1)
      this.showModalsMultiUpdate = false
    },
    handleError () {
      // this.file = null
      this.$Message.error('添加失败')
      this.loadingModalsMultiUpdate = false
    },
    handleUpload (file) {
      this.file = file
      return false
    },
    upload () {
      this.$refs.upload.post(this.file)
    },
    handleVisibleChange () {
      this.file = null
    },
    submitForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.domainNames,
        this.$refs.companyId,
        this.$refs.groupId,
        this.$refs.brandId
      ])
      let domains = this.GLOBALS.TRIM_ALL(this.$refs.domainNames.value.replace(/[\n\r]/g, ',').replace(/www\./g, '')).split(',')
      // 清除空项
      domains = domains.filter((v) => {
        return v.length > 0
      })
      console.log('================================')
      console.log(domains)
      console.log('================================')
      this.$refs.domainNames.value = domains.join(',').replace(/,/gm, '\n')
      if (domains.length > 500) {
        this.$refs.domainNames.showValidateResult({text: '最多允许一次提交500个域名！'})
        result = false
      } else {
        for (var i = 0; i < domains.length; i++) {
          if (!this.GLOBALS.IS_DOMAIN_AVAILABLE(domains[i])) {
            result = false
            this.$refs.domainNames.showValidateResult({text: '域名格式错误！'})
            break
          }
        }
      }
      if (result) {
        var params = {
          domainNames: domains.join(','),
          companyId: this.$refs.companyId.value,
          groupId: this.$refs.groupId.value,
          brandId: this.$refs.brandId.value
        }
        console.log('================================')
        console.log(params)
        console.log('================================')
        this.$store.dispatch('CREATE_DEPOSIT_DOMAIN', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('添加成功')
              this.queryList(1)
              this.showModalsMultiUpdate = false
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else {
                this.$Message.error('更新失败')
              }
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
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
      },
      userAuthGroupsSelect (state) {
        let arrGroups = []
        arrGroups = this.GLOBALS.CONVERT_SELECT_GROUP(state.user.userAuthGroups.companys, {
          value: 'id',
          label: 'name',
          children: 'groups'
        })
        return arrGroups
      },
      companysList (state) {
        return this.GLOBALS.CONVERT_SELECT(state.user.companys, {
          label: 'name',
          value: 'id'
        })
      }
    })
  },
  beforeMount () {
  },
  mounted () {
    this.getBrandList()
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
