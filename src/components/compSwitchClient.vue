<template lang="pug">
.compSwitchClient
  .select
    comp-select(name="customerId",:list="getCompanys",ref="customerId",styles="width:300px",:defaultValue="myUserInfo.manageCustomerId?myUserInfo.manageCustomerId.toString():''")
  div.btn
    Button(@click="onClose") 取消
    Button(type="primary", @click="changeCustomersEv") 确定
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compSelect from './compSelect'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compSelect
  },
  props: {
    detailData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    },
    onClose: {
      type: Function
    },
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    changeCustomersEv () {
      let params = {
        param: {
          customerId: this.$refs.customerId.value
        },
        vm: this
      }
      this.changeCustomers(params)
    },
    ...mapActions({
      changeCustomers: types.CHANGE_CUSTOMERS
    })
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      getCompanys (state) {
        let arrGroups = []
        if (state.user.companys) {
          arrGroups = this.GLOBALS.CONVERT_SELECT(state.user.companys, {
            value: 'id',
            label: 'name'
          })
        }
        return arrGroups
      }
    })
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>
<style scoped>
.compSwitchClient .select{
  text-align: center;
}
.compSwitchClient .compSelect{
  text-align:left;
}
.compSwitchClient .btn{
  text-align:center;
  padding: 30px 0 10px 0;
}
.compSwitchClient .btn .ivu-btn{
  margin:0 10px;
}
</style>