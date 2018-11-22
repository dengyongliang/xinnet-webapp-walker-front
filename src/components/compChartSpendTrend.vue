<template lang="pug">
  div
    div.chartTrend(id="myChart2",style="height:400px;")
</template>

<script>
export default {
  name: 'compChartSpendTrend',
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
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart.setOption({
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
          x : 'center',
          y : 'bottom',
          data: ['域名注册', '域名续费','域名回购','域名安全保护']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis:  {
            type: 'category',
            data: this.charData.data
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '域名注册',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320, 302]
          },
          {
            name: '域名续费',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [120, 132]
          },
          {
            name: '域名回购',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220, 182]
          },
          {
            name: '域名安全保护',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [150, 212]
          }
        ]
      })
    }
  },
  beforeMount () {
  },
  mounted () {
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
.chartTrend{
  width:900px!important;
  margin: 0 auto;
  padding-bottom:20px;
}
</style>
