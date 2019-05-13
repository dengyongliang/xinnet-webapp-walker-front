<template lang="pug">
.compChartOverviewSuffix
  #myChart1
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
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
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
          data: ['新域名注册', '域名续费', '域名安全保护', '域名回购']
        },
        series: [
          {
            name: '域名预算',
            type: 'pie',
            radius: '85%',
            center: ['40%', '50%'],
            data: [
              {value: datas.registerMoney, name: '新域名注册'},
              {value: datas.renewMoney, name: '域名续费'},
              {value: datas.safeMoney, name: '域名安全保护'},
              {value: datas.repurchaseMoney, name: '域名回购'}
            ],
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
.compChartOverviewSuffix{
  text-align: center;
}
.compChartOverviewSuffix #myChart1{
  height: 200px;
  width: 500px;
  margin: 0 auto;
}
</style>
