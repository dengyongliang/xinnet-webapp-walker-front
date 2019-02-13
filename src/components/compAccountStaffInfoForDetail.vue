<template lang="pug">
  Form(:label-width="80")
    FormItem(label="行者账号：")
      span.text {{getBaseInfo.userCode}}
    FormItem(label="姓名：")
      span.text {{getBaseInfo.userName}}
    FormItem(label="手机：")
      comp-input(name='userMobile',label="手机",ref="userMobile", validate="mobile", :defaultValue="getBaseInfo.userMobile",:disabled="!getBaseInfo.status")
    FormItem(label="座机：")
      comp-input(name='userTel',label="座机",ref="userTel",:defaultValue="getBaseInfo.userTel",:disabled="!getBaseInfo.status")
    FormItem(label="电子邮件：")
      comp-input(name='userEmail',label="电子邮件",ref="userEmail",validate="email",:defaultValue="getBaseInfo.userEmail",:disabled="!getBaseInfo.status")
    FormItem(label="所属企业：")
      comp-select(name="companyId",:list="companysList",ref="companyId",styles="width:240px", :defaultValue="companySelected", :disabled="!getBaseInfo.status")
    FormItem(label="", v-show="getBaseInfo.status")
      Button(type="primary",@click="nextForm",:loading="loadingBtn") 保存
    input(type="hidden", :value="getBaseInfo.userCode", ref="userCode")
</template>

<script>
import {mapActions} from 'vuex'
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
    getBaseInfo: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    },
    companysList: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    companySelected: {
      type: String,
      default: ''
    }
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
        this.$refs.userMobile,
        this.$refs.userTel,
        this.$refs.userEmail,
        this.$refs.companyId
      ])
      if (result) {
        let params = {
          param: {
            userMobile: this.$refs.userMobile.value,
            userCode: this.$refs.userCode.value,
            userTel: this.$refs.userTel.value,
            userEmail: this.$refs.userEmail.value,
            companyId: this.$refs.companyId.value
          },
          callback: (response) => {
            this.loadingBtn = false
            if (response) {
              if (response.data.code === '1000') {
                this.$Message.success('修改成功!')
                this.$emit('closeDrawer')
              } else {
                if (response.data.code === '200') {
                  this.$Message.error('用户不存在')
                } else if (response.data.code === '300') {
                  this.$Message.error('用户被锁定')
                } else if (response.data.code === '600') {
                  this.$refs.userMobile.showValidateResult({text: '手机号码已存在'})
                } else if (response.data.code === '700') {
                  this.$refs.userEmail.showValidateResult({text: '邮箱已存在'})
                }
              }
            }
          }
        }
        console.log(params.param)
        this.updateUser(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      updateUser: types.UPDATE_USER
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
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
