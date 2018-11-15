<template lang="pug">
  div.listNone()
    p.p1
      img(src="../../static/img/img_list_none.png")
    p.p2 {{label}}
</template>

<script>
export default {
  name: 'compListNone',
  props: {
    label: {
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
.listNone{
  text-align:center;
  padding:160px 0;
}
.listNone .p1{
  margin-bottom:25px;
}
</style>
