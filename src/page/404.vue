<template lang="pug">
.page404
  header-body
  .mainBody
    img(src="../../static/img/img_404.png")
    p 没有找到您要访问的页面，请检查您是否输入正确的URL!
    //- Button(type="primary", to="/", :replace="true") 返回首页
</template>

<script>
import headerBody from '../modular/headerNoLogin'

export default {
  components: {
    headerBody
  },
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {

  }
}
</script>

<style>
.page404 .mainBody{
  width:1200px;
  margin:100px auto;
  background:#fff;
  padding:72px 0;
  text-align: center;
}
.page404 .mainBody p{
  padding: 45px 0;
}
</style>
