<template lang="pug">
.compChartReportSpendingCompany
  #chartReportSpendingCompany
</template>

<script>
export default {
  name: 'compChartReportSpendingCompany',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportSpendingCompany'))
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
          top: 'center',
          itemWidth: 10,
          itemHeight: 10,
          data: datas.map((v) => {
            return v.companyName
          })
        },
        series: [
          {
            name: '消费统计',
            type: 'pie',
            radius: '85%',
            center: ['40%', '50%'],
            data: datas.map((v) => {
              return {value: v.totalMoney, name: v.companyName}
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
    this.drawChart(this.charData.companyList)
  },
  computed: {
  },
  watch: {
    charData: {
      handler (val, oldVal) {
        this.drawChart(val.companyList)
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.compChartReportSpendingCompany{
  text-align: center;
}
.compChartReportSpendingCompany #chartReportSpendingCompany{
  height: 200px;
  width: 500px;
  margin: 0 auto;
}
</style>
