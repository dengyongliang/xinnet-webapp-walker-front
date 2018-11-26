<template lang="pug">
  Form(:label-width="150")
    FormItem(label="座机：")
      comp-input(name='userTel',label="座机",ref="userTel",:defaultValue="defaultValue")
      input(type="hidden",ref="userCode",:value="userCode")
    FormItem(label="")
      Button(type="primary",@click="updateForm",:loading="loadingBtn") 确定
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
    close () {
      this.onClose();
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
            userCode: this.$refs.userCode.value,
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
                vm.$Message.error('更新失败')
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
</style>