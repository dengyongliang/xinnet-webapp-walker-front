<template lang="pug">
.pageActivation
  header-body
  .mainBody
    h1 欢迎使用行者数字资产管理系统，请按要求激活账户
    Steps(:current="step")
      Step(title="验证姓名")
      Step(title="设置个人信息")
      Step(title="设置密码")

    comp-activation-step1(v-if="step===0",ref="form1",:userCode="userCode",@submitStep="submitStep1",)
    comp-activation-step2(v-if="step===1",ref="form2",:userCode="userCode",@submitStep="submitStep2")
    comp-activation-step3(v-if="step===2",ref="form3",:userCode="userCode",@submitStep="submitStep3")
    comp-activation-step4(v-if="step===3",ref="form4",:userCode="userCode")
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import headerBody from '../modular/headerNoLogin'
import compActivationStep1 from '@/components/compActivationStep1'
import compActivationStep2 from '@/components/compActivationStep2'
import compActivationStep3 from '@/components/compActivationStep3'
import compActivationStep4 from '@/components/compActivationStep4'
export default {
  components: {
    headerBody,
    compActivationStep1,
    compActivationStep2,
    compActivationStep3,
    compActivationStep4
  },
  props: {
    userCode: ''
  },
  data () {
    return {
      step: 0
    }
  },
  methods: {
    submitStep1 () {
      this.step = 1
    },
    submitStep2 () {
      this.step = 2
    },
    submitStep3 () {
      this.step = 3
    }
  },
  computed: {
    ...mapState([
      'activation'
    ])
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
  padding-top:0px;
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
.pageActivation .ivu-steps{
  padding: 36px 225px;
  text-align:center;
}
.pageActivation .ivu-steps .ivu-steps-tail{
  padding:0px;
  top:24px;
}
.pageActivation .ivu-steps .ivu-steps-tail i{
  height:2px;
}
.pageActivation .ivu-steps .ivu-steps-head{
  margin-bottom:5px;
  padding-left:10px;
  margin-left:-10px;
}
.pageActivation .ivu-steps .ivu-steps-head-inner{
  width:50px;
  height:50px;
  line-height:50px;
}
.pageActivation .ivu-steps .ivu-steps-head-inner span{
  font-size:20px!important;
}
.pageActivation .ivu-steps-item:last-child .ivu-steps-tail{
  display:block;
}
.pageActivation .ivu-steps .ivu-steps-head-inner .ivu-icon{
  font-size:50px!important;
  color:#fff!important;
}
.pageActivation .ivu-steps .ivu-steps-main{
  display:block;
}
.pageActivation .ivu-steps .ivu-steps-title{
  font-weight:200;
  color:#000!important;
}
.pageActivation .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail i,
.pageActivation .ivu-steps-item.ivu-steps-status-process .ivu-steps-tail i{
  background:#2271f4;
}
.pageActivation .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner,
.pageActivation .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner{
  background:#2271f4;
}

.pageActivation .step .ivu-form-item-label{
  width:525px;
  height:38px;
  line-height:38px;
  padding-top:0px;
  padding-bottom:0px;
}
.pageActivation .step span.text{
  display:inline-block;
  line-height:38px;
}
.pageActivation .step1 p{
  text-align:center;
  color:#ff7200;
  margin-bottom:30px;
}
.pageActivation .ivu-form-item.btn{
  padding:50px 0;
}
.pageActivation .ivu-form-item.btn button{
  height:45px;
  line-height:40px;
  padding:0 50px;
  font-size:15px;
}

</style>
