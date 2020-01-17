<template lang="pug">
  Form.updateDepositDomain(:label-width="150")
    FormItem(label="注册商")
      comp-input(name='registrarName',label="注册商",ref="registrarName",:defaultValue="registrarName",:maxLength="50")
    FormItem(label="注册时间")
      comp-date-picker(name='applyDate',label="注册时间",ref="applyDate",:defaultValue="applyDate",:maxLength="50")
    FormItem(label="到期时间")
      comp-date-picker(name='expireDate',label="注册时间",ref="expireDate",:defaultValue="expireDate",:maxLength="50")
    FormItem(label="域名所有者")
      comp-input(name='regUserName',label="域名所有者",ref="regUserName",:defaultValue="regUserName",:maxLength="50")
    FormItem(label="所有者邮箱")
      comp-input(name='regUserEmail',label="所有者邮箱",ref="regUserEmail",:defaultValue="regUserEmail",:maxLength="50")
    div.ivu-modal-footer
      Button(type="primary",@click="saveForm",:loading="loadingBtn") 保存

</template>

<script>
import compInput from './compInput'
import compDatePicker from './compDatePicker'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compDatePicker
  },
  props: {
    domainId: {
      type: Number,
      default: 0
    },
    registrarName: {
      type: String,
      default: ''
    },
    applyDate: {
      type: String,
      default: ''
    },
    expireDate: {
      type: String,
      default: ''
    },
    regUserName: {
      type: String,
      default: ''
    },
    regUserEmail: {
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
    saveForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.registrarName,
        this.$refs.applyDate,
        this.$refs.expireDate,
        this.$refs.regUserName,
        this.$refs.regUserEmail
      ])
      if (result) {
        var params = {
          domainId: this.domainId,
          registrarName: this.$refs.registrarName.value,
          applyDate: this.$refs.applyDate.value,
          expireDate: this.$refs.expireDate.value,
          regUserName: this.$refs.regUserName.value,
          regUserEmail: this.$refs.regUserEmail.value
        }
        this.$store.dispatch('UPDATE_DEPOSIT_DOMAIN', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('更新成功')
              this.$emit('toRefresh')
              this.$emit('closeModal')
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
form.updateDepositDomain .ivu-modal-footer{
  padding-bottom: 20px!important;
}
</style>
