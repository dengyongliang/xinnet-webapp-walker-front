<template lang="pug">
div.compDomainMgmtDetail
  .domainName
    h2 ASDFSADFAS.COM
      Icon(type="md-star")

    span.item <Icon custom="i-icon i-icon-renew1" size="16" />自动续费：<em>未开通</em>
    span.item <Icon custom="i-icon i-icon-lock" size="16" />注册局锁：<em>未开通</em>
    span.item <Icon custom="i-icon i-icon-test_" size="16" />实名认证：<em>未开通</em>
    span.item <Icon custom="i-icon i-icon-state" size="16" />域名状态：<em>未开通</em>


    Button(type="primary", @click="",) 监控信息
    Button(type="primary", @click="",) 解析设置
    Button(type="primary", @click="",) 修改DNS

</template>

<script>
export default {
  name: 'compDomainChangeDetail',
  components: {
  },
  props: {
    detailData: {
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
  }
}
</script>
<style scoped>
.compDomainMgmtDetail{
  padding: 0 20px;
}
.compDomainMgmtDetail .domainName{
  background:#fff;
  padding: 20px 20px 30px 20px;
  border-radius: 20px;
  margin-bottom:20px;
  position:relative;
}
.compDomainMgmtDetail .domainName .ivu-btn{
  float:right;
  position:relative;
  top:-30px;
  right: 50px;
  margin-left:15px;
}
.compDomainMgmtDetail .domainName h2{
  font-size: 40px;
  margin-bottom:20px;
}
.compDomainMgmtDetail .domainName .ivu-icon{
  font-size: 24px;
}
.compDomainMgmtDetail .domainName .item{
  display:inline-block;
  margin-right:30px;
  font-size:12px;
}
.compDomainMgmtDetail .domainName .item .ivu-icon{
  color:#aaa;
  margin-right:5px;
}
</style>
