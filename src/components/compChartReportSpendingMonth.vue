<template lang="pug">
.compChartReportSpendingMonth
  #chartReportSpendingMonth
</template>

<script>
export default {
  name: 'compChartReportSpendingMonth',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportSpendingMonth'))
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
          top: '95%',
          data: datas.goodTypeList.map((v) => {
            return this.DATAS.ORDER_GOODS_TYPE[v]
          })
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
        series: datas.goodTypeList.map((v) => {
          return {
            name: this.DATAS.ORDER_GOODS_TYPE[v],
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
/* .compChartReportSpendingMonth{
  text-align: center;
} */
.compChartReportSpendingMonth #chartReportSpendingMonth{
  height: 430px;
  width: 800px;
  margin: 0 auto;
}
</style>
