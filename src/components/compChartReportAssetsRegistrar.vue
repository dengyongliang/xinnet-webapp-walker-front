<template lang="pug">
  .compChartReportAssetsRegistrar
    div(id="chartReportAssetsRegistrar",style="width:688px;height:328px;")

</template>

<script>
export default {
  name: 'compChartReportAssetsRegistrar',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportAssetsRegistrar'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        color: this.echartsColorList,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          x: 'center',
          y: '280',
          itemWidth: 10,
          itemHeight: 10,
          data: datas.map((v) => {
            return v.registrarName
          })
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: [' ']
        },
        series: datas.map((v) => {
          return {
            name: v.registrarName,
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [v.domainCount]
          }
        })
      })
    }
  },
  beforeMount () {

  },
  mounted () {
    if (this.charData.length) {
      this.drawChart(this.charData)
    }
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
.compChartReportAssetsRegistrar{
  padding: 30px 0;
}
.compChartReportAssetsRegistrar #chartReportAssetsRegistrar{
  border: 1px solid #d9d9d9;
  margin: 0 auto;
}
.compChartReportAssetsRegistrar p{
  font-size: 12px;
  padding: 30px 0 0 0;
  text-align: center;
}
.compChartReportAssetsRegistrar p em{
  color: #2372f5;
  font-weight: 600;
}
</style>
