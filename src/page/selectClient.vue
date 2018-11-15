<template lang="pug">
.pageActivation
  header-body
  .mainBody
    comp-list-none(label="暂无管理客户")
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import compListNone from '@/components/compListNone'
import headerBody from '../modular/header'
export default {
  components: {
    compListNone,
    headerBody
  },
  data () {
    return {
      loadingBtn: false,
      sexList: [
        {
            value: '男',
            label: '1'
        },
        {
            value: '女',
            label: '0'
        }
      ]
    }
  },
  methods: {
  },
  computed: {
  },
  beforeMount () {
  },
  mounted(){
  }
}
</script>

<style scope>
.pageActivation{
  background:#f6f8f9;
  padding-top:100px;
}
.pageActivation .mainBody{
  width:1200px;
  margin:0 auto;
  background:#fff;
}
.pageActivation .mainBody h1{
  height:202px;
  line-height:202px;
  background:url(../../static/img/activation/img_01.png) no-repeat;
  font-size:30px;
  color:#fff;
  font-weight:400;
  text-align:center;
}
.pageActivation .ivu-input{
  height:38px;
  line-height:38px;
}
.ivu-steps{
  padding: 36px 225px;
  text-align:center;
}
.ivu-steps .ivu-steps-tail{
  padding:0px;
  top:24px;
}
.ivu-steps .ivu-steps-tail i{
  height:2px;
}
.ivu-steps .ivu-steps-head{
  margin-bottom:5px;
  padding-left:10px;
  margin-left:-10px;
}
.ivu-steps .ivu-steps-head-inner{
  width:50px;
  height:50px;
  line-height:50px;
}
.ivu-steps .ivu-steps-head-inner span{
  font-size:20px!important;
}
.ivu-steps-item:last-child .ivu-steps-tail{
  display:block;
}
.ivu-steps .ivu-steps-head-inner .ivu-icon{
  font-size:50px!important;
  color:#fff!important;
}
.ivu-steps .ivu-steps-main{
  display:block;
}
.ivu-steps .ivu-steps-title{
  font-weight:200;
  color:#000!important;
}
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail i,
.ivu-steps-item.ivu-steps-status-process .ivu-steps-tail i{
  background:#2271f4;
}
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner,
.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner{
  background:#2271f4;
}

.step .ivu-form-item-label{
  width:525px;
  height:38px;
  line-height:38px;
  padding-top:0px;
  padding-bottom:0px;
}
.step span.text{
  display:inline-block;
  line-height:38px;
}
.step1 p{
  text-align:center;
  color:#ff7200;
  margin-bottom:30px;
}
.ivu-form-item.btn{
  padding:50px 0;
}
.ivu-form-item.btn button{
  height:45px;
  line-height:40px;
  padding:0 50px;
  font-size:15px;
}
.step4 p{
  text-align:center;
  font-size:30px;
}
.step4 .p1{
  padding:40px 0;
}
</style>
