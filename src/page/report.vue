<template lang="pug">
.pageReport
  header-body
  .mainBody
    .img
      p {{myUserInfo.manageCustomerName}}
      strong(v-show="type==='center'") 报告中心
      strong(v-show="type==='assets'") 域名资产报告
      strong(v-show="type==='own'") 自有域名监控报告
      strong(v-show="type==='budget'") {{start}} ~ {{end}} 域名预算报告
      strong(v-show="type==='spending'") {{start}} ~ {{end}} 域名消费报告
    router-view

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import headerBody from '../modular/header'
export default {
  components: {
    headerBody
  },
  data () {
    return {
      value: '',
      loadingTable: false,
      loadingBtn: false,
      start: '',
      end: '',
      type: 'center'
    }
  },
  methods: {
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      }
    })
  },
  beforeMount () {
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
    this.start = this.$route.query.start
    this.end = this.$route.query.end
  },
  mounted(){
  },
  watch: {
  }
}
</script>

<style>
.pageReport .mainBody{
  width:1200px;
  margin:0 auto;
  padding-top:100px;
  padding-bottom: 50px;
}
.pageReport .mainBody .img{
  height:280px;
  background:url(../../static/img/report/bg.png) no-repeat;
  font-size:30px;
  color:#fff;
  font-weight:400;
  text-align:center;
  padding-top:80px;
  margin-bottom: 30px;
}
.pageReport .mainBody .img p{
  font-size: 18px;
  color: #fff;
  margin-bottom: 22px;
}
.pageReport .mainBody .img strong{
  font-size: 41px;
  color: #fff;
  font-weight: normal;
  display: inline-block;
  border-top: 1px solid rgba(255,255,255,0.5);
  border-bottom: 1px solid rgba(255,255,255,0.5);
  padding: 10px;
}

</style>
