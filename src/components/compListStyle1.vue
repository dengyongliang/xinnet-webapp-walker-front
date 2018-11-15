<template lang="pug">
ul.listStyle1
  li
    h3 主体公司
    Row
      Col.col1(span="6")
        span.logo
          img(src="../../static/img/img_list_none.png")
      Col(span="9")
        strong  河北天翼实业集团有限公司
        div.clear
          span.left 员工数量：12人
          a 员工详情
        div.clear
          span.left 联系人：12人
        div.clear
          span.left 手机：12人
        div.clear
          span.left 固话：12人
        div.clear
          span.left 邮箱：12人
      Col(span="9")
        strong
        div.clear
          span.left 域名总数：12人
          a.right 域名详情
        div.clear
          span.left 云主机部：
          span.right 12人
        div.clear
          span.left 云主机部
          span.right 12人
        div.clear
          span.left 云主机部
          span.right 12人
        div.clear
          span.left 邮局部
          span.right 12人
        div.clear
          span.left ...
          a.right 全部分组
</template>

<script>
export default {
  name: 'compListStyle1',
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
.listStyle1 li{
  padding: 18px 0 0 0;
}
.listStyle1 h3{
  font-size:16px;
  font-weight:200;
  padding-left:17px;
  border-left:3px solid #2271f4;
}
.listStyle1 .logo{
  width:80px;
  height:80px;
  border-radius:100%;
  overflow:hidden;
  display:inline-block;
  border:5px solid #fff;
  -moz-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  -webkit-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  box-shadow:0px 0px 6px rgba(0,0,0,0.2);
}
.listStyle1 .col1{
  text-align:center;
}
</style>
