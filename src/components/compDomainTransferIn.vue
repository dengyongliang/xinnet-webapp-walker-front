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
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
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
      this.onClose();
    },
    submitForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.domain,
        this.$refs.templateId,
        this.$refs.groupId
      ])
      if (result) {
        let vm = this
        var params = {
          param: {
            templateId: this.$refs.templateId.value,
            groupId: this.$refs.groupId.value,
            jsonObj: this.$refs.domain.value.replace(/[\n\r]/g, ',').split(",").map((v) => {
              return {
                domainName: v.split(" ")[0],
                domainPwd: v.split(" ")[1],
                orderGoodsNum: 1,
                orderGoodsUnit: "Y",
                orderGoodsType: 5,
                orderType: 4
              }
            })
          },
          callback: function (response) {
            vm.loadingBtn = false
            if( response.data.code === '1000' ){
              vm.$Message.success('座机更新成功')

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
        console.log(params.param)
        this.updateUserInfo(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      queryTemplates: types.QUERY_TEMPLATES
    })
  },
  computed: {
    ...mapState({
      userAuthGroups (state) {
        let arrGroups = []
        arrGroups = this.GLOBALS.CONVERT_SELECT_GROUP(state.user.userAuthGroups.slice(1), {
          value: 'id',
          label: 'name',
          children: 'groups'
        })
        console.log('===============================================')
        console.log(arrGroups)
        return arrGroups
      }
    })
  },
  beforeMount () {
    let params = {
      param: {

      },
      callback: (response) => {
        if( response.data.code === '1000' ){
          this.templateList = this.GLOBALS.CONVERT_SELECT(response.data.data, {
            label: 'templateName',
            value: 'id'
          })
        } else {
        }
      }
    }
    this.queryTemplates(params)
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