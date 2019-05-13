<template lang="pug">
  Form.step.step2(form="", ref="form3",)
    comp-re-password(defaultValue="",ref="compRePassword",label1="请输入密码：",label2="请重复密码：",placeholder1="",placeholder2="",type="rePassword")
    FormItem.btn(label=" ")
      Button(type="primary", @click="submit", :loading="loadingBtn") 确定
</template>

<script>
import compRePassword from '@/components/compRePassword'
import validateFormResult from '@/global/validateForm'
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
        let params = {
          userCode: this.userCode,
          password: this.$refs.compRePassword.$refs.password.value
        }
        this.$store.dispatch('ACTIVATION_USER_PWD', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('激活成功')
              this.$emit('submitStep')
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户已激活')
              } else {
                this.$Message.error('激活失败')
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
  }
}
</script>
<style scoped>

</style>
