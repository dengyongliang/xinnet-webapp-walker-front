<template lang="pug">
.compCompanyCreate
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1",)
      comp-company-create-info(@getBaseInfo="baseInfo")
    TabPane.tabPane2(label="分组管理",name="name2",:disabled="tabDisabled")
      comp-company-create-group(:baseInfoData="baseInfoData")
</template>

<script>
import compCompanyCreateInfo from './compCompanyCreateInfo'
import compCompanyCreateGroup from './compCompanyCreateGroup'
export default {
  components: {
    compCompanyCreateInfo,
    compCompanyCreateGroup
  },
  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      loadingBtn: false,
      tabDisabled: true,
      baseInfoData: {}
    }
  },
  methods: {
    baseInfo (obj) {
      this.tabDisabled = false
      this.value = 'name2'
      this.baseInfoData = obj
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style>
.compCompanyCreate{
  padding:0 30px;
}
.compCompanyCreate .ivu-tabs-content{
  padding-bottom: 200px;
}
.compCompanyCreate .ivu-form-item.title .ivu-form-item-label{
  text-align: left;
  color: #aaa;
  font-size: 14px;
}
.compCompanyCreate .ivu-upload,
.compCompanyCreate .demo-upload-list{
  width: 90px!important;
  height: 90px!important;
  border-radius: 100%!important;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1)!important;
  border:none!important;
}
.compCompanyCreate .ivu-upload-select{
  cursor: pointer;
  background: url(../../static/img/upload_default.png) no-repeat;
  background-size: 100% 100%;
}
.compCompanyCreate .ivu-upload-select div{
  display: none;
}
.compCompanyCreate .modify .ivu-upload{
  position: absolute;
  left: 0px;
  top: 0px;
}
.compCompanyCreate .modify .ivu-upload .ivu-upload-select{
  background: none;
}
.compCompanyCreate .modify .ivu-upload .ivu-upload-select div{
  width: 100%!important;
  height: 100%!important;
  text-align:center;
  line-height: 90px!important;
  border-radius: 100%;
}
.compCompanyCreate .modify .ivu-upload .ivu-upload-select:hover div{
  display: block;
  background: rgba(0,0,0,0.2);
}
.compCompanyCreate .modify .ivu-upload .ivu-upload-select:hover div span{
  color:#fff;
}
.compCompanyCreate .compCompanyCreateGroup .ivu-alert{
  padding: 10px 10px 10px 32px;
  margin-bottom: 30px;
}
.compCompanyCreate .compCompanyCreateGroup .ivu-alert .ivu-alert-icon{
  margin-top:-35px;
  left: 10px;
}
.compCompanyCreate .compCompanyCreateGroup .ivu-alert .ivu-alert-icon i{
  color: #ffad02;
}
.compCompanyCreate .compCompanyCreateGroup .ivu-alert .ivu-alert-message{
  float: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}
.compCompanyCreate .compCompanyCreateGroup .ivu-alert .ivu-alert-desc{
  overflow: hidden;
}
.compCompanyCreate .compCompanyCreateGroup .companyName{
  font-size: 14px;
  margin-bottom: 10px;
}
.compCompanyCreate .compCompanyCreateGroup .companyName span{
  font-weight: 200;
  padding-left: 5px;
  font-size: 12px;
}
.compCompanyCreate .compCompanyCreateGroup li.gItem{
  padding: 8px 0;
  min-height: 32px;
  position: relative;
  padding-left: 30px;
}
.compCompanyCreate .compCompanyCreateGroup .compInput{
  display: inline-block;
}
.compCompanyCreate .compCompanyCreateGroup .ivu-input-wrapper{
  margin-right: 10px;
}
.compCompanyCreate .compCompanyCreateGroup .ivu-btn{
  margin-right: 10px;
}
.compCompanyCreate .compCompanyCreateGroup .ivu-btn .ivu-icon{
  color:#999;
  margin-left: 3px;
}
.compCompanyCreate .compCompanyCreateGroup li a{
  display: inline-block;
  padding:0 5px;
}
.compCompanyCreate .compCompanyCreateGroup li .groupName{
  display: inline-block;
  width: 180px;
}
.compCompanyCreate .compCompanyCreateGroup li span.name{
  display: inline-block;
  max-width: 140px;
}
.compCompanyCreate .compCompanyCreateGroup li .num{
  display: inline-block;
  margin-left: 10px;
}
.compCompanyCreate .compCompanyCreateGroup li .manager{
  display: inline-block;
  width: 220px;
}
.compCompanyCreate .compCompanyCreateGroup li .manager .ivu-icon{
  color:#999;
}
.compCompanyCreate .compCompanyCreateGroup li .line{
  width: 25px;
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
}
.compCompanyCreate .compCompanyCreateGroup li .lineT{
  width: 100%;
  height: 50%;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #aaa;
}
.compCompanyCreate .compCompanyCreateGroup li .lineB{
  width: 100%;
  height: 50%;
  border-top: 1px solid #aaa;
  border-left: 1px solid #aaa;
}
.compCompanyCreate .compCompanyCreateGroup li:first-child .lineT{
  border:1px solid #fff;
}
.compCompanyCreate .compCompanyCreateGroup li:first-child .lineB{
  border-top: 1px solid #aaa;
  border-left: 1px solid #aaa;
}
.compCompanyCreate .compCompanyCreateGroup li:last-child .lineT{
  border-bottom: 1px solid #aaa;
  border-left: 1px solid #aaa;
}
.compCompanyCreate .compCompanyCreateGroup li:last-child .lineB{
  border:1px solid #fff;
}

</style>
