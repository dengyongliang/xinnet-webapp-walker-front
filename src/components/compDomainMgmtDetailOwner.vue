<template lang="pug">
div.compDomainMgmtDetailOwner
  input(:value="detailData.id", type="hidden", ref="domainId")
  Row(type="flex", align="middle")
    Col.col1(span="6")
      div
        img(src="../../static/img/img_cn1.png")
        strong 域名持有者中文信息
    Col.col2(span="18")
      Form(:label-width="200")
        FormItem(label="域名持有者名称（中文）：", required)
          span.text {{detailData.regUserInfo?detailData.regUserInfo.organizeNameCn:''}}
            router-link(to="/domain/change", v-show="detailData.updateFlag===0") 修改
        FormItem(label="域名联系人（中文）：", required)
          comp-input(name='userNameCn',label="域名联系人",ref="userNameCn",styles="width:300px", :maxLength="100", :defaultValue="detailData.regUserInfo?detailData.regUserInfo.userNameCn:''",)
        FormItem(label="所属区域：", required)
          compCascader(styles="width:300px;",:list="areaList", ref="area", :defaultValue="area")
        FormItem(label="通讯地址（中文）：", required)
          comp-input(name='streetCn',label="通讯地址",ref="streetCn",styles="width:300px",:maxLength="100", :defaultValue="detailData.regUserInfo?detailData.regUserInfo.publicStreetCn:''",)
        FormItem(label="邮政编码：", required)
          comp-input(name='zipCode',label="邮政编码",ref="zipCode",styles="width:300px",:maxLength="6", :defaultValue="detailData.regUserInfo?detailData.regUserInfo.publicZipCode:''",)
        FormItem(label="电子邮件：", required)
          comp-input(name='userEmail',label="电子邮件",ref="userEmail",validate="email",styles="width:300px",:maxLength="64", :defaultValue="detailData.regUserInfo?detailData.regUserInfo.userEmail:''",)
        FormItem(label="电话：", required)
          comp-three-input(name='userTel',label="电话",ref="userTel",:defaultValue1="detailData.regUserInfo?detailData.regUserInfo.userPhoneInter:''", :defaultValue2="detailData.regUserInfo?detailData.regUserInfo.userPhoneArea:''", :defaultValue3="detailData.regUserInfo?detailData.regUserInfo.userPhoneNumber:''",)
        FormItem(label="传真：", required)
          comp-three-input(name='userFax',label="传真",ref="userFax",:defaultValue1="detailData.regUserInfo?detailData.regUserInfo.userFaxInter:''", :defaultValue2="detailData.regUserInfo?detailData.regUserInfo.userFaxArea:''", :defaultValue3="detailData.regUserInfo?detailData.regUserInfo.userFaxNumber:''",)

  Divider()
  Row(type="flex", align="middle")
    Col.col1(span="6")
      div
        img(src="../../static/img/img_en1.png")
        strong 域名持有者英文信息
    Col.col2(span="18")
      Form(:label-width="200")
        FormItem(label="域名持有者名称（英文）：", required)
          span.text {{detailData.regUserInfo?detailData.regUserInfo.organizeNameUk:''}}
            router-link(to="/domain/change", v-show="detailData.updateFlag===0") 修改

        FormItem(label="域名联系人（英文）：", required)
          comp-input(name='userNameUk',label="英文名",ref="userNameUk",styles="width:300px", placeholder="英文名", :defaultValue="detailData.regUserInfo?detailData.regUserInfo.userNameUk:''",)
        FormItem(label="")
          comp-input(name='userSureNameUk',label="英文姓",ref="userSureNameUk",styles="width:300px", placeholder="英文姓", :defaultValue="detailData.regUserInfo?detailData.regUserInfo.userSureNameUk:''",)
        FormItem(label="通讯地址（英文）：", required)
          comp-input(name='streetUk',label="通讯地址",ref="streetUk",styles="width:300px", :defaultValue="detailData.regUserInfo?detailData.regUserInfo.publicStreetUk:''",)

  .btn
    Button(type="primary",@click="formSubmit",:loading="loadingBtn", v-show="detailData.updateFlag===0") 保存
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
    detailData: {
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
        this.$refs.userNameCn,
        this.$refs.area,
        this.$refs.streetCn,
        this.$refs.zipCode,
        this.$refs.userEmail,
        this.$refs.userTel,
        this.$refs.userFax,
        this.$refs.userNameUk,
        this.$refs.userSureNameUk,
        this.$refs.streetUk
      ])
      if (result) {
        let params = {
          param: {
            domainId: this.$refs.domainId.value,
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
              this.$Message.success('保存成功')
            } else {
              if (response.data.code === '100') {
                this.$Message.error('域名不存在')
              } else if (response.data.code === '200') {
                this.$Message.error('域名禁止更新')
              } else if (response.data.code === '300') {
                this.$Message.error('域名被锁定')
              } else {

              }
            }
          }
        }
        console.log(params.param)
        this.submitModDomainRegUser(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      submitModDomainRegUser: types.SUBMIT_MOD_DOMAIN_REG_USER
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
    detailData: {
      handler (newV, oldV) {
        this.$set(this.area, 0, newV.regUserInfo ? newV.regUserInfo.publicProvinceUk : '')
        this.$set(this.area, 1, newV.regUserInfo ? newV.regUserInfo.publicCityUk : '')
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style>
.compDomainMgmtDetailOwner{
  padding: 30px 0;
}
.compDomainMgmtDetailOwner .ivu-divider{
  margin: 40px 0;
}
.compDomainMgmtDetailOwner .ivu-form-item .text a{
  display:inline-block;
  margin-left: 40px;
  color:#2071f6;
}
.compDomainMgmtDetailOwner .col1{
  height: 110px;
  text-align: center;
  border-right: 1px solid #f0f0f0;
}
.compDomainMgmtDetailOwner .col1 strong{
  display: block;
  padding-top: 20px;
}
.compDomainMgmtDetailOwner .btn{
  text-align:center;
  padding: 30px 0;
}
</style>
