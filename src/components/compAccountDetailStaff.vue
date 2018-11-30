<template lang="pug">
.compAccountDetailStaff
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1")
      comp-account-staff-info-for-detail(@getBaseInfo="baseInfo")
    TabPane.tabPane2(label="权限",name="name2")
      comp-account-staff-jurisdiction-for-detail(:baseInfoData="baseInfoData",:rolesList="rolesList",:userAuthGroupsList="userAuthGroupsList",@closeDrawer="onClose")
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
    }
  },
  data () {
    return {
      value:'',
      loadingBtn: false,
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
<style scoped>
.compAccountDetailStaff{
  padding:0 30px;
}
</style>