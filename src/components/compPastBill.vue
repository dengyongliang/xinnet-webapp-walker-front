<template lang="pug">
div
  .filter
    span.text 记账周期
    DatePicker(type="daterange",placeholder="",v-model="time1",format="yyyy-MM-dd",@on-change="time=$event",placement="bottom-start")
  .totalInfo
    Tooltip(content="账单金额=信用消费-退款抵扣", placement="bottom-start")
      <Icon custom="i-icon i-icon-tips" size="16" />
    span.text 账单金额：<em> 4545454 </em>元
  table
    tr
      td.col1
        span.n 信用消费：
        span.v 521212元
      td.col2
        span.n 记账周期：
        span.v 521212元
    tr
      td.col1
        span.n 预付费消费：
        span.v 521212元
      td.col2
        span.n 出账日期：
        span.v 521212元
    tr
      td.col1
        span.n 存入：
        span.v 521212元
      td.col2
        span.n 最晚结款日：
        span.v 521212元
    tr
      td.col1
        span.n 退款抵扣：
        span.v 521212元
      td.col2
</template>

<script>
export default {
  name: 'compPastBill',
  props: {

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
  }
}
</script>
<style scoped>
.filter .text{
  display:inline-block;
  margin-right:10px;
  padding-left:10px;
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
  padding:0 20px;
}
td .v{
  float:right;
}
</style>
