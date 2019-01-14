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
      companySelected: '',
      super: false
    }
  },
  methods: {
    ...mapActions({
    })
  },
  computed: {

  },
  beforeMount () {
    // is super?
    this.staffData.roles.map((v)=>{
      if(v.roleCode.indexOf('super')>=0 && v.disabled ){
        this.super = true
      }
    })
    this.rolesList = this.GLOBALS.CONVERT_RADIO(this.staffData.roles, {
      label: 'id',
      code: 'roleCode',
      value: 'roleName',
      disabled: 'disabled'
    })
    this.userAuthGroupsList = function (vm) {
      let arr = vm.GLOBALS.CONVERT_TREE(vm.staffData.domainAuths.companys, {
        title: 'id',
        label: 'name',
        checked: 'checked',
        children: 'groups',
        disabled_lv1: true,
        disabled_lv2: vm.super ? true: false
      })

      let len = arr.length
      let arr2 = []
      console.log(arr)
      for(var i=0; i<len; i++){
        if (arr[i].children.length) {
          arr2.push(arr[i])
        }
      }
      if (arr2.length) {
        if (vm.super) {
          return [{title: 0, label: '全部', checked: false, expand: true, disabled: true,children: vm.GLOBALS.CONVERT_TREE_CHECKED_TRUE(arr2, 'children')}]
        } else {
          return [{title: 0, label: '全部', checked: false, expand: true,children:arr2}]
        }
      } else {
        return []
      }
    }(this)
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