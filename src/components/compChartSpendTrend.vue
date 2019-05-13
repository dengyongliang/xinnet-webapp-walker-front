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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: this.echartsColorList,
        legend: {
          x: 'center',
          y: 'bottom',
          data: this.charData.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.charData.xAxis,
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: 'value'
        },
        series: this.charData.series
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
