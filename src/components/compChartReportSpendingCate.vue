<template lang="pug">
.compChartReportSpendingCate
  #myChartSuffix
</template>

<script>
export default {
  name: 'compChartReportSpendingCate',
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
        title : {
          text: '',
          subtext: '',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          right: '12%',
          top: 'center',
          itemWidth: 10,
          itemHeight: 10,
          data: datas.map((v) => {
            return v.type
          })
        },
        series : [
          {
            name: '消费统计',
            type: 'pie',
            radius : '85%',
            center: ['40%', '50%'],
            data: datas.map((v) => {
              return {value: v.money, name: v.type}
            }),
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter: '{d}%（{c}个）'
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
    this.drawChart(this.charData.businessList)
  },
  computed: {
  },
  watch: {
    charData: {
      handler(val, oldVal) {
        this.drawChart(val.businessList)
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.compChartReportSpendingCate{
  text-align: center;
}
.compChartReportSpendingCate #myChartSuffix{
  height: 200px;
  width: 500px;
  margin: 0 auto;
}
</style>
