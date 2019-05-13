<template lang="pug">
.compSwitchClient
  .select
    comp-select(name="customerId",:list="list",ref="customerId",styles="width:300px",:defaultValue="myUserInfo.manageCustomerId?myUserInfo.manageCustomerId.toString():''")
  div.btn
    Button(@click="onClose") 取消
    Button(type="primary", @click="changeCustomersEv") 确定
</template>

<script>
import {mapState} from 'vuex'
import compSelect from './compSelect'
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
    }
  },
  data () {
    return {
      loadingBtn: false,
      list: []
    }
  },
  methods: {
    changeCustomersEv () {
      this.$store.dispatch('CHANGE_CUSTOMERS', {customerId: this.$refs.customerId.value}).then(() => {}).catch(() => {})
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      }
    })
  },
  beforeMount () {
    this.$store.dispatch('USER_CUSTOMERS').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.list = this.GLOBALS.CONVERT_SELECT(response.data.data, {
          value: 'id',
          label: 'name'
        })
      }
    }).catch(() => {})
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
