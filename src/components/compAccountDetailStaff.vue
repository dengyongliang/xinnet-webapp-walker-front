<template lang="pug">
.compAccountDetailStaff
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1")
      comp-account-staff-info-for-detail(:getBaseInfo="staffData",:companysList="userCompanysList",:companySelected="companySelected", @closeDrawer="onClose",)
    TabPane.tabPane2(label="权限",name="name2")
      comp-account-staff-jurisdiction-for-detail(:baseInfoData="staffData",:rolesList="rolesList",:userAuthGroupsList="userAuthGroupsList",@closeDrawer="onClose",:roleChecked="roleChecked.toString()",)
</template>

<script>
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
      value: '',
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
  },
  computed: {

  },
  beforeMount () {
    // is super?
    if (this.staffData && this.staffData.defaultRoleId.indexOf('super') >= 0) {
      this.super = true
    } else {
      this.super = false
    }
    // 将超级管理员置为可选，其余不可选
    this.rolesList = (function (vm) {
      let arr = []
      arr = vm.GLOBALS.CONVERT_RADIO(vm.staffData.roles, {
        label: 'id',
        code: 'roleCode',
        value: 'roleName',
        disabled: 'disabled'
      })
      if (vm.super) {
        return arr.map((v) => {
          if (v.code.indexOf('super') >= 0) {
            v.disabled = false
          } else {
            v.disabled = true
          }
          return v
        })
      } else {
        return arr
      }
    })(this)
    this.userAuthGroupsList = (function (vm) {
      let arr = vm.GLOBALS.CONVERT_TREE(vm.staffData.domainAuths.companys, {
        title: 'id',
        label: 'name',
        checked: 'checked',
        children: 'groups',
        disabled_lv1: true,
        disabled_lv2: vm.super
      })
      let len = arr.length
      let arr2 = []
      for (var i = 0; i < len; i++) {
        if (arr[i].children.length) {
          arr2.push(arr[i])
        }
      }

      if (arr2.length) {
        // 超级管理员全选
        if (vm.super) {
          return [{title: 0, label: '全部', checked: false, expand: true, disabled: true, children: vm.GLOBALS.CONVERT_TREE_CHECKED_TRUE(arr2, 'children')}]
        } else {
          return [{title: 0, label: '全部', checked: false, expand: true, children: arr2}]
        }
      } else {
        return []
      }
    })(this)
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
    this.roleChecked = this.staffData.defaultRoleId.split('_')[0]
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
