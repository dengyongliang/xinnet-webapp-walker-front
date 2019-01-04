<template lang="pug">
.pageReport
  header-body
  .mainBody
    .img
      p XXXXX有限公司
      strong 报告中心
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
      loadingBtn: false
    }
  },
  methods: {
    ...mapActions({
      submitTransferIn: types.SUBMIT_TRANSFER_IN
    })
  },
  computed: {
  },
  beforeMount () {
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
