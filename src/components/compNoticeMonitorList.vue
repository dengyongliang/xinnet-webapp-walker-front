<template lang="pug">
.compNoticeMonitorList
  ul(v-if="list.length")
    li.clear(v-for="item in list")
      span.l {{item.sendTime | dateformat('YYYY-MM-DD HH:mm:ss')}}
      span.r
        a(@click="handleShowDetail(item)") {{item.title}}
  div.none(v-else) 暂无数据
  <!-- 通知详情 弹窗 -->
  Modal(
    width="600",
    v-model="modelMailRecordDetail",
    class-name="modelMailRecordDetail",
    :footer-hide="true",
    :mask-closable="maskClosable"
  )
    div(v-html="modelMailContent")
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'compNoticeMonitorList',
  props: {
  },
  data () {
    return {
      list: [],
      modelMailRecordDetail: false,
      modelMailContent: ''
    }
  },
  methods: {
    handleShowDetail (item) {
      this.$store.dispatch('MAIL_RECORD_DETAIL', {id: item.id}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.modelMailContent = response.data.data.detail
          // 设为已读
          this.$store.dispatch('MAIL_RECORD_READ', {id: item.id}).then(() => {}).catch(() => {})
        } else {
        }
      }).catch(() => {})
      this.modelMailRecordDetail = true
    },
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
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
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
