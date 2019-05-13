<template lang="pug">
.compDomainTransferIn
  Alert.alert1(type="warning", show-icon) 温馨提示：
    Icon(custom="i-icon i-icon-notice_", size="16", slot="icon")
    template(slot="desc") 1、请将域名与转移密码用空格隔开，每行一个域名，最多可同时转入500个域名。<br />2、若转入失败，系统将自动退款。
  Form()
    FormItem(label="")
      comp-input(name='domain',label="域名",ref="domain", type="textarea", styles="width:100%;", placeholder="域名 密码")
    FormItem(label="")
      span.text 模板：
      comp-select(name='templateId',label="模板",ref="templateId", :list="templateList")
    FormItem(label="")
      span.text 域名管理公司及分组：
      comp-select(name='groupId',label="域名管理分组",ref="groupId", :list="userAuthGroups", :optionGroup="true" )
    FormItem(label="")
      Button(type="primary",@click="submitForm",:loading="loadingBtn") 转入域名
</template>

<script>
import { mapState } from 'vuex'
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
    },
    userCode: {
      type: String,
      default: ''
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
        this.$refs.templateId,
        this.$refs.groupId
      ])
      let domains = this.$refs.domain.value.replace(/[\n\r]/g, ',').split(',')
      if (domains.length > 500) {
        this.$refs.domain.showValidateResult({text: '最多允许一次提交500个域名！'})
        result = false
      } else {
        for (var i = 0; i < domains.length; i++) {
          if (!this.GLOBALS.IS_DOMAIN_AVAILABLE(domains[i].split(' ')[0])) {
            result = false
            this.$refs.domain.showValidateResult({text: '域名格式错误！'})
            break
          }
        }
      }

      if (result) {
        var params = {
          templateId: this.$refs.templateId.value,
          groupId: this.$refs.groupId.value,
          jsonObj: this.$refs.domain.value.replace(/[\n\r]/g, ',').split(',').map((v) => {
            return {
              domainName: v.split(' ')[0],
              domainPwd: v.split(' ')[1],
              orderGoodsType: 5,
              orderType: 4
            }
          })
        }
        this.$store.dispatch('ORDER_CONFIRM', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            response.data.jsonObj.map((v) => {
              v.price = v.goodsNumAndPrice[0].price + '_' + v.goodsNumAndPrice[0].unit
              v.num = v.goodsNumAndPrice[0].num
              v.unit = v.goodsNumAndPrice[0].unit
            })
            this.$store.commit('SET_PAY_ORDERS', response.data)
            this.$router.push({path: '/payConfirm'})
          } else {
            if (response.data.code === '100') {
              this.$Message.error('模板不存在')
            } else if (response.data.code === '200') {
              this.$Message.error('分组不存在')
            } else if (response.data.code === '300') {
              this.$Message.error('账户错误')
            } else if (response.data.code === '400') {
              this.$Message.error('json数据错误')
            } else {
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
  },
  computed: {
    ...mapState({
      userAuthGroups (state) {
        let arrGroups = []
        arrGroups = this.GLOBALS.CONVERT_SELECT_GROUP(state.user.userAuthGroups.companys, {
          value: 'id',
          label: 'name',
          children: 'groups'
        })
        return arrGroups
      }
    })
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
