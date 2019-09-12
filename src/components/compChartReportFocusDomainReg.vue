<template lang="pug">
.compChartReportFocusDomainReg
  #chartReportFocusDomainReg(style="width:500px;height:320px;")
</template>

<script>
export default {
  name: 'compChartReportFocusDomainReg',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportFocusDomainReg'))
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
          top: '90%',
          itemWidth: 10,
          itemHeight: 10,
          data: Object.keys(datas)
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '3%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['未注册', '已注册']
        },
        yAxis: {
          type: 'value'
        },
        series: Object.keys(datas).map((v) => {
          return {
            name: v,
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            barWidth: '30%',
            data: datas[v]
          }
        })
      })
    }
  },
  beforeMount () {

  },
  mounted () {
    this.drawChart(this.charData)
  },
  computed: {
  },
  watch: {
    charData: {
      handler (val, oldVal) {
        this.drawChart(val)
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.compChartReportFocusDomainReg{
  padding: 30px 0 86px 0;
  text-align: left;
}

.compChartReportFocusDomainReg #chartReportFocusDomainReg{
  border: 1px solid #d9d9d9;
  margin: 0 auto;
}
</style>
