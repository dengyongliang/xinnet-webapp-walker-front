<template lang="pug">
  div.tableExpand
    p 异常情况：
     span(v-for="(item, index) in row.excepInfo", :key="index") <Icon type="md-information-circle" />{{item}}
</template>
<script>
export default {
  props: {
    row: Object
  }
}
</script>
<style scoped>
.tableExpand p{
  padding-left: 51px;
}
.tableExpand p span{
  display: inline-block;
  margin-right: 30px;
}
.tableExpand p span i{
  color: #fe3c33;
  font-size: 15px;
}

</style>
