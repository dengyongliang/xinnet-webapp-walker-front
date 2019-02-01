<template lang="pug">
.compChartOverviewCompany
  #myChart
</template>

<script>
export default {
  name: 'compChartOverviewCompany',
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
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
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
          data: datas.company && Object.keys(datas.company).length ? Object.keys(datas.company) : ['无']
        },
        series: [
          {
            name: '域名所属公司',
            type: 'pie',
            radius: ['50%', '85%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            data: datas.company && Object.values(datas.company).length ? Object.values(datas.company) : [{'name': '无', 'value': 0}],
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
.compChartOverviewCompany{
  text-align: center;
}
.compChartOverviewCompany #myChart{
  height: 200px;
  width: 500px;
  margin: 0 auto;
}
</style>
