<template lang="pug">
  .creditQuota
    div(id="myChart",style="width:450px;height:260px;")
    p.text 剩余额度：5,125.12元　　总额度：20,000元　　已用额度：5,125.12元
</template>

<script>
export default {
  name: 'compChartCreditQuota',
  props: {

  },
  data () {
    return {
    }
  },
  methods: {
    drawLine (param) {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title : {
          text: '',
          subtext: '',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          right: '12%',
          top: 'center',
          data: ['域名注册','域名续费','域名回购','域名安全保护']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '60%',
            center: ['30%', '50%'],
            data:[
              {value:1032, name:'域名注册'},
              {value:325, name:'域名续费'},
              {value:500, name:'域名回购'},
              {value:13654, name:'域名安全保护'}
            ],
            label: {
                normal: {
                  show: false,
                  position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  },
  beforeMount () {

  },
  mounted () {
    this.drawLine()
  },
  computed: {
  }
}
</script>
<style scoped>
.creditQuota{
  margin:0 auto;
}
.creditQuota p.text{
  color:#666;
  font-size:12px;
}
</style>
