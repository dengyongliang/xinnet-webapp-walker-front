<template lang="pug">
  Form.step.step1(form="", ref="form1",)
    p 管理员已为您设置姓名，为了账号安全，请输入您的真实姓名进行验证。
    FormItem(label="姓名：")
      comp-input(name='userName',label="姓名",ref="userName",defaultValue="",placeholder="请输入姓名",)
    FormItem.btn(label=" ")
      Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
</template>

<script>
import {mapState} from 'vuex'
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
          userCode: this.userCode,
          userName: this.$refs.userName.value
        }
        this.$store.dispatch('VALID_USER', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('验证成功')
              this.$store.commit('SET_ACTIVATION_DATA', response.data)
              this.$store.commit('SET_ACTIVATION_DATA', params.param)
              this.$emit('submitStep')
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else {
                this.$Message.error('验证失败')
              }
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
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
