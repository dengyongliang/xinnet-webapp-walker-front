<template lang="pug">
.realNameDetail
  //- 点击“批量实名”时显示的实名状态需要去除不显示
  .status(v-if="domainIds.indexOf(',') < 0") 实名状态：
    em(:style="'color:'+(rnvcStatus === 3?'#f00':'')") {{rnvcStatus === null ? '未提交资料' : (rnvcStatus === 3 ? '审核不通过' : this.DATAS.DOMAIN_NAME_VERIFY_STATUS[rnvcStatus])}}
    p(v-show="rnvcStatus === 3") 审核失败原因：3.1 未提交注册者身份证明资料或未提交合格的注册者身份证明资料, 个人请提交带有姓名和身份证号的身份证件（建议提交身份证），组织请提交组织机构代码证或者营业执照复印件、扫描件
  Form(:label-width="200")
    FormItem(label="域名所有者：")
      span.text {{organizeNameCn}}
    FormItem(label="是否使用模板资料：")
      comp-radio(name="isTemp",:list="isTempList",ref="isTemp", :onParentmethod="isTempChange")
    FormItem(label="模板：", required, v-show="isTemp===1")
      comp-select(name="templateId",:list="templateList",ref="templateId",styles="width:240px")
    FormItem(label="域名所有者类型：", required, v-show="isTemp===0")
      comp-select(name="registrantType",:list="registrantTypeList",ref="registrantType",styles="width:240px", :defaultValue="registrantType", :onParentmethod="registrantChange")
      Tooltip(placement="top-start")
          span(slot="content", style="color:#fff") 1、个人用户需要提交与个人所有者完全<br />&nbsp;&nbsp;&nbsp;&nbsp;一致的证件号及证件正反面；<br />&nbsp;&nbsp;&nbsp;&nbsp;企业用户需提交与单位名称完全<br />&nbsp;&nbsp;&nbsp;&nbsp;一致的证件号及证件扫描件；<br />2、请按实际情况准确选择用户类型。
          Icon(custom="i-icon i-icon-tips", size="16")
    FormItem(label="证件类型：", required, v-show="isTemp===0")
      compSelect(styles="width:300px;",:list="idTypeListI", ref="idTypeI",v-show="registrantType==='I'")
      compSelect(styles="width:300px;",:list="idTypeListE", ref="idTypeE",v-show="registrantType==='E'")
    FormItem(label="域名所有者证件号码：", required, v-show="isTemp===0")
      comp-input(name='idCode',label="域名所有者证件号码",ref="idCode",styles="width:300px",:maxLength="100")
    FormItem(label="域名所有人证件扫描件：", required, v-show="isTemp===0")
      comp-img-upload(ref="upfile",name="upfile",errorText="请上传证件扫描件！",tips="支持jpg、jpge格式，图片需大于50k，小于1M",:uploadAction="uploadAction", :on-beforecallback="changeUploadStatus", creatText="点击上传", :status="status", :modify="modify")
      p 请确保上传的<span style="color:#f00">证件图片与证件类型及证件号码完全一致</span>；若不一致将会导致域名实名不通过
      div.example
        span 示例
        span.img(v-show="this.registrantType === 'I'", @click="modelExample=true")
          img(src="../../static/img/idCard.png")
        span.img(v-show="this.registrantType === 'E'", @click="modelExample=true")
          img(src="../../static/img/busscard.png")
    FormItem(label="", v-show="isTemp!==null")
      Button(type="primary",@click="formSubmit",:loading="loadingBtn") 提交
  <!-- 示例 弹窗 -->
  Modal(
    width="700",
    title="证件图例",
    v-model="modelExample",
    :footer-hide="true"
  )
    comp-example-card(:registrantType="registrantType")
</template>

<script>
import compRadio from '@/components/compRadio'
import compSelect from '@/components/compSelect'
import compInput from '@/components/compInput'
import compImgUpload from '@/components/compImgUpload'
import compExampleCard from '@/components/compExampleCard'
import * as actions from '@/actions/domainVerify.js'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compRadio,
    compSelect,
    compInput,
    compImgUpload,
    compExampleCard
  },
  props: {
    onClose: {
      type: Function
    },
    templateList: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    domainIds: {
      type: String,
      default: ''
    },
    organizeNameCn: {
      type: String,
      default: ''
    },
    rnvcStatus: {
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false,
      status: 'creat',
      modify: false,
      isTemp: null,
      modelExample: false,
      registrantType: 'I',
      idTypeListI: [],
      idTypeListE: [],
      registrantTypeList: [
        {
          label: '个人',
          value: 'I'
        },
        {
          label: '企业',
          value: 'E'
        }
      ],
      isTempList: [
        {
          value: '使用模板资料',
          label: '1'
        },
        {
          value: '上传资料',
          label: '0'
        }
      ],
      uploadAction: actions.UPLOAD_FILE
    }
  },
  methods: {
    close () {
      this.onClose()
    },
    changeUploadStatus () {
      this.status = 'view'
      this.modify = true
    },
    isTempChange (obj) {
      this.isTemp = obj.value * 1
    },
    registrantChange (v) {
      this.registrantType = v
    },
    formSubmit () {
      this.loadingBtn = true
      let result = false
      if (this.isTemp === 0) {
        result = validateFormResult([
          this.$refs.registrantType,
          this.$refs['idType' + this.registrantType],
          this.$refs.idCode,
          this.$refs.upfile
        ])
      } else if (this.isTemp === 1) {
        result = validateFormResult([
          this.$refs.templateId
        ])
      }

      if (result) {
        let params = {
          domainIds: this.domainIds
        }
        if (this.isTemp === 0) {
          Object.assign(params, {
            registrantType: this.$refs.registrantType.value,
            idCode: this.$refs.idCode.value,
            idType: this.$refs['idType' + this.registrantType].value,
            idFileUrl: this.$refs.upfile.$refs.upload.fileList[0].file,
            idFileName: this.$refs.upfile.$refs.upload.fileList[0].name
          })
        } else if (this.isTemp === 1) {
          Object.assign(params, {
            templateId: this.$refs.templateId.value
          })
        }

        this.$store.dispatch('UPLOAD_DOMAIN_VERIFY', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success('模板资料提交成功')
            this.$emit('refreshData')
          } else {
            this.$Message.error('模板资料提交失败')
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
    this.idTypeListI = (function (vm) {
      let array = []
      for (var i in vm.DATAS.REGISTRANT_ID_TYPE_I) {
        array.push({
          label: vm.DATAS.REGISTRANT_ID_TYPE_I[i],
          value: i
        })
      }
      return array
    })(this)
    this.idTypeListE = (function (vm) {
      let array = []
      for (var i in vm.DATAS.REGISTRANT_ID_TYPE_E) {
        array.push({
          label: vm.DATAS.REGISTRANT_ID_TYPE_E[i],
          value: i
        })
      }
      return array
    })(this)
  },
  watch: {
  }
}
</script>
<style>
.contRealNameDomain .realNameDetail{
  background: #fff;
  margin: 0 20px;
}
.contRealNameDomain .realNameDetail .status{
  padding: 30px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  font-weight:bold;
}
.contRealNameDomain .realNameDetail .status p{
  font-size: 12px;
  font-weight:normal;
  padding-top: 15px;
  line-height: 20px;
}
.contRealNameDomain .realNameDetail form{
  padding: 30px 0;
}
.contRealNameDomain .realNameDetail .demo-upload-list{
  width: 210px!important;
  height: 150px!important;
  line-height: 150px;
  vertical-align: middle;
}
.contRealNameDomain .realNameDetail .demo-upload-list img{
  max-width: 100%;
  max-height: 100%;
  width: auto!important;
  height: auto!important;
  vertical-align: middle;
}
.contRealNameDomain .realNameDetail .ivu-upload{
  width: 210px!important;
  height: 150px!important;
  border: 1px solid #e0e0e0;
}
.contRealNameDomain .realNameDetail .ivu-upload-select{
  cursor: pointer;
  border:none;
}
.contRealNameDomain .realNameDetail .ivu-upload-select div{
  width: 100%!important;
  height: 100%!important;
  text-align:center;
  line-height: 150px!important;
}
.contRealNameDomain .realNameDetail .modify .ivu-upload{
  position: relative;
  left: 0px;
  top: 0px;
}
.contRealNameDomain .realNameDetail .modify .ivu-upload .ivu-upload-select{
  background: none;
}
.contRealNameDomain .realNameDetail .modify .ivu-upload .ivu-upload-select div{
  display:none;
}
.contRealNameDomain .realNameDetail .modify .ivu-upload .ivu-upload-select:hover div{
  background: rgba(0,0,0,0.2);
  display:block;
}
.contRealNameDomain .realNameDetail .modify .ivu-upload .ivu-upload-select:hover div span{
  color:#fff;
}
.contRealNameDomain .realNameDetail .example{
  position: absolute;
  left: 230px;
  top: 0px;
}
.contRealNameDomain .realNameDetail .example span{
  display:block;
  color:#999;
}
.contRealNameDomain .realNameDetail .example span.img{
  position: relative;
  display: inline-block;
  line-height: 0px;
  cursor: pointer;
}
.contRealNameDomain .realNameDetail .example span.img:hover:after{
  content: '查看示例';
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 66px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  text-align: center;
  left: 0px;
  top: 0px;
}
.contRealNameDomain .realNameDetail .ivu-tooltip .ivu-icon{
  color: #4aafff;;
}
</style>
