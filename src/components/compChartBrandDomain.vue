<template lang="pug">
  .chartBrandDomain
    div(id="compChartBrandDomain",style="width:450px;height:220px;")
    span.tit 域名：<em>12</em> 个
</template>

<script>
export default {
  name: 'compChartBrandDomain',
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
      let myChart = this.$echarts.init(document.getElementById('compChartBrandDomain'))
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
          data: ['服务期', '续费期', '偿还期']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '80%',
            center: ['30%', '50%'],
            data: [
              {value: datas.ddServiceCount, name: '服务期'},
              {value: datas.ddRenewCount, name: '续费期'},
              {value: datas.ddPaybackCount, name: '偿还期'}
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
.chartBrandDomain{
  position: relative;
  text-align: center;
}
.chartBrandDomain .tit{
  position: absolute;
  left: 50%;
  top: 50px;
  margin-left: 115px;
}
.chartBrandDomain .tit em{
  font-size: 16px;
  font-weight: 600;
}
#compChartBrandDomain{
  display: inline-block;
  margin: 0 auto;
}
</style>
