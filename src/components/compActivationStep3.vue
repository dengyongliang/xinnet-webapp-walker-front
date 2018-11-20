<template lang="pug">
  Form.step.step2(form="", ref="form3",)
    comp-re-password(defaultValue="",ref="compRePassword",label1="请输入密码：",label2="请重复密码：",placeholder1="",placeholder2="",)
    FormItem.btn(label=" ")
      Button(type="primary", @click="submit", :loading="loadingBtn") 下一步
</template>

<script>
import compRePassword from '@/components/compRePassword'
import { mapState, mapActions, mapMutations } from 'vuex'
import validateFormResult from '@/global/validateForm'
import * as types from '@/store/types'
export default {
  name: 'compActivationStep3',
  components: {
    compRePassword
  },
  props: {

  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    submit () {
      result = validateFormResult([
        this.$refs.compRePassword
      ])
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'activation'
    ])
  }
}
</script>
<style scoped>

</style>
