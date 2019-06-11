<template lang="pug">
.contBillMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 账单管理

  .secMain
    div.sec.total
      Row
        Col.bill(span="12")
          .colWrap
            Tabs(value="name1")
              TabPane.tabPane1(label="未出账单" name="name1")
                comp-not-out-bill(:billedData='payStatisticsUnBilledData')
              TabPane.tabPane2(label="已出账单" name="name2")
                comp-past-bill()
        Col.quota(span="12")
          .colWrap
            .t
              span.text 信用额度
            .c
              comp-chart-credit-quota(:charData="chartCreditQuotaData")

    div.sec.billFlow
      .t 账单流水
      form.filter(ref="exportForm",method="post" accept-charset="utf-8" :action="exportLink")
        span.text 搜索
        Input(style="width:200px",placeholder="交易单号",name="",ref="",v-model.trim="value")
        DatePicker(type="daterange",placeholder="",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",placement="bottom-end")
        comp-select(name="",:list="payTypeList",ref="payType",placeholder="交易类型",styles="width:200px")
        Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
        a.export(href="javascript:;",@click="exportBill") 导出表格
      .c
        Table(:columns="columns", :data="list", :loading="loadingTable",@on-sort-change="sortChange")
      <!-- 翻页区 -->
      Page(:total="page.pageItems",:current="page.pageNo",:page-size=20,show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange")
</template>

<script>
import * as actions from '@/actions/finance.js'
import compSelect from '@/components/compSelect'
import compNotOutBill from '@/components/compNotOutBill'
import compPastBill from '@/components/compPastBill'
import compChartCreditQuota from '@/components/compChartCreditQuota'
import moment from 'moment'

export default {
  components: {
    compSelect,
    compNotOutBill,
    compPastBill,
    compChartCreditQuota
  },
  data () {
    return {
      exportLink: actions.EXPORT_CUSTOMER_FLOW,
      time: '',
      value: '',
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '交易时间',
          key: 'flowTime',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, moment(this.list[params.index].flowTime).format('YYYY-MM-DD HH:mm:ss'))
            ])
          },
          sortable: true,
          sortMethod: function (a, b, type) {}
        },
        {
          title: '交易单号',
          key: 'flowCode',
          className: 'col2'
        },
        {
          title: '名称',
          key: 'flowName',
          className: 'col3'
        },
        {
          title: '交易类型',
          key: 'flowType',
          className: 'col4',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.DATAS.PAY_TYPE[this.list[params.index].flowType])
            ])
          }
        },
        {
          title: '金额(元)',
          key: 'flowMoney',
          className: 'col5',
          sortable: true,
          sortMethod: function (a, b, type) {},
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.list[params.index].flowMoney + '元')
            ])
          }
        }
      ],
      list: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      payTypeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '预付款存入'
        },
        {
          value: '2',
          label: '信用消费'
        },
        {
          value: '3',
          label: '预付款消费'
        },
        {
          value: '4',
          label: '退款'
        },
        {
          value: '5',
          label: '结款'
        },
        {
          value: '6',
          label: '信用额度增加'
        }
      ],
      chartCreditQuotaData: {},
      payStatisticsUnBilledData: {}
    }
  },
  methods: {
    searchListData () {
      // 查询数据
      this.queryFinanceCustomerFlowList({pageNum: 1})
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryFinanceCustomerFlowList({pageNum: curPage})
    },
    sortChange (v) {
      let sort = {}
      sort.sortType = v.key === 'flowTime' ? 'time' : 'money'
      sort.sortValue = v.order
      console.log(sort)
      this.queryFinanceCustomerFlowList({pageNum: 1, sort: sort})
    },
    exportBill () {
      this.$refs.exportForm.submit()
    },
    queryFinanceCustomerFlowListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        createTimeBegin: this.time[0] !== '' ? moment(this.time[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        createTimeEnd: this.time[1] !== '' ? moment(this.time[1]).format('YYYY-MM-DD') + ' 23:59:59' : '',
        flowCode: this.value,
        payType: this.$refs.payType.value
      }
      if (obj.sort) {
        Object.assign(params, obj.sort)
      }
      console.log(params)
      return params
    },
    queryFinanceCustomerFlowList (obj) {
      this.$store.dispatch('GET_CUSTOMER_FLOW_LIST', this.queryFinanceCustomerFlowListParam(obj)).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.list = response.data.data.list
          this.page.pageItems = response.data.data.totalNum
        } else {
          // if (response.data.code === '900') {
          //   this.$Message.error('查询失败')
          // }
        }
      }).catch(() => {})
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    this.$store.dispatch('PAY_STATISTICS_UNBILLED').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.payStatisticsUnBilledData = response.data.data
      } else {
        // if (response.data.code === '900') {
        //   this.$Message.error('查询失败')
        // }
      }
    }).catch(() => {})

    this.$store.dispatch('PAY_STATISTICS_BALANCE').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.chartCreditQuotaData = response.data.data
      } else {
        // if (response.data.code === '900') {
        //   this.$Message.error('查询失败')
        // }
      }
    }).catch(() => {})

    this.queryFinanceCustomerFlowList({pageNum: 1})
  }
}
</script>

<style>
.contBillMgmt .secMain{
  background:none;
}
.contBillMgmt .sec{
  margin-bottom:20px;
}
.contBillMgmt .sec .t{
  padding:0 20px 0 0;
}
.contBillMgmt .sec .t .text{
  font-size:14px;
  border-left:3px solid #2271f2;
  display:inline-block;
  height:17px;
  line-height:17px;
  padding-left:15px;
}
.contBillMgmt .sec.total{
  margin-bottom:40px;
}
.contBillMgmt .sec.total .ivu-col{
  height:360px;
}
.contBillMgmt .sec.total .ivu-tabs{
  height:340px;
}
.contBillMgmt .sec.total .bill .colWrap{
  background:#fff;
  margin-right:10px;
  height:100%;
  padding:10px;
}
.contBillMgmt .sec.total .bill .tabPane1{
  padding:0 10px;
}

.contBillMgmt .sec.total .quota .colWrap{
  background:#fff;
  margin-left:10px;
  height:100%;
  padding: 18px 0 0 0;
}
.contBillMgmt .sec.total .quota .c{
  text-align:center;
}

.contBillMgmt .sec.billFlow .t{
  font-size:16px;
  padding-bottom:20px;
  border-bottom:1px solid #ededed;
}
.contBillMgmt .sec.billFlow .filter{
  text-align:center;
  padding: 20px 0;
  font-size:12px;
}
.contBillMgmt .sec.billFlow .filter .text{
  display:inline-block;
  margin-right:10px;
}
.contBillMgmt .sec.billFlow .filter .ivu-input-wrapper,
.contBillMgmt .sec.billFlow .filter .ivu-date-picker,
.contBillMgmt .sec.billFlow .filter .compSelect,
.contBillMgmt .sec.billFlow .filter .ivu-btn{
  margin-right:10px;
}
.contBillMgmt .sec.billFlow .filter .ivu-btn{
  padding-left:30px;
  padding-right:30px;
}
.contBillMgmt .sec.billFlow .filter .compSelect{
  text-align:left;
}
</style>
