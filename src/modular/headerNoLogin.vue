<template lang="pug">
  .frameTop.clear
    .logo
      img(src="../../static/img/logo.png")
    .right
      a(href="http://www.xinnet.com",target="_blank") 新网首页
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  beforeMount () {
  }
}
</script>

<style scoped>
.frameTop{
  width: 100%;
  height: 50px;
  position:fixed;
  left:0px;
  top:0px;
  background: #fff;
  line-height: 50px;
  z-index: 999;
  -moz-box-shadow:1px 1px 3px rgba(0,0,0,0.2);
  -webkit-box-shadow:1px 1px rgba(0,0,0,0.2);
  box-shadow:1px 1px 3px rgba(0,0,0,0.2);
}
.frameTop .logo{
  width:200px;
  text-align:center;
  height: inherit;
  line-height: 40px;
  display: inline-block;
  background:#135edb;
  vertical-align:top;
}
.frameTop .logo img{
  vertical-align:middle;
}
.frameTop .right{
  float:right;
  font-size:12px;
  color:#666;
  margin-right:20px;
}
.frameTop .avatar{
  cursor:pointer;
}
.frameTop .avatar .name{
  display:inline-block;
  margin:0 10px;
}
.frameTop .avatar .ivu-icon{
  font-size:17px;
}
.frameTop .avatar .ivu-avatar{
  width:18px;
  height:18px;
}
.frameTop .email{
  position:relative;
}
.frameTop .email .ivu-icon{
  font-size:26px;
}
.frameTop .email .num{
  position:absolute;
  right:0px;
  top:0px;
  background:#f00;
  color:#fff;
  font-size:12px;
  width:16px;
  height:16px;
  line-height:16px;
  display:block;
  text-align:center;
  border-radius:100%;
  margin: -10px -5px 0 0;
}
.frameTop .line{
  display:inline-block;
  color:#e5e5e5;
  margin:0 20px;
}
.frameTop .exit{
  margin-left:20px;
}
.frameTop .ivu-poptip-arrow{
  display:none;
}
</style>