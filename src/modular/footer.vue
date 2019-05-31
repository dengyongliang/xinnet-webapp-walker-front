<template lang="pug">
  .footer
    p 增值电信业务经营许可证：B1-20140435 京B2-20070152<br />京公网安备11030102000056号 京ICP备09061941号-4<br />Copyright©1993-2018 北京新网数码信息技术有限公司 版权所有
</template>

<script>
export default {
  name: 'FOOTER',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  beforeMount () {
  }
}
</script>

<style scoped>
.footer {
  background: #fff;
  text-align: center;
  padding: 30px 0;
}
.footer p{
  color: #999;
  line-height: 26px;
  font-size: 12px;
}
</style>
