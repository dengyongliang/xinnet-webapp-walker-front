<template lang="pug">
  .pageMain
    header-body()
    .mainBody.domainQuery(v-if="islogin")
      .queryCont
        h1 域名注册
        <Input search enter-button placeholder="请输入域名" />
      footer-body()
</template>

<script>
import {mapState} from 'vuex'
import headerBody from '../modular/header'
import footerBody from '../modular/footer'
export default {
  name: 'DOMAIN_QUERY',
  components: {
    headerBody,
    footerBody
  },
  data () {
    return {
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
  },
  computed: {
    ...mapState([
      'islogin'
    ])
  }
}
</script>

<style>
.domainQuery .queryCont{
  width: 1200px;
  height: 462px;
  margin: 100px auto 0 auto;
  background: url(../../static/img/domainQuery/img_01.png) no-repeat 0 0;
}
.domainQuery .queryCont h1{
  color: #fff;
  font-size: 30px;
  text-align: center;
  font-weight: normal;
  padding-top: 140px;
}
.domainQuery .queryCont .ivu-input-wrapper{
  margin: 0px;
  padding: 20px 230px;
}
.domainQuery .queryCont .ivu-input-wrapper input{
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 15px;
  border: none;
}
.domainQuery .queryCont .ivu-input-wrapper input:focus{
  /* border: 2px solid #ff9900!important; */
  box-shadow:0px 0px 0px 2px #ff9900 inset;
}
.domainQuery .queryCont .ivu-input-search{
  width: 90px;
  background: #ff9900!important;
  border-radius: 0px;
  border: none;
}
.domainQuery .queryCont .ivu-input-search i:before{
  font-size: 30px;
  color: #fff;
}
.domainQuery .footer{
  width: 1200px;
  margin: 0 auto;
}
</style>
