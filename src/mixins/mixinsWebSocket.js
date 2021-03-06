export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      websock: null,
      userno: 11,
      msgNum: 0,
      manageCustomerId: 0
    }
  },
  created () {
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    initWebSocket (id) {
      // 初始化websocket
      if (!this.manageCustomerId) {
        this.manageCustomerId = id
      }
      // 获取协议类型
      const protocol = document.location.protocol === 'https:' ? 'wss:' : 'ws:'
      const hostname = document.location.hostname
      // const wsUrl = 'ws://183.84.10.123/client-api/websocket/notice/' + id
      const wsUrl = protocol + '//' + hostname + '/client-api/websocket/notice/' + id
      this.websock = new WebSocket(wsUrl)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen (id) {
      // 连接建立之后执行send方法发送数据
      // 添加状态判断，当为OPEN时，发送消息
      console.log(this.websock.readyState)
      if (this.websock.readyState === 1) {
        this.websocketsend(this.manageCustomerId)
      } else {
        // do something
      }
    },
    websocketonerror () {
      // 连接建立失败重连
      this.initWebSocket(this.manageCustomerId)
    },
    websocketonmessage (data) {
      // 数据接收
      console.log(data)
      this.$store.commit('SET_USER_MSG_NUM', data)
    },
    websocketsend (data) {
      // 数据发送
      this.websock.send(data)
    },
    websocketclose (e) {
      // 关闭
      console.log('断开连接', e)
    }
  },
  watch: {
  },
  destroyed () {
    // console.log('websocket close')
    // this.websock.close()
  }
}
