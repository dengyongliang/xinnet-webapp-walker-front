<template lang="pug">
.contBrandLib
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span @click="showDetail=false" class="backlist">品牌库</span>
    .tR
      Button(type="default", class="btnTop" @click="",:loading="loadingBtn") 品牌设置
  .secMain()
    .secFilter()
      form.filterWrap(ref="exportForm")
        table
          tr.row1
            td.td1
              span.n 搜索商标：
              .inputWrap
                <Input v-model="value" ref="domainName" placeholder="品牌名称" />
            td.td2
              span.n 品牌级别：
              .inputWrap
                comp-select(:list="siteTypesList", ref="siteTypes", styles="width:100%",placeholder="全部")
            td.tdBtn
              Button(type="primary", @click="searchListData",:loading="loadingBtn") 搜索
              Button(type="default", @click="",:loading="loadingBtn") + 添加品牌

    div.list
      ul
        li()
          h3.clear()
            span.left() 下属公司
            span.right
              a() 详情
              a() 设置
              a() 删除
          Row
          Col.col1(span="6")
            span.logo
              img()
          Col.col2(span="7")
            strong.clear  title
            .col2Cont
              .row1.clear
                span.left 品牌安全分：<em>0</em>个
              .row2.clear
                span.left 管理公司：联系人
              .row3.clear
                span.left 商标数量：手机
              .row4.clear
                span.left 域名数量：固话
              .row5.clear
                span.left 品牌级别：邮箱
          Col.col3(span="11")
            .col3Cont
              .row1.clear
                span.left 域名监控：
                span.right
                  span.item <Icon type="ios-alert" />按时附加赛的
                  span.item <Icon type="ios-alert" />按时附加赛的
                  span.item <Icon type="ios-alert" />按时附加赛的
              .row1.clear
                span.left 商标监控：
                span.right
                  span.item <Icon type="ios-alert" />按时附加赛的
                  span.item <Icon type="ios-alert" />按时附加赛的
                  span.item <Icon type="ios-alert" />按时附加赛的
    .detailCont
      .cont1
        Row()
          Col(span="14")
            div
              span.logo
                img(src="")
              .info
                h4 天翼云
                ul
                  li 管理公司：撒酒疯啥大姐夫上来看
                  li 品牌级别：撒旦法就卡三等奖
                p 关键词：天翼云、天翼cloud
          Col(span="10")
            div
              .chart
              .info
                strong 品牌安全分
                a 查看品牌健康报告
      .cont2
        h2.h2T 品牌资产
        Row()
          Col(span="12")
            div 1
          Col(span="12")
            div 2

      .cont3
        h2.h2T 品牌监控
        Row(:gutter="20")
          Col(span="8")
            div
              h3.h3T.clear
                span.t 自有域名监控
                div.tR
                  router-link.text(to="/domain/realname") 详情
              ul
                li <Icon type="ios-alert" />3个域名即将过期
          Col(span="8")
            div
              h3.h3T.clear
                span.t 关注域名监控
                div.tR
                  router-link.text(to="/domain/realname") 详情
              ul
                li <Icon type="ios-alert" />3个域名即将过期
          Col(span="8")
            div
              h3.h3T.clear
                span.t 自有商标监控
                div.tR
                  router-link.text(to="/domain/realname") 详情
              ul
                li <Icon type="ios-alert" />3个域名即将过期
          Col(span="8")
            div
              h3.h3T.clear
                span.t 关注商标监控
                div.tR
                  router-link.text(to="/domain/realname") 详情
              ul
                li <Icon type="ios-alert" />3个域名即将过期
          Col(span="8")
            div
              h3.h3T.clear
                span.t 关注商标监控
                div.tR
                  router-link.text(to="/domain/realname") 详情
              ul
                li <Icon type="ios-alert" />3个域名即将过期
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
import { mapState } from 'vuex'
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
      selectData: [],
      orderByProperty: '',
      orderByType: '',
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
          sortable: 'custom',
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
          sortable: 'custom'
        },
        {
          title: '注册时间',
          width: 150,
          key: 'whoisApplyTime',
          className: 'col4',
          sortable: 'custom'
        },
        {
          title: '到期时间',
          width: 150,
          key: 'whoisExpireTime',
          className: 'col5',
          sortable: 'custom'
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
      this.orderByType = v.order === 'normal' ? '' : v.order
      if (v.key === 'whoisApplyTime') {
        this.orderByProperty = 'applyDate'
      } else if (v.key === 'whoisExpireTime') {
        this.orderByProperty = 'expireDate'
      } else {
        this.orderByProperty = v.key
      }
      // sort.sortValue = v.order
      // console.log(sort)
      this.queryList({pageNum: 1})
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
        orderByProperty: this.orderByProperty,
        orderByType: this.orderByType
      }
      // Object.assign(params, obj)
      // console.log('=======================================================')
      // console.log(params)
      // console.log('=======================================================')
      return params
    },
    queryList (obj) {
      this.list = []
      this.$store.dispatch('FOLLOW_DOMAIN_LIST', this.queryListParam(obj)).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          response.data.data.list.map((v, i) => {
            if (v.excepInfo.length) {
              v._expanded = true
            }
            this.$set(this.list, i, v)
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
    },
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
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
      // // 域名列表
      // this.queryList({pageNum: 1})
      // // 监控通知
      // this.getBrandList()
      // let id = this.$route.params.id
      // if (id) {
      //   this.showDetailFun(id)
      // }
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
<style scoped>
.contBrandLib .secMain {
    background: none;
}
.contBrandLib .filterWrap {
  padding: 10px 0px;
}
.contBrandLib .filterWrap .ivu-btn{
  margin-left: 10px;
}
.contBrandLib .secFilter .compSelect{
  width: 100%;
}
.contBrandLib .list li{
  padding: 18px 0 0 0;
  height:325px;
  margin-bottom:20px;
  background:#fff;
}
.contBrandLib .list h3{
  font-size:16px;
  font-weight:200;
  padding-left:17px;
  padding-right:20px;
  border-left:3px solid #2271f4;
  margin-bottom:38px;
}
.contBrandLib .list h3 .right{
  float:right;
}
.contBrandLib .list h3 a{
  font-size:12px;
  font-weight:normal;
  color:#2372f3;
  display:inline-block;
  margin-left:10px;
}
.contBrandLib .list .logo{
  width:80px;
  height:80px;
  border-radius:100%;
  overflow:hidden;
  display:inline-block;
  border:5px solid #fff;
  vertical-align:middle;
  -moz-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  -webkit-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  box-shadow:0px 0px 6px rgba(0,0,0,0.2);
}
.contBrandLib .list .logo img{
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.contBrandLib .list .col1{
  text-align:center;
  height:178px;
  line-height:178px;
  vertical-align:middle;
}
.contBrandLib .list .row1{
  font-size:16px;
  padding-bottom:25px;
  margin-bottom:0px!important;
}
.contBrandLib .list .row1 span{
  font-size:16px!important;
}
.contBrandLib .list .row1 a{
  font-size:12px;
  float:right;
  text-decoration:underline;
  margin-top:10px;
}

.contBrandLib .list .row1 em{
  font-size:24px;
  font-weight:600;
}
.contBrandLib .list .col2 strong{
  display:block;
  margin-bottom:25px;
}
.contBrandLib .list .col2 strong{
  font-size:16px;
}
.contBrandLib .list .col2Cont {
  border-right:1px solid #ededed;
  padding-right:50px;
}
.contBrandLib .list .col2Cont > div,
.contBrandLib .list .col3Cont > div{
  margin-bottom:10px;
}
.contBrandLib .list .col2Cont > div span,
.contBrandLib .list .col3Cont > div span{
  color:#666;
  font-size:12px;
}
.contBrandLib .list .col3Cont{
  padding:49px 50px 0 50px;
}
.contBrandLib .list .col3Cont .row1 .left,
.contBrandLib .list .col3Cont .row1 .item{
  font-size: 12px!important;
  float: left;
  line-height: 18px;
}
.contBrandLib .list .col3Cont .right{
  display: block;
  overflow: hidden;
}
.contBrandLib .list .col3Cont .row1 .item{
  width: 50%;
  margin-bottom: 10px;
}
.contBrandLib .list .col3Cont .row1 .ivu-icon{
  color: #f00;
  font-size: 17px;
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.contBrandLib .detailCont .h2T{
  font-size: 25px;
  margin-bottom: 30px;
  font-weight: normal;
}
.contBrandLib .detailCont .cont1{
  margin-bottom: 35px;
}
.contBrandLib .detailCont .cont1 .ivu-col{
  padding: 50px 0;
  background: #fff;
}
.contBrandLib .detailCont .cont1 .ivu-col>div{
  overflow: hidden;
  height: 130px;
  padding-left: 40px;
}
.contBrandLib .detailCont .cont1 .ivu-col:nth-child(1)>div{
  border-right: 1px solid #ededed;
}
.contBrandLib .detailCont .cont1 .logo{
  width:80px;
  height:80px;
  border-radius:100%;
  overflow:hidden;
  border:5px solid #fff;
  vertical-align:middle;
  margin-right: 50px;
  margin-top: 20px;
  float: left;
  -moz-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  -webkit-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  box-shadow:0px 0px 6px rgba(0,0,0,0.2);
}
.contBrandLib .detailCont .cont1 .logo img{
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.contBrandLib .detailCont .cont1 .info{
  overflow: hidden;
}
.contBrandLib .detailCont .cont1 .info h4{
  font-size: 19px;
  margin-bottom: 20px;
}
.contBrandLib .detailCont .cont1 .info ul{
  margin-bottom: 20px;
}
.contBrandLib .detailCont .cont1 .info li{
  color: #666;
  padding: 7px 0;
  font-size: 12px;
}
.contBrandLib .detailCont .cont1 .chart{
  width: 100px;
  height: 100px;
  float: left;
  margin-right: 40px;
  margin-top: 15px;
  background: #999;
}
.contBrandLib .detailCont .cont1 .info strong{
  display: block;
  font-size: 19px;
  font-weight: normal;
  text-align: left;
  margin-bottom: 20px;
  padding-top: 40px;
}
.contBrandLib .detailCont .cont1 .info a{
  color: #2271f4;
  font-size: 12px;
}
.contBrandLib .detailCont .cont2{
  margin-bottom: 35px;
}
.contBrandLib .detailCont .cont2 .ivu-col{
  padding: 50px 0;
  background: #fff;
}
.contBrandLib .detailCont .cont2 .ivu-col>div{
  height: 220px;
}
.contBrandLib .detailCont .cont2 .ivu-col:nth-child(1)>div{
  border-right: 1px solid #ededed;
}
.contBrandLib .detailCont .cont3 .ivu-col{
  margin-bottom: 20px;
}
.contBrandLib .detailCont .cont3 .ivu-col>div{
  background: #fff;
  padding: 20px;
}
.contBrandLib .detailCont .cont3 .h3T{
  font-weight: normal;
  margin-bottom: 20px;
}
.contBrandLib .detailCont .cont3 .h3T .t{
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  display:inline-block;
}
.contBrandLib .detailCont .cont3 .h3T .tR{
  float: right;
  font-size: 12px;
}
.contBrandLib .detailCont .cont3 .h3T .tR a.text{
  display:inline-block;
  line-height: 16px;
  color: #2271f4;
}
.contBrandLib .detailCont .cont3 li{
  font-size: 12px;
  color: #666;
}
.contBrandLib .detailCont .cont3 li .ivu-icon{
  color: #f00;
  font-size: 17px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: -3px;
}
</style>
