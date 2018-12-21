<template lang="pug">
div.changeDetail
  .domainName
    h2 {{detailData.domainName}}
    strong 过户状态：<em style="color: #f00" v-if="detailData.changeStatus===3">过户失败</em><em style="color: #44a500" v-if="detailData.changeStatus===1">审核中</em><em style="color: #44a500" v-if="detailData.changeStatus===2">过户完成</em><em style="color: #aaa" v-if="detailData.changeStatus===0">待过户</em>
    p(v-if="detailData.changeStatus===3") 失败原因 ：{{detailData.changeFaildReason}}
  .domainInfo
    Row()
      Col(span="12")
        strong 变更后域名所有者信息
        .realname(v-if="detailData.changeStatus===3")
          p.reason 失败原因 ：{{detailData.changeFaildReason}}
        ul
          li 域名持有者名称（中文）：{{detailData.newOrganizeNameCn}}
          li 域名持有者名称（英文）：{{detailData.newOrganizeNameUk}}
          li 域名联系人（中文）：{{detailData.newUserNameCn}}
          li 域名联系人（英文）：{{detailData.newUserNameUk}}
          li 所属区域：{{detailData.newPublicCountryCn +'-'+ detailData.newPublicCityCn +'-'+ detailData.newPublicProvinceCn}}
          li 通讯地址（中文）：{{detailData.newPublicStreetCn}}
          li 通讯地址（英文）：{{detailData.newPublicStreetUk}}
          li 邮政编码：{{detailData.newPublicZipCode}}
          li 电子邮件：{{detailData.newUserEmail}}
          li 电话：{{(detailData.newUserPhoneInter && detailData.newUserPhoneInter.length > 0 ? (detailData.newUserPhoneInter + '-') : '') + (detailData.newUserPhoneArea && detailData.newUserPhoneArea.length > 0 ? (detailData.newUserPhoneArea + '-') : '') + detailData.newUserPhoneNumber}}
          li 传真：{{(detailData.newUserFaxInter && detailData.newUserFaxInter.length > 0 ? (detailData.newUserFaxInter + '-') : '') + (detailData.newUserFaxArea && detailData.newUserFaxArea.length > 0 ? (detailData.newUserFaxArea + '-') : '') + detailData.newUserFaxNumber}}
      Col(span="12")
        strong 原域名所有者信息
        ul
          li 域名持有者名称（中文）：{{detailData.oldOrganizeNameCn}}
          li 域名持有者名称（英文）：{{detailData.oldOrganizeNameUk}}
          li 域名联系人（中文）：{{detailData.oldUserNameCn}}
          li 域名联系人（英文）：{{detailData.oldUserNameUk}}
          li 所属区域：{{detailData.oldPublicCountryCn +'-'+ detailData.oldPublicCityCn +'-'+ detailData.oldPublicProvinceCn}}
          li 通讯地址（中文）：{{detailData.oldPublicStreetCn}}
          li 通讯地址（英文）：{{detailData.oldPublicStreetUk}}
          li 邮政编码：{{detailData.oldPublicZipCode}}
          li 电子邮件：{{detailData.oldUserEmail}}
          li 电话：{{(detailData.oldUserPhoneInter && detailData.oldUserPhoneInter.length > 0 ? (detailData.oldUserPhoneInter + '-') : '') + (detailData.oldUserPhoneArea && detailData.oldUserPhoneArea.length > 0 ? (detailData.oldUserPhoneArea + '-') : '') + detailData.oldUserPhoneNumber}}
          li 传真：{{(detailData.oldUserFaxInter && detailData.oldUserFaxInter.length > 0 ? (detailData.oldUserFaxInter + '-') : '') + (detailData.oldUserFaxArea && detailData.oldUserFaxArea.length > 0 ? (detailData.oldUserFaxArea + '-') : '') + detailData.oldUserFaxNumber}}
</template>

<script>
export default {
  name: 'compDomainChangeDetail',
  components: {
  },
  props: {
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
    }
  },
  methods: {
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
.changeDetail{
  padding: 0 20px;
}
.changeDetail .domainName{
  background:#fff;
  padding: 20px;
  border-radius: 20px;
  margin-bottom:20px;
}
.changeDetail .domainName h2{
  font-size: 40px;
}
.changeDetail .domainName strong{
  display:block;
  padding: 15px 0;
}
.changeDetail .domainName p{
  font-size:12px;
  line-height: 20px;
}
.changeDetail .domainInfo{
  background:#fff;
  padding: 30px 20px;
}
.changeDetail .domainInfo strong{
  font-size:16px;
  font-weight:200;
  display:block;
  margin-bottom:30px;
}
.changeDetail .domainInfo .ivu-col{
  padding-right:6%;
}
.changeDetail .domainInfo .realname{
  background: #f7f8fa;
  padding:15px;
  font-size: 14px;
  line-height: 20px;
  margin: 0 0 20px 0;
  font-weight:600;
}
.changeDetail .domainInfo .realname p{
  font-size: 12px;
  padding-top:15px;
  font-weight:normal;
}
.changeDetail .domainInfo li{
  font-size:12px;
  line-height: 28px;
}
</style>
