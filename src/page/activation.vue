<template lang="pug">
.pageActivation
  .mainBody
    h1 欢迎使用行者数字资产管理系统，请按要求激活账户
    Steps(:current="1")
      Step(title="验证姓名")
      Step(title="设置个人信息")
      Step(title="设置密码")

    Form.step1(form="", ref="form1")
      p 管理员已为您设置姓名，为了账号安全，请输入您的真实姓名进行验证。
      FormItem(label="姓名：")
        comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",)
      FormItem
        Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
    Form.step2(form="", ref="form2")
      FormItem(label="用户名：")
        comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",)
      FormItem(label="姓名：")
        comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",)
      FormItem(label="邮箱：")
        comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",)
      FormItem(label="所属企业：")
        comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",)
      FormItem(label="性别：")
        comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",)
      FormItem(label="座机：")
        comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",)
      FormItem(label="手机号：")
        comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",)
      FormItem(label="短信验证码：")
        comp-input(name='userName',ref="userName",defaultValue="",placeholder="手机/邮箱/用户名",)
      FormItem
        Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
    Form.step3(form="", ref="form3")
      comp-re-password(defaultValue="",ref="compRePassword",label1="请输入密码：",label2="请重复密码：",placeholder1="",placeholder2="",)
      FormItem
        Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import compRePassword from '@/components/compRePassword'
export default {
  components: {
    compInput,
    compRePassword
  },
  data () {
    return {
      modalAlertInfo: {
        show: false,
        title: '',
        content: ''
      },
      loadingBtn: false,
      account: {
        value: '',
        error: 0
      },
      password: {
        value: '',
        error: 0
      },
      verificationCode: {
        value: '',
        error: 0,
        minlength: 6,
        success: false
      }
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
.pageActivation .mainBody{
  width:1200px;
  margin:0 auto;
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
</style>
