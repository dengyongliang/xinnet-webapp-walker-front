<template lang="pug">
div
  .totalInfo
    Tooltip(content="应结款项为当前账期应结算信用消费金额", placement="bottom-start")
      <Icon custom="i-icon i-icon-tips" size="16" />
    span.text 应结款项：<em> {{billedData.creditMoney}} </em>元
  table
    tr
      td.col1
        span.n 信用消费：
        span.v {{billedData.creditMoney}} 元
      td.col2
        span.n 结算周期：
        span.v {{billedData.thisCycle}}
    tr
      td.col1
        span.n 预付费消费：
        span.v {{billedData.payMoney}} 元
      td.col2
        span.n 出账日期：
        span.v {{billedData.outBill}}
    tr
      td.col1
        span.n 预付款存入：
        span.v {{billedData.depositMoney}} 元
      td.col2
        span.n 最晚结算日期：
        span.v {{billedData.checkBill}}
    tr
      td.col1
        span.n 信用消费退款：
        span.v {{billedData.returnsMoney}} 元
      td.col2
</template>

<script>
export default {
  name: 'compNotOutBill',
  props: {
    billedData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
  },
  watch: {
    billedData: function (val, oldVal) {
    }
  }
}
</script>
<style scoped>
.totalInfo{
  font-size:17px;
  text-align:center;
  padding:40px 0 52px 0;
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
</style>
