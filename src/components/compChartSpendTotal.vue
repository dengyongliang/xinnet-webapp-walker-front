<template lang="pug">
  div.chartCount(id="myChart",style="width:450px;height:300px;")
</template>

<script>
export default {
  name: 'compChartSpendTotal',
  props: {
    charData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    drawChart (datas) {
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
            radius : '70%',
            center: ['30%', '50%'],
            data:[
              {value:1032, name:'域名注册'},
              {value:325, name:'域名续费'},
              {value:500, name:'域名回购'},
              {value:13654, name:'域名安全保护'}
            ],
            label: {
                normal: {
                  show: true,
                  position: 'inner',
                  formatter: '{d}%'
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
    this.drawChart()
  },
  computed: {
  },
  watch: {
    charData: function (val, oldVal) {
      this.drawChart(val)
    }
  }
}
</script>
<style scoped>

</style>
