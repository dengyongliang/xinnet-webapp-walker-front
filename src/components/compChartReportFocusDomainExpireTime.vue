<template lang="pug">
  .compChartReportFocusDomainExpireTime
    div(id="chartReportFocusDomainExpireTime")
    p 到期时间3年及以上的域名{{charData.threeYearsCount}}个占比{{charData.threeYearsRatio}}，今年到期的域名{{charData.oneYearsCount}}个占比{{charData.oneYearsRatio}}。对于到期未及时续费的域名，品牌方及时参与抢注，能够用较低的成本获得域名。
</template>

<script>
export default {
  name: 'compChartReportFocusDomainExpireTime',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportFocusDomainExpireTime'))
      // 绘制图表
      myChart.setOption({
        color: ['#4f7acb', '#d5d5d5'],
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '2.5%',
          bottom: '3%',
          containLabel: true
        },
        // legend: {
        //   x: 'center',
        //   y: '90%',
        //   itemWidth: 10,
        //   itemHeight: 10,
        //   data: ['已开通', '未开通']
        // },
        xAxis: {
          type: 'category',
          axisTick: {alignWithLabel: true},
          data: Object.keys(datas.list),
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '30%',
            data: Object.values(datas.list)
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
.compChartReportFocusDomainExpireTime{
  padding: 30px 0;
  text-align: left;
}
.compChartReportFocusDomainExpireTime p{
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-top: 30px;
}
.compChartReportFocusDomainExpireTime #chartReportFocusDomainExpireTime{
  width: 760px;
  height: 350px;
  border: 1px solid #d9d9d9;
  margin: 0 auto;
}
</style>
