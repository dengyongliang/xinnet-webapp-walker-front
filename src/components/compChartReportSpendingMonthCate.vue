<template lang="pug">
.compChartReportSpendingMonthCate
  #chartReportSpendingMonthCate
</template>

<script>
export default {
  name: 'compChartReportSpendingMonthCate',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportSpendingMonthCate'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          // 坐标轴指示器，坐标轴触发有效
          axisPointer: {
            // 默认为直线，可选为：'line' | 'shadow'
            type: 'shadow'
          }
        },
        color: this.echartsColorList,
        legend: {
          top: '95%',
          data: datas.companyNameList
        },
        grid: {
          top: '5%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: datas.dateList
        },
        yAxis: {
          type: 'value'
        },
        series: datas.companyNameList.map((v) => {
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
            data: datas.result[v]
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
/* .compChartReportSpendingMonthCate{
  text-align: center;
} */
.compChartReportSpendingMonthCate #chartReportSpendingMonthCate{
  height: 430px;
  width: 800px;
  margin: 0 auto;
}
</style>
