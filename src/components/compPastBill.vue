<template lang="pug">
div(:class="historyData.thisCycle !== '' ? ('status_'+historyData.status) : ''")
  div.none(v-show="historyData.thisCycle === ''") 暂无往期账单
  div(v-show="historyData.thisCycle !== ''")
    .filter
      span.text 记账周期
      comp-select(name="",:list="historyCycleList",ref="historyCycle",styles="width:200px")
      Button(type="primary", @click="queryHistoryCycle",:loading="loadingBtn") 查询
    .totalInfo
      Tooltip(content="账单金额=信用消费-退款抵扣", placement="bottom-start")
        <Icon custom="i-icon i-icon-tips" size="16" />
      span.text 账单金额：<em> {{historyData.totalMoney}} </em>元
    table
      tr
        td.col1
          span.n 信用消费：
          span.v {{historyData.creditMoney}} 元
        td.col2
          span.n 记账周期：
          span.v {{historyData.thisCycle}}
      tr
        td.col1
          span.n 预付费消费：
          span.v {{historyData.payMoney}} 元
        td.col2
          span.n 出账日期：
          span.v {{historyData.outBill}}
      tr
        td.col1
          span.n 存入：
          span.v {{historyData.depositMoney}} 元
        td.col2
          span.n 最晚结款日：
          span.v {{historyData.checkBill}}
      tr
        td.col1
          span.n 退款抵扣：
          span.v {{historyData.returnsMoney}} 元
        td.col2
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compSelect from '@/components/compSelect'
export default {
  name: 'compPastBill',
  components: {
    compSelect
  },
  props: {

  },
  data () {
    return {
      loadingBtn: false,
      historyData: {},
      historyCycleList: [
      ]
    }
  },
  methods: {
    queryHistoryCycle () {
      this.payStatisticsHistoryBill(this.getHistoryCycleParam())
    },
    getHistoryCycleParam () {
      let params = {
        param: {
          historyCycle: this.$refs.historyCycle.value
        },
        callback: (response) => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            if (!this.historyCycleList.length) {
              this.historyCycleList = response.data.data.historyCycleList.map((value, key, arr) => {
                return {
                  value: value,
                  label: value
                }
              })
            }
            this.historyData = response.data.data
          } else {
            if (response.data.code === '900') {
              this.$Message.error('查询失败')
            }
          }
        }
      }
      console.log(params.param)
      return params
    },
    ...mapActions({
      payStatisticsHistoryBill: types.PAY_STATISTICS_HISTORY_BILL
    })
  },
  beforeMount () {
  },
  mounted () {
    this.payStatisticsHistoryBill(this.getHistoryCycleParam())
  },
  computed: {
  }
}
</script>
<style scoped>
.none{
  text-align: center;
  line-height: 100px;
}
.filter .text{
  display:inline-block;
  margin-right:10px;
  padding-left:10px;
}
.filter button{
  margin-left:10px;
}
.totalInfo{
  font-size:17px;
  text-align:center;
  padding:30px 0;
  color:#666;
}
.totalInfo .i-icon{
  color:#a3a3a3;
  display:inline-block;
  margin:-2px 5px 0 0;
}
.totalInfo em{
  font-size:30px;
  font-weight:600;
}
td{
  width:50%;
  height:29px;
  line-height:29px;
  border-bottom:1px dashed #eee;
  padding:0 10px;
  font-size:12px;
}
td .v{
  float:right;
}
.status_1{
  background:url(../../static/img/img_bill_1.png) no-repeat 95% 0px;
}
.status_2{
  background:url(../../static/img/img_bill_2.png) no-repeat 95% 0px;
}
.status_3{
  background:url(../../static/img/img_bill_3.png) no-repeat 95% 0px;
}
</style>
