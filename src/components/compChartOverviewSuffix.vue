<template lang="pug">
.compChartOverviewSuffix
  #myChartSuffix
</template>

<script>
export default {
  name: 'compChartOverviewSuffix',
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
      let myChart = this.$echarts.init(document.getElementById('myChartSuffix'))
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
          right: '18%',
          top: 'center',
          itemWidth: 10,
          itemHeight: 10,
          data: Object.keys(datas.domainSuffix)
        },
        series: [
          {
            name: '域名所属公司',
            type: 'pie',
            radius: ['50%', '85%'],
            center: ['23%', '50%'],
            avoidLabelOverlap: false,
            data: Object.values(datas.domainSuffix),
            label: {
              normal: {
                show: true,
                position: 'inner'
                // formatter: '{d}%（{c}个）'
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
    this.drawChart(this.charData)
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
.compChartOverviewSuffix{
  text-align: center;
}
.compChartOverviewSuffix #myChartSuffix{
  height: 200px;
  width: 560px;
  margin: 0 auto;
}
</style>
