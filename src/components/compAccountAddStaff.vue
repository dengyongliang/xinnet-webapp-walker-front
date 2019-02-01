<template lang="pug">
.compAccountAddStaff
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1")
      comp-account-staff-info(@getBaseInfo="baseInfo")
    TabPane.tabPane2(label="权限",name="name2",:disabled="tabDisabled")
      comp-account-staff-jurisdiction(:baseInfoData="baseInfoData",@closeDrawer="onClose")
</template>

<script>
import {mapActions} from 'vuex'
import compAccountStaffInfo from './compAccountStaffInfo'
import compAccountStaffJurisdiction from './compAccountStaffJurisdiction'
export default {
  components: {
    compAccountStaffInfo,
    compAccountStaffJurisdiction
  },
  props: {
    onClose: {
      type: Function
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
    },
    ...mapActions({
    })
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
.compAccountAddStaff{
  padding:0 30px;
}
.compAccountAddStaff .ivu-tabs{
  overflow: visible!important;
}
.compAccountAddStaff .ivu-tree ul li{
  margin: 0px!important;
}
</style>
