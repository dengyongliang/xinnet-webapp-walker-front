<template lang="pug">
.compDomainTransferIn
  Alert.alert1(type="warning", show-icon) 温馨提示：
    Icon(custom="i-icon i-icon-notice_", size="16", slot="icon")
    template(slot="desc") 请将域名与转移密码用空格隔开，每行一个域名，最多可同时过户100个域名。
  Form()
    FormItem(label="")
      comp-input(name='domain',label="域名",ref="domain", type="textarea", styles="width:100%;", placeholder="域名", :defaultValue="defaultValueFormat")
    FormItem(label="")
      span.text 模板：
      comp-select(name='templateId',label="模板",ref="templateId", :list="templateList")
    FormItem(label="")
      Button(type="primary",@click="submitForm",:loading="loadingBtn") 提交过户
</template>

<script>
import compInput from './compInput'
import compSelect from './compSelect'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compSelect
  },
  props: {
    defaultValue: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      loadingBtn: false,
      templateList: []
    }
  },
  methods: {
    close () {
      this.onClose()
    },
    submitForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.domain,
        this.$refs.templateId
      ])

      let domains = this.$refs.domain.value.replace(/[\n\r]/g, ',').split(',')
      if (domains.length > 100) {
        this.$refs.domain.showValidateResult({text: '最多允许一次提交100个域名！'})
        result = false
      } else {
        for (var i = 0; i < domains.length; i++) {
          if (!this.GLOBALS.IS_DOMAIN_AVAILABLE(domains[i])) {
            result = false
            this.$refs.domain.showValidateResult({text: '域名格式错误！'})
            break
          }
        }
      }

      if (result) {
        var params = {
          templateId: this.$refs.templateId.value,
          domainNames: this.$refs.domain.value.replace(/[\n\r]/g, ',')
        }
        this.$store.dispatch('SUBMIT_CHANGE', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success(`提交过户成功：${response.data.countSuccess}个，失败：${response.data.countFaild}个`)
            this.$emit('refreshData')
          } else {
            if (response.data.code === '100') {
              this.$Message.error('模板不存在')
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
  },
  computed: {
    defaultValueFormat () {
      return this.defaultValue.replace(/[,，]/g, '\r\n')
    }
  },
  beforeMount () {
    this.$store.dispatch('TEMPLATES').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.templateList = this.GLOBALS.CONVERT_SELECT(response.data.data, {
          label: 'templateName',
          value: 'id'
        })
      } else {
      }
    }).catch(() => {})
  },
  watch: {
  }
}
</script>
<style>
.compDomainTransferIn{
  padding: 0 30px 30px 30px;
}
.compDomainTransferIn .alert1{
  padding: 10px 10px 10px 32px;
  margin-bottom: 30px;
}
.compDomainTransferIn .alert1 .ivu-alert-icon{
  top: -3px;
  left: 10px;
  margin:0px;
}
.compDomainTransferIn .alert1 .ivu-alert-icon i{
  color: #ffad02;
}
.compDomainTransferIn .alert1 .ivu-alert-message{
  float: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}
.compDomainTransferIn .alert1 .ivu-alert-desc{
  overflow: hidden;
}
.compDomainTransferIn .ivu-input-wrapper textarea{
  height: 200px;
}
.compDomainTransferIn .ivu-btn{
  margin-top: 30px;
}
</style>
