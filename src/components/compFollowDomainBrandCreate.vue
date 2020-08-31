<template lang="pug">
  Form.compFollowDomainBrandCreate(:label-width="120")
    FormItem(label="品牌名称：",required)
      comp-input(name='brandName',label="品牌名称",ref="brandName",:maxLength="100",:defaultValue="brandName",:disabled="Boolean(id.length)")
    FormItem(label="LOGO：", required)
      comp-img-upload(:status="status",ref="brandLogo",name="upfile",:file="orgFile",errorText="请上传企业LOGO！",tips="支持jpg、gif、png格式，1M以内，建议尺寸50*50。",:uploadAction="uploadAction", :on-beforecallback="changeUploadStatus", :showCover="showCover", :modify="modify")
    FormItem(label="所属公司：",required)
      comp-select(:list="companysList", ref="companyId",:defaultValue="companyId")
    FormItem(label="品牌级别：",required)
      comp-select(:list="brandLevelList", ref="brandLevel",:defaultValue="brandLevel")
    FormItem(label="品牌关键词：", :required="true")
      comp-input(name='brandKeyword',label="品牌关键词",ref="brandKeyword",:maxLength="200",:defaultValue="brandKeyword")
      p 1、支持中文、英文、数字，每个关键词用逗号隔开，最多5个，如：新网,xinnet,xinwang。<br />2、请填写用于注册域名和商标的关键词。
    FormItem(label="监控通知员工：", required)
      comp-select(:list="usersList", :multiple="true", ref="notifyUsers",:defaultValue="notifyUsers")
    FormItem(label="通知类型：", required)
      comp-radio(:list="notifyWayList", ref="notifyWay",:defaultValue="notifyWay")
    FormItem(label="")
      Button(type="primary",@click="handlerSubmit",:loading="loadingBtn") 保存
</template>

<script>
import { mapState } from 'vuex'
import compInput from '@/components/compInput'
import compSelect from '@/components/compSelect'
import compRadio from '@/components/compRadio'
import compImgUpload from '@/components/compImgUpload'
import validateFormResult from '@/global/validateForm'
import * as actions from '../actions/followdomain.js'
export default {
  name: 'compFollowDomainBrandCreateInfo',
  components: {
    compInput,
    compSelect,
    compRadio,
    compImgUpload
  },
  props: {
    id: {
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
      status: 'creat',
      showCover: false,
      modify: false,
      uploadAction: actions.FOLLOW_BRAND_UPLOAD_FILE,
      notifyWayList: [
        {
          label: '不通知',
          value: '1'
        },
        // {
        //   label: '短信通知',
        //   value: '2'
        // },
        {
          label: '邮件通知',
          value: '3'
        }
        // {
        //   label: '邮件和短信通知',
        //   value: '4'
        // }
      ],
      brandName: '',
      companyId: '',
      brandLevel: '',
      brandKeyword: '',
      notifyUsers: '',
      notifyWay: '',
      orgFile: '',
      brandLevelList: (function (vm) {
        let array = []
        for (var i in vm.DATAS.BRAND_LEVEL) {
          array.push({
            label: vm.DATAS.BRAND_LEVEL[i],
            value: i + ''
          })
        }
        return array
      })(this)
    }
  },
  methods: {
    changeUploadStatus () {
      this.status = 'view'
      this.modify = true
    },
    queryBrand () {
      this.$store.dispatch('QUERY_BRAND', {brandId: this.id}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.brandName = response.data.data.brandName
          this.brandLevel = response.data.data.brandLevel + ''
          this.orgFile = response.data.data.brandLogo
          this.brandKeyword = response.data.data.brandKeyword
          this.companyId = response.data.data.companyId + ''
          this.notifyWay = response.data.data.notifyWay + ''
          this.notifyUsers = response.data.data.notifyUsers
        } else {
          this.$Message.error(response.data.msg)
        }
      }).catch(() => {})
    },
    handlerSubmit () {
      // console.log('logoFile')
      // console.log(this.$refs.logoFile.$refs.upload.fileList[0])
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.brandName,
        this.$refs.companyId,
        this.$refs.brandLevel,
        this.$refs.brandKeyword,
        this.$refs.brandLogo,
        this.$refs.notifyUsers,
        this.$refs.notifyWay
      ])
      if (result) {
        // 清除空项
        let brandKeyword = this.GLOBALS.TRIM_ALL(this.$refs.brandKeyword.value.replace(/[;；]/g, ';')).split(';').filter((v) => {
          return v.length > 0
        })

        if (brandKeyword.length > 5) {
          this.$refs.brandKeyword.showValidateResult({text: '最多5个'})
          result = false
        } else if (!new RegExp('^[;A-z0-9\\u4e00-\\u9fa5]*$').test(brandKeyword.join(';'))) {
          result = false
          this.$refs.brandKeyword.showValidateResult({text: '格式错误！'})
        }
        this.$refs.brandKeyword.value = brandKeyword.join(';')
      }
      if (result) {
        var params = {
          brandLogo: this.$refs.brandLogo.$refs.upload.fileList.length ? this.$refs.brandLogo.$refs.upload.fileList[0].url : '',
          brandName: this.$refs.brandName.value,
          companyId: this.$refs.companyId.value,
          brandLevel: this.$refs.brandLevel.value,
          brandKeyword: this.$refs.brandKeyword.value,
          notifyUsers: this.$refs.notifyUsers.value.join(';'),
          notifyWay: this.$refs.notifyWay.value
        }
        // alert(JSON.stringify(params))
        if (this.id.length) {
          params.id = this.id
          
          this.$store.dispatch('UPDATE_BRAND', params).then(response => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('保存成功')
              this.onClose()
            } else {
              this.$Message.error(response.data.msg)
            }
          }).catch(() => {
            this.loadingBtn = false
          })
        } else {
          this.$store.dispatch('CREATE_BRAND', params).then(response => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('保存成功')
              this.onClose()
            } else {
              this.$Message.error(response.data.msg)
            }
          }).catch(() => {
            this.loadingBtn = false
          })
        }
      } else {
        this.loadingBtn = false
      }
    }
  },
  beforeMount () {
    if (this.id.length) {
      this.queryBrand()
      this.status = 'view'
      this.modify = true
    } else {
      this.modify = false
      this.status = 'creat'
      this.brandName = ''
      this.brandLevel = ''
      this.brandLogo = ''
      this.brandKeyword = ''
      this.companyId = ''
      this.notifyWay = ''
      this.notifyUsers = ''
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      companysList (state) {
        return this.GLOBALS.CONVERT_SELECT(state.user.companys, {
          label: 'name',
          value: 'id'
        })
      },
      usersList (state) {
        return this.GLOBALS.CONVERT_SELECT(state.user.users, {
          label: 'userName',
          value: 'id',
          code: 'userCode'
        })
      },
      maskClosable (state) {
        return state.maskClosable
      }
    })
  }
}
</script>
<style>
.compFollowDomainBrandCreate{
  padding:0 30px;
}
.compFollowDomainBrandCreate .ivu-tabs-content{
  padding-bottom: 200px;
}
.compFollowDomainBrandCreate .ivu-form-item.title .ivu-form-item-label{
  text-align: left;
  color: #aaa;
  font-size: 14px;
}
.compFollowDomainBrandCreate .ivu-form-item p{
  line-height: 16px;
  padding-top: 10px;
  font-size: 12px;
  color: #aaa;
}
.compFollowDomainBrandCreate .ivu-upload,
.compFollowDomainBrandCreate .demo-upload-list{
  width: 90px!important;
  height: 90px!important;
  border-radius: 100%!important;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1)!important;
  border:none!important;
}
.compFollowDomainBrandCreate .ivu-upload-select{
  cursor: pointer;
  background: url(../../static/img/upload_default.png) no-repeat;
  background-size: 100% 100%;
}
.compFollowDomainBrandCreate .ivu-upload-select div{
  display: none;
}
.compFollowDomainBrandCreate .modify .ivu-upload{
  position: relative;
  left: 0px;
  top: 0px;
}
.compFollowDomainBrandCreate .modify .ivu-upload .ivu-upload-select{
  background: none;
}
.compFollowDomainBrandCreate .modify .ivu-upload .ivu-upload-select div{
  width: 100%!important;
  height: 100%!important;
  text-align:center;
  line-height: 90px!important;
  border-radius: 100%;
}
.compFollowDomainBrandCreate .modify .ivu-upload .ivu-upload-select:hover div{
  display: block;
  background: rgba(0,0,0,0.2);
}
.compFollowDomainBrandCreate .modify .ivu-upload .ivu-upload-select:hover div span{
  color:#fff;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .ivu-alert{
  padding: 10px 10px 10px 32px;
  margin-bottom: 30px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .ivu-alert .ivu-alert-icon{
  margin-top:-35px;
  left: 10px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .ivu-alert .ivu-alert-icon i{
  color: #ffad02;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .ivu-alert .ivu-alert-message{
  float: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .ivu-alert .ivu-alert-desc{
  overflow: hidden;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .companyName{
  font-size: 14px;
  margin-bottom: 10px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .companyName span{
  font-weight: 200;
  padding-left: 5px;
  font-size: 12px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li.gItem{
  padding: 8px 0;
  min-height: 32px;
  position: relative;
  padding-left: 30px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .compInput{
  display: inline-block;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .ivu-input-wrapper{
  margin-right: 10px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .ivu-btn{
  margin-right: 10px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup .ivu-btn .ivu-icon{
  color:#999;
  margin-left: 3px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li a{
  display: inline-block;
  padding:0 5px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li .groupName{
  display: inline-block;
  width: 180px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li span.name{
  display: inline-block;
  max-width: 140px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li .num{
  display: inline-block;
  margin-left: 10px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li .manager{
  display: inline-block;
  width: 220px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li .manager .ivu-icon{
  color:#999;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li .line{
  width: 25px;
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li .lineT{
  width: 100%;
  height: 50%;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #aaa;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li .lineB{
  width: 100%;
  height: 50%;
  border-top: 1px solid #aaa;
  border-left: 1px solid #aaa;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li:first-child .lineT{
  border:1px solid #fff;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li:first-child .lineB{
  border-top: 1px solid #aaa;
  border-left: 1px solid #aaa;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li:last-child .lineT{
  border-bottom: 1px solid #aaa;
  border-left: 1px solid #aaa;
}
.compFollowDomainBrandCreate .compFollowDomainBrandCreateGroup li:last-child .lineB{
  border:1px solid #fff;
}

</style>
