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
              TabPane.tabPane1(label="本期账单" name="name1")
                comp-not-out-bill()
              TabPane.tabPane2(label="往期账单" name="name2")
                comp-past-bill()
        Col.quota(span="12")
          .colWrap
            .t
              span.text 信用额度
            .c
              comp-chart-credit-quota()

    div.sec.billFlow
      .t 账单流水
      .filter
        span.text 搜索
        Input(style="width:200px",placeholder="交易单号",name="",ref="",v-model.trim="value")
        DatePicker(type="daterange",placeholder="",v-model="time2",format="yyyy-MM-dd",@on-change="time=$event",placement="bottom-end")
        comp-select(name="",:list="list",ref="",defaultValue="3")
        Button(type="primary", @click="",:loading="loadingBtn") 查询
        a.export(href="javascript:;") 导出表格
      .c
        Table(:columns="columns", :data="clientList", :loading="loadingTable")
      <!-- 翻页区 -->
      Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)
</template>

<script>
import compSelect from '@/components/compSelect'
import compNotOutBill from '@/components/compNotOutBill'
import compPastBill from '@/components/compPastBill'
import compChartCreditQuota from '@/components/compChartCreditQuota'
export default {
  components: {
    compSelect,
    compNotOutBill,
    compPastBill,
    compChartCreditQuota
  },
  data () {
    return {
      time1: '',
      time2: '',
      value: '',
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '到期日期',
          key: 'createTime',
          className: 'col1',
          sortable: true
        },
        {
          title: '交易单号',
          key: 'name',
          className: 'col2'
        },
        {
          title: '名称',
          key: 'customerUserId',
          className: 'col3'
        },
        {
          title: '交易类型',
          key: 'accountPeriod',
          className: 'col4'
        },
        {
          title: '金额(元)',
          key: 'creditBalance',
          className: 'col5',
          sortable: true
        }
      ],
      clientList: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      list:[]
    }
  },
  methods: {
    pageChange () {
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted(){

  }
}
</script>

<style scoped>
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
</style>
