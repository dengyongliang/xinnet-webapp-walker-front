<template lang="pug">
div.step1
  Alert.alert1(type="warning", show-icon) 温馨提示：
    Icon(custom="i-icon i-icon-notice_", size="16", slot="icon")
    template(slot="desc") 1、域名持有者名称代表域名的拥有权，请填写与所有者证件完全一致的企业名称或姓名。<br />2、若该域名需备案，请确保域名持有者名称与备案主体名称一致，并完成域名实名认证。
  input(:value="(type!=='create'?templateData.userCode:'')", type="hidden", ref="userCode")
  Form(:label-width="180")
    FormItem(label="模板名称：", required)
      comp-input(name='templateName',label="模板名称",ref="templateName",:maxLength="100",styles="width:300px", :defaultValue="(type!=='create'?templateData.templateName:'')", :disabled="disabled")
        Tooltip(placement="top-end", slot="right")
          span(slot="content", style="color:#fff") 模板名称用作区别同一账户下的不同模板，<br />可填写域名所有人名称、企业名称等。<br />填写样例：行者科技北京分公司
          Icon(custom="i-icon i-icon-tips", size="16")

    FormItem.title(label="域名持有者中文信息")
    Divider(dashed)

    FormItem(label="域名持有者名称（中文）：", required)
      comp-input(name='organizeNameCn',label="域名持有者名称",ref="organizeNameCn",:maxLength="100",styles="width:300px", :defaultValue="(type!=='create'?templateData.organizeNameCn:'')", :disabled="disabled")
    FormItem(label="域名联系人（中文）：", required)
      comp-input(name='userNameCn',label="域名联系人",ref="userNameCn",styles="width:300px", :maxLength="100", :defaultValue="(type!=='create'?templateData.userNameCn:'')", :disabled="disabled")
    FormItem(label="所属区域：", required)
      compCascader(styles="width:300px;",:list="areaList", ref="area", :defaultValue="area", :disabled="disabled")
    FormItem(label="通讯地址（中文）：", required)
      comp-input(name='streetCn',label="通讯地址",ref="streetCn",styles="width:300px",:maxLength="100", :defaultValue="(type!=='create'?templateData.publicStreetCn:'')", :disabled="disabled")
    FormItem(label="邮政编码：", required)
      comp-input(name='zipCode',label="邮政编码",ref="zipCode",styles="width:300px",:maxLength="6", :defaultValue="(type!=='create'?templateData.publicZipCode:'')", :disabled="disabled")
    FormItem(label="电子邮件：", required)
      comp-input(name='userEmail',label="电子邮件",ref="userEmail",validate="email",styles="width:300px",:maxLength="64", :defaultValue="(type!=='create'?templateData.userEmail:'')", :disabled="disabled")
    FormItem(label="电话：", required)
      comp-three-input(name='userTel',label="电话",ref="userTel",:defaultValue1="(type!=='create'?templateData.userPhoneInter:'')", :defaultValue2="(type!=='create'?templateData.userPhoneArea:'')", :defaultValue3="(type!=='create'?templateData.userPhoneNumber:'')", :disabled="disabled")
    FormItem(label="传真：", required)
      comp-three-input(name='userFax',label="传真",ref="userFax",:defaultValue1="(type!=='create'?templateData.userFaxInter:'')", :defaultValue2="(type!=='create'?templateData.userFaxArea:'')", :defaultValue3="(type!=='create'?templateData.userFaxNumber:'')", :disabled="disabled")

    FormItem.title(label="域名持有者英文信息")
    Divider(dashed)

    FormItem(label="域名持有者名称（英文）：", required)
      comp-input(name='organizeNameUk',label="域名持有者名称",ref="organizeNameUk",styles="width:300px", :defaultValue="(type!=='create'?templateData.organizeNameUk:'')", :disabled="disabled")
    FormItem(label="域名联系人（英文）：", required)
      comp-input(name='userNameUk',label="英文名",ref="userNameUk",styles="width:300px", placeholder="英文名", :defaultValue="(type!=='create'?templateData.userNameUk:'')", :disabled="disabled")
    FormItem(label="")
      comp-input(name='userSureNameUk',label="英文姓",ref="userSureNameUk",styles="width:300px", placeholder="英文姓", :defaultValue="(type!=='create'?templateData.userSureNameUk:'')", :disabled="disabled")
    FormItem(label="通讯地址：", required)
      comp-input(name='streetUk',label="通讯地址",ref="streetUk",styles="width:300px", :defaultValue="(type!=='create'?templateData.publicStreetUk:'')", :disabled="disabled")
    FormItem(label="", v-show="type==='create'")
      Button(type="primary",@click="formSubmit",:loading="loadingBtn") 保存
    FormItem(label="", v-show="type==='modify'")
      Button(type="primary",@click="formModifySubmit",:loading="loadingBtn") 保存
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import compCascader from './compCascader'
import compThreeInput from './compThreeInput'
import validateFormResult from '@/global/validateForm'
import citysList from '@/global/crm_citys.js'
export default {
  components: {
    compInput,
    compCascader,
    compThreeInput
  },
  props: {
    onClose: {
      type: Function
    },
    type: {
      type: String,
      defaulte: ''
    },
    disabled: {
      type: Boolean,
      defaulte: true
    },
    templateData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
      value: '',
      loadingBtn: false,
      areaList: [],
      area: []
    }
  },
  methods: {
    formSubmit () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.templateName,
        this.$refs.organizeNameCn,
        this.$refs.userNameCn,
        this.$refs.area,
        this.$refs.streetCn,
        this.$refs.zipCode,
        this.$refs.userEmail,
        this.$refs.userTel,
        this.$refs.userFax,
        this.$refs.organizeNameUk,
        this.$refs.userNameUk,
        this.$refs.userSureNameUk,
        this.$refs.streetUk
      ])
      if (result) {
        let params = {
          param: {
            templateName: this.$refs.templateName.value,
            organizeNameCn: this.$refs.organizeNameCn.value,
            userNameCn: this.$refs.userNameCn.value,
            countryCode: 'cn',
            cityCode: this.$refs.area.value[1],
            streetCn: this.$refs.streetCn.value,
            zipCode: this.$refs.zipCode.value,
            email: this.$refs.userEmail.value,
            phoneInter: this.$refs.userTel.value1,
            phoneArea: this.$refs.userTel.value2,
            phoneNumber: this.$refs.userTel.value3,
            faxInter: this.$refs.userFax.value1,
            faxArea: this.$refs.userFax.value2,
            faxNumber: this.$refs.userFax.value3,
            organizeNameUk: this.$refs.organizeNameUk.value,
            userSureNameUk: this.$refs.userSureNameUk.value,
            userNameUk: this.$refs.userNameUk.value,
            streetUk: this.$refs.streetUk.value
          },
          callback: (response) => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.loadingBtn = false
              this.$Message.success('模板创建成功')
              params.param.userCode = response.data.userCode
              this.$emit('setTemplateData', params.param)
              this.$emit('showStep2')
            } else {
              if (response.data.code === '100' || response.data.code === '200') {
                this.$Message.error('模板名称已存在')
              }
            }
          }
        }
        console.log(params.param)
        this.createTemplate(params)
      } else {
        this.loadingBtn = false
      }
    },
    formModifySubmit () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.templateName,
        this.$refs.organizeNameCn,
        this.$refs.userNameCn,
        this.$refs.area,
        this.$refs.streetCn,
        this.$refs.zipCode,
        this.$refs.userEmail,
        this.$refs.userTel,
        this.$refs.userFax,
        this.$refs.organizeNameUk,
        this.$refs.userNameUk,
        this.$refs.userSureNameUk,
        this.$refs.streetUk
      ])
      if (result) {
        let params = {
          param: {
            userCode: this.$refs.userCode.value,
            templateName: this.$refs.templateName.value,
            organizeNameCn: this.$refs.organizeNameCn.value,
            userNameCn: this.$refs.userNameCn.value,
            countryCode: 'cn',
            cityCode: this.$refs.area.value[1],
            streetCn: this.$refs.streetCn.value,
            zipCode: this.$refs.zipCode.value,
            email: this.$refs.userEmail.value,
            phoneInter: this.$refs.userTel.value1,
            phoneArea: this.$refs.userTel.value2,
            phoneNumber: this.$refs.userTel.value3,
            faxInter: this.$refs.userFax.value1,
            faxArea: this.$refs.userFax.value2,
            faxNumber: this.$refs.userFax.value3,
            organizeNameUk: this.$refs.organizeNameUk.value,
            userSureNameUk: this.$refs.userSureNameUk.value,
            userNameUk: this.$refs.userNameUk.value,
            streetUk: this.$refs.streetUk.value
          },
          callback: (response) => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.loadingBtn = false
              this.$Message.success('模板修改成功')
              this.$emit('refreshData')
            } else {
              if (response.data.code === '200') {
                this.$Message.error('模板名称已存在')
              }
            }
          }
        }
        console.log(params.param)
        this.updateTemplate(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      createTemplate: types.CREATE_TEMPLATE,
      updateTemplate: types.UPDATE_TEMPLATE
    })
  },
  computed: {

  },
  beforeMount () {
    this.areaList = citysList.CITYS_LIST
  },
  mounted () {
  },
  watch: {
    templateData: {
      handler (newV, oldV) {
        this.$set(this.area, 0, newV.publicProvinceUk)
        this.$set(this.area, 1, newV.publicCityUk)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style>
.compDomainCreateTemplate{
  padding: 0 30px 30px 30px;
}
.compDomainCreateTemplate .step1 .alert1{
  padding: 10px 10px 10px 32px;
  margin-bottom: 30px;
}
.compDomainCreateTemplate .step1 .alert1 .ivu-alert-icon{
  top: -3px;
  left: 10px;
  margin:0px;
}
.compDomainCreateTemplate .step1 .alert1 .ivu-alert-icon i{
  color: #ffad02;
}
.compDomainCreateTemplate .step1 .alert1 .ivu-alert-message{
  float: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}
.compDomainCreateTemplate .step1 .alert1 .ivu-alert-desc{
  overflow: hidden;
}
.compDomainCreateTemplate .step1 .ivu-form-item.title{
  margin-bottom: 5px;
}
.compDomainCreateTemplate .step1 .ivu-form-item.title .ivu-form-item-label{
  text-align: left;
  color: #aaa;
  font-size: 14px;
}
.compDomainCreateTemplate .step1 .ivu-divider{
  margin: 0 0 20px 0;
}
.compDomainCreateTemplate .step1 .ivu-tooltip .ivu-icon{
  color: #4aafff;
}
</style>
