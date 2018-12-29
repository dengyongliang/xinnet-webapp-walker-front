<template lang="pug">
.compAccountDetailStaff
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1")
      comp-account-staff-info-for-detail(:getBaseInfo="userBaseInfo",:companysList="userCompanysList",:companySelected="companySelected")
    TabPane.tabPane2(label="权限",name="name2")
      comp-account-staff-jurisdiction-for-detail(:baseInfoData="userBaseInfo",:rolesList="rolesList",:userAuthGroupsList="userAuthGroupsList",@closeDrawer="onClose",:roleChecked="roleChecked",)
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compAccountStaffInfoForDetail from './compAccountStaffInfoForDetail'
import compAccountStaffJurisdictionForDetail from './compAccountStaffJurisdictionForDetail'
export default {
  components: {
    compAccountStaffInfoForDetail,
    compAccountStaffJurisdictionForDetail
  },
  props: {
    onClose: {
      type: Function
    },
    rolesList: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    userAuthGroupsList: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    userCompanysList: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    userBaseInfo: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    },
    roleChecked: {
      type: String,
      default: ''
    },
    companySelected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value:'',
      loadingBtn: false
    }
  },
  methods: {
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
.compAccountDetailStaff{
  padding:0 30px;
}
.compAccountDetailStaff .ivu-tabs{
  overflow: visible!important;
}
.compAccountDetailStaff .ivu-tree ul li{
  margin: 0px!important;
}
</style>