<template lang="pug">
.compAccountDetailStaff
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1")
      comp-account-staff-info-for-detail(:getBaseInfo="staffData",:companysList="userCompanysList",:companySelected="companySelected")
    TabPane.tabPane2(label="权限",name="name2")
      comp-account-staff-jurisdiction-for-detail(:baseInfoData="staffData",:rolesList="rolesList",:userAuthGroupsList="userAuthGroupsList",@closeDrawer="onClose",:roleChecked="roleChecked.toString()",)
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
    staffData: {
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
      value:'',
      loadingBtn: false,
      rolesList: [],
      userAuthGroupsList: [],
      userCompanysList: [],
      roleChecked: '',
      companySelected: ''
    }
  },
  methods: {
    ...mapActions({
    })
  },
  computed: {

  },
  beforeMount () {
    this.rolesList = this.GLOBALS.CONVERT_RADIO(this.staffData.roles, {
      label: 'id',
      code: 'roleCode',
      value: 'roleName',
      disabled: 'disabled'
    })
    this.userAuthGroupsList = this.GLOBALS.CONVERT_TREE(this.staffData.domainAuths.companys, {
      title: 'id',
      label: 'name',
      checked: 'checked',
      children: 'groups',
      disabled_lv1: true,
      disabled_lv2: false
    })
    console.log(this.userAuthGroupsList)
    this.userCompanysList = this.GLOBALS.CONVERT_SELECT(this.staffData.userCompanys, {
      label: 'name',
      value: 'id'
    })
    // 查找公司selected
    this.staffData.userCompanys.forEach((v) => {
      if (v.checked) {
        this.companySelected = v.id + ''
      } else {
      }
    })
    // 查找角色checked
    this.roleChecked = this.staffData.defaultRoleId
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