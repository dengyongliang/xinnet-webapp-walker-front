<template lang="pug">
.contReportFocus
  h3.h3T 关注域名基本信息
    .tR 共监控域名221个，数据截止时间2018-05-31 23：59
      comp-select(:list="brandList", ref="", :onParentmethod="selectBrandChange" placeholder="全部关注域名监控报告",)
  Row
    Col(span="12")
      .secBox.secBox1
        h4.h4T.clear
          span.t 域名注册情况
        .c
          comp-chart-report-focus-domain-reg(
            :charData="reportFocusDomainReg"
          )

    Col(span="12")
      .secBox.secBox2
        h4.h4T.clear
          span.t 关注域名异常情况
        .c
          comp-chart-report-focus-domain-anomaly(
            :charData="reportFocusDomainAnomaly"
          )

  .secBox.secBox3
    h4.h4T.clear
      span.t 域名到期时间
    .c
      comp-chart-report-focus-domain-expire-time(
        :charData="reportFocusDomainExpireTime"
      )
  h3.h3T 网站类型统计
  Row
    Col(span="12")
      .secBox.secBox4
        h4.h4T.clear
          span.t 域名指向IP情况
          comp-chart-report-focus-domain-ip(
            :charData="reportFocusDomainIp"
          )

    Col(span="12")
      .secBox.secBox5
        h4.h4T.clear
          span.t 品牌相关域名建站情况
          comp-chart-report-focus-domain-brand(
            :charData="reportFocusDomainBrand"
          )

  h3.h3T.clear 异常域名清单
    form.tR(ref="exportForm", method="post" accept-charset="utf-8" :action="exportLink")
      input(type="hidden", name="brandId", :value="brandId")
      a(href="javascript:;",class="exportOrder",@click="exportOrder") 导出表格
  .secTable
    <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20,v-show="!showDetail")

</template>

<script>
import {mapState} from 'vuex'
import compChartReportFocusDomainReg from '@/components/compChartReportFocusDomainReg'
import compChartReportFocusDomainAnomaly from '@/components/compChartReportFocusDomainAnomaly'
import compChartReportFocusDomainExpireTime from '@/components/compChartReportFocusDomainExpireTime'
import compChartReportFocusDomainIp from '@/components/compChartReportFocusDomainIp'
import compChartReportFocusDomainBrand from '@/components/compChartReportFocusDomainBrand'
import compSelect from '@/components/compSelect'
import * as actions from '@/actions/followdomain.js'
export default {
  components: {
    compChartReportFocusDomainReg,
    compChartReportFocusDomainAnomaly,
    compChartReportFocusDomainExpireTime,
    compChartReportFocusDomainIp,
    compChartReportFocusDomainBrand,
    compSelect
  },
  data () {
    return {
      brandId: '',
      exportLink: actions.EXCEP_FOLLOW_RECORD_EXPORT,
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '域名',
          key: 'domainName',
          className: 'col1'
        },
        {
          title: '异常情况',
          key: 'info',
          className: 'col2',
          render: (h, params) => {
            return h('div',
              this.list[params.index].info.map((v) => {
                return h('span', {}, v)
              })
            )
          }
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
              }, '查看详情')
            ])
          }
        }
      ],
      list: [],
      customerId: 0,
      start: '',
      end: '',
      brandList: [],
      reportFocusDomainReg: {},
      reportFocusDomainAnomaly: {},
      reportFocusDomainExpireTime: {},
      reportFocusDomainIp: {},
      reportFocusDomainBrand: {},
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingTable = true
      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        brandId: this.brandId
      }
      return params
    },
    queryList (num) {
      this.$store.dispatch('EXCEP_FOLLOW_RECORD_LIST', this.queryListParam({pageNum: num})).then(response => {
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
    pageChange: function (curPage) {
      this.queryList(curPage)
    },
    exportOrder () {
      this.$refs.exportForm.submit()
    },
    // 域名注册情况
    getDomainReg () {
      this.$store.dispatch('REPORT_FOLLOW_RECORD', {reportType: 1, brandId: this.brandId}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          let arr = []
          let obj = {}
          response.data.data.map((v) => {
            console.log(v.domainSuffix)
            if (arr.indexOf(v.domainSuffix) < 0) {
              obj[v.domainSuffix] = []
              arr.push(v.domainSuffix)
            }
            obj[v.domainSuffix][v.isReg] = v.domainCount
          })
          this.reportFocusDomainReg = obj
        } else {
        }
      }).catch(() => {})
    },
    // 关注域名异常情况
    getDomainAbnormal () {
      this.$store.dispatch('REPORT_FOLLOW_RECORD', {reportType: 5, brandId: this.brandId}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          var obj = {}
          response.data.data.map((v) => {
            obj[v.exceptType] = v.domainCount
          })
          this.reportFocusDomainAnomaly = obj
        } else {
        }
      }).catch(() => {})
    },
    // 域名到期时间
    getDomainExpTime () {
      this.$store.dispatch('REPORT_FOLLOW_RECORD', {reportType: 2, brandId: this.brandId}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          var obj = {}
          response.data.data.map((v) => {
            obj[v.expireYear] = v.domainCount
          })
          this.reportFocusDomainExpireTime = obj
        } else {
        }
      }).catch(() => {})
    },
    // 域名指向IP情况
    getDomainIp () {
      // 域名指向IP情况
      this.$store.dispatch('REPORT_FOLLOW_RECORD', {reportType: 3, brandId: this.brandId}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          var obj = {}
          response.data.data.map((v) => {
            obj[v.ipType] = v.domainCount
          })
          this.reportFocusDomainIp = obj
        } else {
        }
      }).catch(() => {})
    },
    // 品牌相关域名建站情况
    getDomainBrand () {
      this.$store.dispatch('REPORT_FOLLOW_RECORD', {reportType: 4, brandId: this.brandId}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          var obj = {}
          response.data.data.map((v) => {
            obj[v.siteType] = v.domainCount
          })
          this.reportFocusDomainBrand = obj
        } else {
        }
      }).catch(() => {})
    },
    selectBrandChange (brandId) {
      this.brandId = brandId
      this.getDomainReg()
      this.getDomainAbnormal()
      this.getDomainExpTime()
      this.getDomainIp()
      this.getDomainBrand()
      this.queryList(1)
    },
    showDetailFun (id) {
      this.$router.push({name: 'monitor_focus', params: {id: id}})
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      }
    })
  },
  beforeMount () {
    // customerId
    this.start = this.$route.query.start
    this.end = this.$route.query.end
    this.selectBrandChange()
    // 品牌列表
    this.$store.dispatch('FOLLOW_BRAND_LIST', {pageNum: -1, pageSize: -1}).then(response => {
      this.loadingTable = false
      this.loadingBtn = false
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.brandList.push(
          {
            label: '全部关注域名监控报告',
            value: ''
          }
        )
        response.data.data.list.map((v) => {
          this.brandList.push(
            {
              label: v.brandName,
              value: v.id
            }
          )
        })
      } else {
      }
    }).catch(() => {})
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style>
.contReportFocus .h3T{
  font-size: 25px;
  font-weight: normal;
  padding: 0 0 20px 20px;
}
.contReportFocus .h3T .compSelect{
  margin-left: 10px;
}
.contReportFocus .h3T .tR{
  float: right;
  font-size: 14px;
}
.contReportFocus .h3T .tR .num{
  color: #f30a0d;
}
.contReportFocus .h3T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportFocus .h3T .tR .ivu-btn{
  margin: 0 10px;
}
.contReportFocus .h3T .exportOrder{
  margin-top: 5px;
  display: inline-block;
  color: #2d8cf0;
}
.contReportFocus .secBox{
  background: #fff;
  padding: 13px 0;
  margin-bottom: 20px;
}
.contReportFocus .secBox .h4T{
  font-weight: normal;
}
.contReportFocus .secBox .h4T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.contReportFocus .secBox .h4T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.contReportFocus .secBox .h4T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportFocus .secBox .h4T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.contReportFocus .secBox1{
  margin-right: 10px;
}
.contReportFocus .secBox2{
  margin-left: 10px;
}

.contReportFocus .secBox3{
  margin-bottom: 40px;
}

.contReportFocus .secBox4{
  margin-right: 10px;
  margin-bottom: 40px;
}
.contReportFocus .secBox5{
  margin-left: 10px;
  margin-bottom: 40px;
}

.contReportFocus .secTable{
  padding: 0 20px 20px 20px;
  background: #fff;
}
</style>
