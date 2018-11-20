<template lang="pug">
  .frameTop.clear
    .logo
      img(src="../../static/img/logo.png")
    .right
      Poptip(title="Title", content="content <a>sfs</a>", placement="bottom")
        div(slot="content")
          span 河北有限责任公司
          a(href="javascript:;",@click="",class="btnSwitch") 切换
        span.avatar
          Avatar(src="https://i.loli.net/2017/08/21/599a521472424.jpg",size="small")
          span.name HANMEIMEI
          Icon(type="md-arrow-dropdown")
      span.line |
      span.email
        Icon(type="ios-mail-outline")
        em.num 1
      span.line |
      router-link(to="http://www.xinnet.com") 新网首页
      a(href="javascript:;", @click="logout", class="exit") 退出
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
    logout () {
      let vm = this
      let params = {
        callback: function (response) {
          if( response.data.code === '1000' ){
            vm.$Message.success('登出成功')
            vm.$router.replace({ path: '/login' })
          } else {
          }
        }
      }
      this.loginOut(params)
    },
    ...mapActions({
      loginOut: types.LOGIN_OUT
    })
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