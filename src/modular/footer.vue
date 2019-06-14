<template lang="pug">
  .footer
    p Copyright © 1993-{{(new Date()).getFullYear()}}<br />北京新网数码信息技术有限公司 版权所有
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
  text-align: center;
  padding: 30px 0;
}
.footer p{
  color: #999;
  line-height: 26px;
  font-size: 12px;
}
</style>
