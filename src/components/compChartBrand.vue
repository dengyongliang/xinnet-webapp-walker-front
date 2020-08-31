<template lang="pug">
  .chartBrand
    div(id="compChartBrand",style="width:450px;height:220px;")
    span.tit 商标：<em>12</em> 个
</template>

<script>
export default {
  name: 'compChartBrand',
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
      let myChart = this.$echarts.init(document.getElementById('compChartBrand'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        color: this.echartsColorList,
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '12%',
          top: '40%',
          itemWidth: 10,
          itemHeight: 10,
          data: ['有效商标', '审核中', '需续展', '已失效']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '80%',
            center: ['30%', '50%'],
            data: [
              {value: datas.ttValidCount, name: '有效商标'},
              {value: datas.ttApplyCount, name: '审核中'},
              {value: datas.ttExtensionCount, name: '需续展'},
              {value: datas.ttInvalidCount, name: '已失效'}
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
.chartBrand{
  position: relative;
  text-align: center;
}
.chartBrand .tit{
  position: absolute;
  left: 50%;
  top: 50px;
  margin-left: 102px;
}
.chartBrand .tit em{
  font-size: 16px;
  font-weight: 600;
}
#compChartBrand{
  display: inline-block;
  margin: 0 auto;
}
</style>
