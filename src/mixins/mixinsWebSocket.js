export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      websock: null,
      userno: 11,
      msgNum: 0
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
    initWebSocket(){ //初始化weosocket
      const wsUrl = "ws://183.84.10.123/client-api/websocket/notice/" + this.userno
      this.websock = new WebSocket(wsUrl)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      //this.websock.onclose = this.websocketclose
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      console.log('开启连接')
      let message = "notice"
      this.websocketsend(message)
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(data){ //数据接收
      console.log(data)
      this.msgNum = data.data
    },
    websocketsend(data){//数据发送
      this.websock.send(data)
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e)
    }
  },
  watch: {
  },
  destroyed () {
    // console.log('websocket close')
    // this.websock.close()
  }
}
