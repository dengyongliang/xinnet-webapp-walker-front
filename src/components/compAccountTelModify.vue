<template lang="pug">
  Form(:label-width="150")
    FormItem(label="座机：")
      comp-input(name='userTel',label="座机",ref="userTel",:defaultValue="defaultValue")
      input(type="hidden",ref="userCode",:value="userCode")
    FormItem(label="")
      Button(type="primary",@click="updateForm",:loading="loadingBtn") 确定
</template>

<script>
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {
    defaultValue: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function
    },
    userCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    updateForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userTel
      ])
      if (result) {
        var params = {
          userCode: this.$refs.userCode.value,
          userTel: this.$refs.userTel.value
        }
        this.$store.dispatch('UPDATE_USER_INFO', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('座机更新成功')
              this.$store.commit('UPDATE_USER_TEL', this.$refs.userTel.value)
              this.onClose()
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else {
                this.$Message.error('更新失败')
              }
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
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
</style>
