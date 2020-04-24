<template lang="pug">
  div.contBrandReg
    h3.h3T 商标注册
    p.p1 提交商标注册需求后，管家会立即通知商标顾问与您联系沟通商标注册的详细需求。
    Form(:label-width="120")
      FormItem(label="商标名称：",)
        comp-input(type="text", ref="tmName", styles="width:400px",placeholder="期望注册的商标名称",:maxlength="500")
      FormItem(label="联系人：",)
        comp-input(type="text", ref="contactor", styles="width:400px",placeholder="",:maxlength="500")
      FormItem(label="手机：", :required="true")
        comp-input(type="text", ref="phoneNum", styles="width:400px",validate="mobile",placeholder="")
      FormItem(label="邮箱：",)
        comp-input(type="text", ref="email", styles="width:400px",placeholder="",:maxlength="500")
      FormItem(label="描述：",)
        comp-input(type="textarea", ref="description", styles="width:400px",placeholder="关于商标注册需求",:maxlength="500")
      FormItem(label="",class="btnItem")
        Button.btnSubmit(type="primary", @click="submitForm",:loading="loadingBtn") 立即提交
</template>
<script>
import compInput from '@/components/compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  name: 'contBrandReg',
  props: {
  },
  data () {
    return {
      loading: true,
      loadingTable: false,
      loadingBtn: false
    }
  },
  methods: {
    submitForm () {
      this.loadingBtn = true
      let result = true
      result = validateFormResult([
        this.$refs.phoneNum
      ])
      if (result) {
        let params = {
          tmName: this.$refs.tmName.value,
          contactor: this.$refs.contactor.value,
          phoneNum: this.$refs.phoneNum.value,
          email: this.$refs.email.value,
          description: this.$refs.description.value
        }
        // console.log(params)
        this.$store.dispatch('APP_TRADEMARK', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success('提交成功')
          } else {

          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
  },
  beforeMount () {
  },
  mounted () {

  },
  computed: {
  },
  watch: {
  }
}
</script>
<style>
.contBrandReg .h3T{
  font-size: 20px;
  text-align: center;
  padding: 20px 0;
}
.contBrandReg .p1{
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
}
.contBrandReg form{
  width: 700px;
  margin: 0 auto;
}
.contBrandReg .btnSubmit{
  margin-left: 160px;
}
</style>
