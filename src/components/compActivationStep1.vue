<template lang="pug">
  Form.step.step1(form="", ref="form1",)
    p 管理员已为您设置姓名，为了账号安全，请输入您的真实姓名进行验证。
    FormItem(label="姓名：")
      comp-input(name='userName',label="姓名",ref="userName",defaultValue="",placeholder="请输入姓名",)
    FormItem.btn(label=" ")
      Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
</template>

<script>
import {mapState, mapActions} from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import validateFormResult from '@/global/validateForm'
export default {
  name: 'compActivationStep1',
  components: {
    compInput
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
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userName
      ])
      if (result) {
        var params = {
          param: {
            userCode: this.userCode,
            userName: this.$refs.userName.value
          },
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.$Message.success('验证成功')
              this.$store.commit(types.SET_ACTIVATION_DATA, response.data)
              this.$store.commit(types.SET_ACTIVATION_DATA, params.param)
              this.$emit('submitStep')
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else {
                this.$Message.error('验证失败')
              }
            }
          }
        }
        this.checkValidUser(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      checkValidUser: types.CHECK_VALID_USER
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'activation'
    ])
  }
}
</script>
<style scoped>

</style>
