<template lang="pug">
  Form.step.step2(form="", ref="form3",)
    comp-re-password(defaultValue="",ref="compRePassword",label1="请输入密码：",label2="请重复密码：",placeholder1="",placeholder2="",type="rePassword")
    FormItem.btn(label=" ")
      Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
</template>

<script>
import compRePassword from '@/components/compRePassword'
import { mapState, mapActions, mapMutations } from 'vuex'
import validateFormResult from '@/global/validateForm'
import * as types from '@/store/types'
export default {
  name: 'compActivationStep3',
  components: {
    compRePassword
  },
  props: {
    userCode: ''
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    submit () {
      let result = validateFormResult([
        this.$refs.compRePassword
      ])
      if (result) {
        let vm = this
        let params = {
          param: {
            userCode: this.userCode,
            password: this.$refs.compRePassword.$refs.password.value,
          },
          callback: function (response) {
            vm.loadingBtn = false
            if( response.data.code === '1000' ){
              vm.$Message.success('激活成功')
              vm.$emit('submitStep')
            } else {
              if (response.data.code === '200') {
                vm.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                vm.$Message.error('用户已激活')
              } else {
                vm.$Message.error('激活失败')
              }
            }
          }
        }
        this.submitActivationUserPwd(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      submitActivationUserPwd: types.SUBMIT_ACTIVATION_USER_PWD
    })
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

</style>
