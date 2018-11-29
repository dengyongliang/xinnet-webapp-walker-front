<template lang="pug">
.compAccountAddStaff
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1")
      comp-account-staff-info(@getBaseInfo="baseInfo")
    TabPane.tabPane2(label="权限",name="name2",:disabled="tabDisabled")
      comp-account-staff-jurisdiction(:baseInfoData="baseInfoData",:rolesList="rolesList",:userAuthGroupsList="userAuthGroupsList",@closeDrawer="onClose")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compAccountStaffInfo from './compAccountStaffInfo'
import compAccountStaffJurisdiction from './compAccountStaffJurisdiction'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compAccountStaffInfo,
    compAccountStaffJurisdiction
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
    }
  },
  data () {
    return {
      value:'',
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
      updateUserInfo: types.UPDATE_USER_INFO
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
<style scoped>
.compAccountAddStaff{
  padding:0 30px;
}
</style>