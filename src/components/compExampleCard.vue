<template lang="pug">
  div.compExampleCard
    Row(v-show="registrantType === 'I'")
      Col(span="12")
        strong 提示：
        p.p1 必须上传此次填写人员的证件信息（如身份证）！
        Divider
        p.p2 ① 姓名必须与填写人员真实姓名一致。<br />② 证件号必须与填写人员证件号一致。<br />③ 证件必须在有效期内。
      Col(span="12")
        img(src="../../static/img/example_idcard.png")
    Row(v-show="registrantType === 'E'")
      Col(span="12")
        strong 提示：
        p.p1 必须上传此次填写企业或团体证件信息（如工商营业执照）！
        Divider
        p.p2 ① 名称必须与填写企业或团体真实名称一致。<br />② 证件号必须与填写企业或团体证件号一致。<br />③ 证件必须在有效期内。
      Col(span="12")
        img(src="../../static/img/example_busscard.png")
</template>

<script>
export default {
  name: 'compExampleCard',
  props: {
    registrantType: {
      type: String,
      default: ''
    }
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
.compExampleCard{
  padding: 20px;
}
.compExampleCard .p2{
  color:coral;
  line-height: 20px;
}
</style>
