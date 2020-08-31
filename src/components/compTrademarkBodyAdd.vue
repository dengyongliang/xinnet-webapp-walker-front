<template lang="pug">
    Modal(v-model="modalshow",title="",:footer-hide="true", width="625px", class-name="modalTrademarkBodyAdd",:mask-closable="maskClosable")
      div.clear(slot="header")
        strong 添加监控主体
      Form.updateDepositDomain(:label-width="150", v-if="modalshow")
        FormItem(label="主体名称")
          comp-input(name='applicantCn',label="主体名称",ref="applicantCn",:maxLength="50")
        div.ivu-modal-footer
          Button(@click="close") 取消
          Button(type="primary",@click="saveForm",:loading="loadingBtn") 保存
</template>

<script>
import { mapState } from 'vuex'
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {

  },
  data () {
    return {
      value: '',
      modalshow: false,
      loadingBtn: false
    }
  },
  methods: {
    close () {
      this.modalshow = false
    },
    saveForm () {
      this.loadingBtn = true
      // 校验
      let result = validateFormResult([
        this.$refs.applicantCn
      ])
      if (result) {
        let params = {
          applicantCn: this.$refs.applicantCn.value
        }
        this.$store.dispatch('BODY_TRADEMARK_INSERT', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success('操作成功')
            this.modalshow = false
            this.$emit('queryList')
          } else {
            this.$Message.error(response.data.msg)
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    },
    handleShowModal () {
      this.modalshow = !this.modalshow
    }
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style>
.modalTrademarkBodyAdd .ivu-modal-header{
  height: 100px;
  background: #2271f4;
  text-align: left;
}
.modalTrademarkBodyAdd .ivu-modal-header strong{
  font-size: 16px;
  font-weight: 200;
  color: #fff;
}
.modalTrademarkBodyAdd .ivu-modal-header button{
  float: right;
  margin-right: 50px;
}
.modalTrademarkBodyAdd .ivu-modal-close i{
  color: #fff;
}
.modalTrademarkBodyAdd form{
  padding-top: 20px;
}
.modalTrademarkBodyAdd .ivu-modal-footer{
  padding-bottom: 20px!important;
}
</style>
