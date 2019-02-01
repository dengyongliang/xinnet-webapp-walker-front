<template lang="pug">
  #app
    Spin.spinBody(v-if="showBodySpin")
    router-view
    BackTop(:height="500", :bottom="50", :right="20")
</template>

<script>
import {mapState} from 'vuex'
import {emitter as restEmitter} from '@/global/rest'
import mixinsWebSocket from '@/mixins/mixinsWebSocket'
export default {
  name: 'App',
  mixins: [mixinsWebSocket],
  data () {
    return {
    }
  },
  mounted () {
  },
  beforeMount () {
    let vm = this
    restEmitter.on('noLogin', () => {
      vm.$Message.error('登录超时，请重新登录！')
      setTimeout(() => {
        vm.$router.replace({ path: '/login' })
      }, 300)
    })
    restEmitter.on('noPermission', () => {
      vm.$Message.error('权限错误！')
      setTimeout(() => {
        vm.$router.replace({ path: '/' })
      }, 300)
    })
    restEmitter.on('paramError', () => {
      vm.$Message.error('参数错误！')
    })
    restEmitter.on('requestError', () => {
      vm.$Message.error('请求失败！')
    })
    restEmitter.on('errorOther', () => {
      vm.$Message.error('连接错误！')
    })
    restEmitter.on('errorServer', () => {
      vm.$Message.error('连接到服务器失败！')
    })
    restEmitter.on('openWebSocket', (id) => {
      vm.initWebSocket(id)
    })
    restEmitter.on('closeWebSocket', () => {
      vm.websock.close()
    })
  },
  methods: {

  },
  computed: {
    ...mapState([
      'pending',
      'islogin',
      'showBodySpin'
    ])
  },
  destroyed () {

  }
}
</script>

<style>
@import 'iview/dist/styles/iview.css';
@import 'assets/css/main.css';
@import 'nprogress/nprogress.css';
@import 'assets/css/iconfont.css';
@import 'assets/css/xwNormalize.css';
@import 'assets/css/xwCommon.css';
@import 'assets/css/iviewRest.css';
#app{
  height:100%;
}
#nprogress .bar{
  z-index: 99999;
}
.spinBody{
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  text-align:center;
  z-index: 999;
  background:#fff;
}
.spinBody .ivu-spin-main{
  display:inline-block;
  line-height:200px;
}
.spinBody .ivu-spin-main .ivu-spin-dot{
  display:inline-block;
}
</style>
