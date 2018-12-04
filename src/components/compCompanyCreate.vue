<template lang="pug">
.compCompanyCreate
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1",)
      comp-company-create-info(:orgFile="orgFile",@getBaseInfo="baseInfo")
    TabPane.tabPane2(label="分组管理",name="name2",:disabled="tabDisabled")
      comp-company-create-group(:baseInfoData="baseInfoData")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
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
    },
    orgFile: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: 'name2',
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
<style scoped>
.compCompanyCreate{
  padding:0 30px;
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
</style>
