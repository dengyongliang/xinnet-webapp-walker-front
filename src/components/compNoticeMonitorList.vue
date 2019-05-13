<template lang="pug">
.compNoticeMonitorList
  ul(v-if="list.length")
    li.clear(v-for="item in list")
      span.l {{item.sendTime}}
      span.r
        a {{item.title}}
  div.none(v-else) 暂无数据
</template>

<script>
export default {
  name: 'compNoticeMonitorList',
  props: {
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    queryListParam () {
      let params = {
        pageNum: 1,
        pageSize: 8,
        createTimeBegin: '',
        createTimeEnd: '',
        type: ''
      }
      return params
    }
  },
  beforeMount () {
    this.$store.dispatch('MAIL_MANAGE', this.queryListParam()).then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.list = response.data.data.list
      } else {
      }
    }).catch(() => {})
  },
  mounted () {
  },
  computed: {

  },
  watch: {
  }
}
</script>
<style scoped>
ul{
  padding: 20px 20px 0 20px;
  font-size: 12px;
}
ul li{
  color: #666;
  border-bottom: 1px dashed #eee;
  padding: 10px 0 10px 10px;
  position: relative;
}
ul li:before{
  content:"";
  background: #666;
  display: block;
  width: 2px;
  height: 2px;
  position: absolute;
  left: 0px;
  top: 50%;
  margin-top: -1px;
}
ul .l{
  color: #666;
}
ul .r{
  float:right;
}
ul a{
  color: #2271f4;
}
.none{
  text-align: center;
  line-height: 240px;
  color: #aaa;
}
</style>
