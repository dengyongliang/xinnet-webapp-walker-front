<template lang="pug">
  Form.compCompanyCreateInfo(:label-width="90")
    FormItem.title(label="企业信息")
    FormItem(label="企业LOGO：")
      comp-img-upload(:status="status",ref="logoFile",name="upfile",:file="detailData.logoFile",errorText="请上传企业LOGO！",tips="支持jpg、gif、png格式，1M以内，建议尺寸50*50。",:uploadAction="uploadAction", :on-beforecallback="changeUploadStatus", :showCover="showCover", :modify="modify")
    FormItem(label="企业全称：",required)
      comp-input(name='name',label="企业全称",ref="name",:maxLength="64",styles="width:300px",:defaultValue="detailData.name")
    Divider(dashed)
    FormItem.title(label="联系人信息")
    FormItem(label="联系人：",required)
      comp-input(name='contactor',label="联系人",ref="contactor",styles="width:300px", :defaultValue="detailData.contactor")
    FormItem(label="手机：",required)
      comp-input(name='userMobile',label="手机",ref="userMobile",styles="width:300px", :defaultValue="detailData.mobile")
    FormItem(label="邮件：",required)
      comp-input(name='userEmail',label="邮件",ref="userEmail",styles="width:300px", :defaultValue="detailData.email")
    FormItem(label="固话：")
      comp-input(name='userTel',label="固话",ref="userTel",styles="width:300px", :defaultValue="detailData.tel")
    FormItem(label="")
      Button(type="primary",@click="nextForm",:loading="loadingBtn") 保存
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import compImgUpload from '@/components/compImgUpload'
import validateFormResult from '@/global/validateForm'
import * as links from '../global/linkdo.js'
export default {
  name: 'compCompanyCreateInfo',
  components: {
    compInput,
    compImgUpload
  },
  props: {
    orgFile: {
      type: String,
      default: ''
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
      loadingBtn: false,
      status: 'view',
      showCover: false,
      modify: true,
      uploadAction: links.UPLOAD_COMPANY_LOGO
    }
  },
  methods: {
    changeUploadStatus () {
      this.status = 'view'
      this.modify = true
    },
    nextForm () {
      // console.log('logoFile')
      // console.log(this.$refs.logoFile.$refs.upload.fileList[0])
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.name,
        this.$refs.contactor,
        this.$refs.userMobile,
        this.$refs.userEmail
      ])
      if (result) {
        let params = {
          param: {
            companyId: this.detailData.id,
            logoFile: this.$refs.logoFile.$refs.upload.fileList.length ? this.$refs.logoFile.$refs.upload.fileList[0].file : '',
            name: this.$refs.name.value,
            contactor: this.$refs.contactor.value,
            mobile: this.$refs.userMobile.value,
            email: this.$refs.userEmail.value,
            tel: this.$refs.userTel.value
          },
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.loadingBtn = false
              this.$Message.success('保存成功')
              this.$emit('getBaseInfo', params.param)
            } else {
              this.$Message.error('保存失败')
            }
          }
        }
        this.updateCompany(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      updateCompany: types.UPDATE_COMPANY
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
  }
}
</script>
<style scoped>
.ivu-divider{
  margin-top:35px;
}
</style>
