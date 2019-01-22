<template lang="pug">
.compChartOverviewSuffix
  #myChart2
  p 2019年需要续费的域名{{charData.renewNumber}}个，占全部域名的{{charData.renewRate}}。
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
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
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
          data:['需要续费','不需要续费']
        },
        series : [
          {
            name: '域名续费',
            type: 'pie',
            radius : '85%',
            center: ['40%', '50%'],
            data:[
              {value: datas.renewNumber, name: '需要续费'},
              {value: datas.serviceNumber, name: '不需要续费'}
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
.compChartOverviewSuffix #myChart2{
  height: 200px;
  width: 500px;
  margin: 0 auto;
}
.compChartOverviewSuffix p{
  font-size: 12px;
  text-align: center;
}
</style>
