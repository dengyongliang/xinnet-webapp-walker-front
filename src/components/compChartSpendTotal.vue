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
          data: this.charData.legend
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '70%',
            center: ['30%', '50%'],
            data: this.charData.series,
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

</style>
