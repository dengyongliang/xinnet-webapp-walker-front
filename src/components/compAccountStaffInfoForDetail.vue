<template lang="pug">
  Form(:label-width="80")
    FormItem(label="行者账号：")
      span.text fdjkl
    FormItem(label="姓名：")
      span.text 韩梅梅
    FormItem(label="手机：")
      comp-input(name='userMobile',label="手机",ref="userMobile")
    FormItem(label="座机：")
      comp-input(name='userTel',label="座机",ref="userTel")
    FormItem(label="电子邮件：")
      comp-input(name='userEmail',label="电子邮件",ref="userEmail")
    FormItem(label="所属企业：")
      comp-select(name="companyId",:list="companysList",ref="companyId",styles="width:240px")
    FormItem(label="")
      Button(type="primary",@click="nextForm",:loading="loadingBtn") 下一步
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import compSelect from '@/components/compSelect'
import validateFormResult from '@/global/validateForm'
export default {
  name: 'compAccountStaffInfo',
  components: {
    compInput,
    compSelect
  },
  props: {

  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    nextForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userName,
        this.$refs.userEmail,
        this.$refs.companyId
      ])
      if (result) {
        let param = {
          userName: this.$refs.userName.value,
          userEmail: this.$refs.userEmail.value,
          companyId: this.$refs.companyId.value
        }
        this.$emit('getBaseInfo',param)
        console.log(param)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      payStatisticsHistoryBill: types.PAY_STATISTICS_HISTORY_BILL
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    ...mapState({
      companysList (state) {
        return this.GLOBALS.CONVERT_ROLES(state.user.companys, {
          label: 'name',
          value: 'id'
        })
      }
    })
  }
}
</script>
<style scoped>
.filter .text{
  display:inline-block;
  margin-right:10px;
  padding-left:10px;
}
.filter button{
  margin-left:10px;
}
.totalInfo{
  font-size:17px;
  text-align:center;
  padding:30px 0;
  color:#666;
}
.totalInfo .i-icon{
  color:#a3a3a3;
  display:inline-block;
  margin:-2px 5px 0 0;
}
.totalInfo em{
  font-size:30px;
  font-weight:600;
}
td{
  width:50%;
  height:29px;
  line-height:29px;
  border-bottom:1px dashed #eee;
  padding:0 20px;
  font-size:12px;
}
td .v{
  float:right;
}
.status_1{
  background:url(../../static/img/img_bill_1.png) no-repeat 95% 0px;
}
.status_2{
  background:url(../../static/img/img_bill_2.png) no-repeat 95% 0px;
}
.status_3{
  background:url(../../static/img/img_bill_3.png) no-repeat 95% 0px;
}
</style>
