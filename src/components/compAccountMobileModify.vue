<template lang="pug">
  Form(:label-width="150")
    .step1
      FormItem(label="")
        p.tips 请使用账号航妹妹（uidfui）绑定手机号<em>112382783728</em> <br />接收短信验证码
      FormItem(label="")
        comp-input(name='verificationCode',label="短信验证码",ref="verificationCode",defaultValue="",placeholder="短信验证码",styles="width:118px",:maxLength="6")
          Button.verificationCode(@click="getVerificationCode", :loading="loadingBtn",slot="right") 获取短信验证码
      FormItem(label="")
        Button(type="primary",@click="updateForm",:loading="loadingBtn") 下一步
    .step2
      FormItem(label="")
        comp-input(name='userMobile',label="新手机号码",ref="userMobile",defaultValue="",placeholder="请输入新手机号码",:maxLength="11")
      FormItem(label="")
        comp-input(name='verificationCode',label="短信验证码",ref="verificationCode",defaultValue="",placeholder="短信验证码",styles="width:118px",:maxLength="6")
          Button.verificationCode(@click="getVerificationCode", :loading="loadingBtn",slot="right") 获取短信验证码
      FormItem(label="")
        Button(type="primary",@click="updateForm",:loading="loadingBtn") 完成
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    close () {
      this.onClose();
    },
    getVerificationCode () {

    },
    updateForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userTel
      ])
      if (result) {
        let vm = this
        var params = {
          param: {
            userTel: this.$refs.userTel.value
          },
          callback: function (response) {
            vm.loadingBtn = false
            if( response.data.code === '1000' ){
              vm.$Message.success('座机更新成功')
              vm.$store.commit(types.UPDATE_USER_TEL, vm.$refs.userTel.value)
              vm.close()
            } else {
              if (response.data.code === '200') {
                vm.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                vm.$Message.error('用户被锁定')
              } else {
                vm.$Message.error('验证失败')
              }
            }
          }
        }
        this.updateUserInfo(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      updateUserInfo: types.UPDATE_USER_INFO
    })
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
form{
  padding:50px 0 0 0;
}
form .tips{
  font-size:15px;
}
form .tips em{
  color:#ff7101;
}
</style>