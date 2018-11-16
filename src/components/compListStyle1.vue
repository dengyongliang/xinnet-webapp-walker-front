<template lang="pug">
ul.listStyle1
  li
    h3.clear 主体公司
      span.right
        a 修改
        a 删除企业
    Row
      Col.col1(span="6")
        span.logo
          img(src="../../static/img/img_list_none.png")
      Col.col2(span="8")
        strong.clear  河北天翼实业集团有限公司
        .col2Cont
          .row1.clear
            span.left 员工数量：<em>12</em>个
            a 员工详情
          .row2.clear
            span.left 联系人：12人
          .row3.clear
            span.left 手机：12人
          .row4.clear
            span.left 固话：12人
          .row5.clear
            span.left 邮箱：12人
      Col.col3(span="10")
        .col3Cont
          .row1.clear
            span.left 域名总数：12人
            a.right 域名详情
          .row2.clear
            span.left <i></i>云主机部：
            span.right 12人
          .row3.clear
            span.left <i></i>云主机部
            span.right 12人
          .row4.clear
            span.left <i></i>云主机部
            span.right 12人
          .row5.clear
            span.left <i></i>邮局部
            span.right 12人
          .row6.clear
            span.left <i></i>...
            a.right 全部分组
  li
    h3.clear 主体公司
      span.right
        a 修改
        a 删除企业
    Row
      Col.col1(span="6")
        span.logo
          img(src="../../static/img/img_list_none.png")
      Col.col2(span="8")
        strong.clear  河北天翼实业集团有限公司
        .col2Cont
          .row1.clear
            span.left 员工数量：<em>12</em>个
            a 员工详情
          .row2.clear
            span.left 联系人：12人
          .row3.clear
            span.left 手机：12人
          .row4.clear
            span.left 固话：12人
          .row5.clear
            span.left 邮箱：12人
      Col.col3(span="10")
        .col3Cont
          .row1.clear
            span.left 域名总数：12人
            a.right 域名详情
          .row2.clear
            span.left <i></i>云主机部：
            span.right 12人
          .row3.clear
            span.left <i></i>云主机部
            span.right 12人
          .row4.clear
            span.left <i></i>云主机部
            span.right 12人
          .row5.clear
            span.left <i></i>邮局部
            span.right 12人
          .row6.clear
            span.left <i></i>...
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
  height:325px;
  margin-bottom:20px;
  background:#fff;
}
.listStyle1 h3{
  font-size:16px;
  font-weight:200;
  padding-left:17px;
  padding-right:20px;
  border-left:3px solid #2271f4;
  margin-bottom:38px;
}
.listStyle1 h3 .right{
  float:right;
}
.listStyle1 h3 a{
  font-size:12px;
  font-weight:200;
  color:#2372f3;
  display:inline-block;
  margin-left:10px;
}
.listStyle1 .logo{
  width:80px;
  height:80px;
  border-radius:100%;
  overflow:hidden;
  display:inline-block;
  border:5px solid #fff;
  vertical-align:middle;
  -moz-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  -webkit-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  box-shadow:0px 0px 6px rgba(0,0,0,0.2);
}
.listStyle1 .col1{
  text-align:center;
  height:178px;
  line-height:178px;
  vertical-align:middle;
}
.listStyle1 .row1{
  font-size:16px;
  padding-bottom:25px;
  margin-bottom:0px!important;
}
.listStyle1 .row1 span{
  font-size:16px!important;
}
.listStyle1 .row1 a{
  font-size:12px;
  float:right;
  text-decoration:underline;
  margin-top:10px;
}

.listStyle1 .row1 em{
  font-size:24px;
  font-weight:600;
}
.listStyle1 .col2 strong{
  display:block;
  margin-bottom:25px;
}
.listStyle1 .col2 strong{
  font-size:16px;
}
.listStyle1 .col2Cont {
  border-right:1px solid #ededed;
  padding-right:50px;
}
.listStyle1 .col2Cont > div,
.listStyle1 .col3Cont > div{
  margin-bottom:10px;
}
.listStyle1 .col2Cont > div span,
.listStyle1 .col3Cont > div span{
  color:#666;
  font-size:12px;
}
.listStyle1 .col3Cont {
  padding:49px 50px 0 50px;
}
.listStyle1 .col3Cont .row1 a{
  margin-top:3px;
}
.listStyle1 .col3Cont .right{
  float:right;
  font-size:12px;
}
.listStyle1 .col3Cont a.right{
  text-decoration:underline;
}
.listStyle1 .col3Cont span i{
  display:inline-block;
  width:8px;
  height:8px;
  border-radius:100%;
  margin-right:10px;
}
.listStyle1 .col3Cont .row2 i{
  background:#2295f2;
}
.listStyle1 .col3Cont .row3 i{
  background:#ff8341;
}
.listStyle1 .col3Cont .row4 i{
  background:#62d3fd;
}
.listStyle1 .col3Cont .row5 i{
  background:#febf60;
}
.listStyle1 .col3Cont .row6 i{
  background:#fff;
}
</style>
