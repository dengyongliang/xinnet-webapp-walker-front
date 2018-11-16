<template lang="pug">
.contMyAccount
  <!-- 标题区 -->
  h1.pageTitle.clear 我的账号
    .tR
      Button(@click="") 修改登录密码
  .secMain
    h3 基本信息
      i
    table
      tr
        td.col1(colspan="2") 姓名：李雷
      tr
        td.col1(colspan="2") 性别：李雷
      tr
        td.col1(colspan="2") 用户名：李雷
      tr
        td.col1(colspan="2") 所属企业：李雷
    h3 联系人信息
      i
    table
      tr
        td.col1 手机：李雷
        td.col2
          a 修改
      tr
        td.col1 座机：李雷
        td.col2
          a 修改
      tr
        td.col1(colspan="2") 邮箱：李雷
    h3 管理信息
      i
    table
      tr
        td.col1(colspan="2") 员工角色：李雷
        td
      tr
        td(colspan="2")
          span.n 域名权限：
          .v
            p 河北XXXXX有限公司
            ul
              li <i></i> A组
              li <i></i> B组
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
  },
  computed: {
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>

<style scoped>
.contMyAccount .secMain{
  padding: 20px 60px;
}
.contMyAccount .secMain h3{
  font-size:16px;
  padding: 20px 0;
  border-bottom:1px solid #f0f0f0;
  font-weight:200;
  position:relative;
  color:#000;
}
.contMyAccount .secMain h3 i{
  display:block;
  height:1px;
  background:#145ddd;
  width:30px;
  position:absolute;
  left:0px;
  bottom:-1px;
}
.contMyAccount .secMain table{
  margin-bottom:20px;
}
.contMyAccount .secMain td{
  height:49px;
  line-height:49px;
  border-bottom:1px solid #f0f0f0;
  color:#666;
}
.contMyAccount .secMain td.col2{
  text-align:right;
}
.contMyAccount .secMain td.col2 a{
  color:#145ddd;
}
.contMyAccount .secMain td .n{
  float:left;
}
.contMyAccount .secMain td .v{
  overflow:hidden;
}
.contMyAccount .secMain td li{
  line-height:14px;
  font-size:12px;
  padding-bottom:8px;
}
.contMyAccount .secMain td li i{
  display:inline-block;
  width:8px;
  height:8px;
  background:#1999fe;
  border-radius:100%;
  margin-right:8px;
}
</style>
