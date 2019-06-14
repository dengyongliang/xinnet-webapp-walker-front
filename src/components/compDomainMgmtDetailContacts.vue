<template lang="pug">
div.compDomainMgmtDetailContacts
  input(:value="detailData.id", type="hidden", ref="domainId")
  Row(type="flex", align="middle")
    Col.col1(span="6")
      div
        img(src="../../static/img/img_cn1.png")
        strong 管理机构中文信息
    Col.col2(span="18")
      Form(:label-width="200")
        FormItem(label="管理机构（中文）：", required)
          span.text {{detailData.admUserInfo?detailData.admUserInfo.organizeNameCn:''}}
            <a href="javascript:;" v-show="detailData.depositFlag===1" @click="showOrder">修改</a>
            <a href="javascript:;" v-show="detailData.depositFlag===0" @click="updateOrganizeNameCn">修改</a>
            //- router-link(to="/domain/change", v-show="detailData.updateFlag===0") 修改
          //- comp-input(name='organizeNameCn',label="管理机构",ref="organizeNameCn",:maxLength="100",styles="width:300px", :defaultValue="detailData.admUserInfo?detailData.admUserInfo.organizeNameCn:''", )
        FormItem(label="管理联系人（中文）：", required)
          comp-input(name='userNameCn',label="管理联系人",ref="userNameCn",styles="width:300px", :maxLength="100", :defaultValue="detailData.admUserInfo?detailData.admUserInfo.userNameCn:''", )
        FormItem(label="所属区域：", required)
          compCascader(styles="width:300px;",:list="areaList", ref="area", :defaultValue="area")
        FormItem(label="通讯地址（中文）：", required)
          comp-input(name='streetCn',label="通讯地址",ref="streetCn",styles="width:300px",:maxLength="100", :defaultValue="detailData.admUserInfo?detailData.admUserInfo.publicStreetCn:''", )
        FormItem(label="邮政编码：", required)
          comp-input(name='zipCode',label="邮政编码",ref="zipCode",styles="width:300px",:maxLength="6", :defaultValue="detailData.admUserInfo?detailData.admUserInfo.publicZipCode:''", )
        FormItem(label="电子邮件：", required)
          comp-input(name='userEmail',label="电子邮件",ref="userEmail",validate="email",styles="width:300px",:maxLength="64", :defaultValue="detailData.admUserInfo?detailData.admUserInfo.userEmail:''", )
        FormItem(label="电话：", required)
          comp-three-input(name='userTel',label="电话",ref="userTel",:defaultValue1="detailData.admUserInfo?detailData.admUserInfo.userPhoneInter:''", :defaultValue2="detailData.admUserInfo?detailData.admUserInfo.userPhoneArea:''", :defaultValue3="detailData.admUserInfo?detailData.admUserInfo.userPhoneNumber:''",)
        FormItem(label="传真：", required)
          comp-three-input(name='userFax',label="传真",ref="userFax",:defaultValue1="detailData.admUserInfo?detailData.admUserInfo.userFaxInter:''", :defaultValue2="detailData.admUserInfo?detailData.admUserInfo.userFaxArea:''", :defaultValue3="detailData.admUserInfo?detailData.admUserInfo.userFaxNumber:''", )

  Divider()
  Row(type="flex", align="middle")
    Col.col1(span="6")
      div
        img(src="../../static/img/img_en1.png")
        strong 管理机构英文信息
    Col.col2(span="18")
      Form(:label-width="200")
        FormItem(label="管理机构（英文）：", required)
          span.text {{detailData.admUserInfo?detailData.admUserInfo.organizeNameUk:''}}
            <a href="javascript:;" v-show="detailData.depositFlag===1" @click="showOrder">修改</a>
            <a href="javascript:;" v-show="detailData.depositFlag===0" @click="updateOrganizeNameCn">修改</a>
            //- router-link(to="/domain/change", v-show="detailData.updateFlag===0") 修改
          //- comp-input(name='organizeNameUk',label="管理机构",ref="organizeNameUk",styles="width:300px", :defaultValue="detailData.admUserInfo?detailData.admUserInfo.organizeNameUk:''", )
        FormItem(label="域名联系人（英文）：", required)
          comp-input(name='userNameUk',label="英文名",ref="userNameUk",styles="width:300px", placeholder="英文名", :defaultValue="detailData.admUserInfo?detailData.admUserInfo.userNameUk:''",)
        FormItem(label="",)
          comp-input(name='userSureNameUk',label="英文姓",ref="userSureNameUk",styles="width:300px", placeholder="英文姓", :defaultValue="detailData.admUserInfo?detailData.admUserInfo.userSureNameUk:''",)
        FormItem(label="通讯地址（英文）：", required)
          comp-input(name='streetUk',label="通讯地址",ref="streetUk",styles="width:300px", :defaultValue="detailData.admUserInfo?detailData.admUserInfo.publicStreetUk:''", )
  .btn
    Button(type="primary",@click="formSubmit",:loading="loadingBtn") 保存
</template>

<script>
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
      defaulte: 'modify'
    },
    disabled: {
      type: Boolean,
      defaulte: true
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
    showOrder () {
      this.$emit('showWorkOrder')
    },
    updateOrganizeNameCn () {
      if (this.detailData.updateFlag !== 0) {
        this.$Message.error('域名安全服务禁止更新开通不允许修改域名所有者信息，请关闭后再提交修改！')
        return false
      }
      this.$router.push('/domain/change')
    },
    formSubmit () {
      if (this.detailData.updateFlag !== 0) {
        this.$Message.error('域名安全服务禁止更新开通不允许修改域名所有者信息，请关闭后再提交修改！')
        return false
      }
      this.loadingBtn = true
      let result = validateFormResult([
        // this.$refs.organizeNameCn,
        this.$refs.userNameCn,
        this.$refs.area,
        this.$refs.streetCn,
        this.$refs.zipCode,
        this.$refs.userEmail,
        this.$refs.userTel,
        this.$refs.userFax,
        // this.$refs.organizeNameUk,
        this.$refs.userNameUk,
        this.$refs.userSureNameUk,
        this.$refs.streetUk
      ])
      if (result) {
        let params = {
          domainId: this.$refs.domainId.value,
          // organizeNameCn: this.$refs.organizeNameCn.value,
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
          // organizeNameUk: this.$refs.organizeNameUk.value,
          userSureNameUk: this.$refs.userSureNameUk.value,
          userNameUk: this.$refs.userNameUk.value,
          streetUk: this.$refs.streetUk.value
        }
        this.$store.dispatch('MOD_DOMAIN_ADM_USER', params).then(response => {
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
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
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
        this.$set(this.area, 0, newV.admUserInfo ? newV.admUserInfo.publicProvinceUk : '')
        this.$set(this.area, 1, newV.admUserInfo ? newV.admUserInfo.publicCityUk : '')
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style>
.compDomainMgmtDetailContacts{
  padding: 30px 0;
}
.compDomainMgmtDetailContacts .ivu-divider{
  margin: 40px 0;
}
.compDomainMgmtDetailContacts .ivu-form-item .text a{
  display:inline-block;
  margin-left: 40px;
  color:#2071f6;
}
.compDomainMgmtDetailContacts .col1{
  height: 110px;
  text-align: center;
  border-right: 1px solid #f0f0f0;
}
.compDomainMgmtDetailContacts .col1 strong{
  display: block;
  padding-top: 20px;
}
.compDomainMgmtDetailContacts .btn{
  text-align:center;
  padding: 30px 0;
}
</style>
