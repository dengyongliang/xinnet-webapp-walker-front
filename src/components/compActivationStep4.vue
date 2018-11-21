<template lang="pug">
  Form.step.step4(form="", ref="form",)
    p.p1
      img(src="../../static/img/activation/img_02.png")
    p.p2 激活完成，请登录
    FormItem.btn(label=" ")
      router-link(to="/login")
        Button(type="primary") 去登录
</template>

<script>
export default {
  name: 'compActivationStep4',
  components: {
  },
  props: {

  },
  data () {
    return {
    }
  },
  methods: {
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
.step4 p{
  text-align:center;
  font-size:30px;
}
.step4 .p1{
  padding:40px 0;
}
</style>
