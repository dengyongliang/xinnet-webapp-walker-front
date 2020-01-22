<template lang="pug">
  .compChartReportFocusDomainAnomaly
    div(id="chartReportFocusDomainAnomaly",style="width:500px;height:320px;")
    p 已注册关注域名中，{{charData.total}}个域名存在异常情况，需要重点关注。详细异常情况可通过 <router-link to="/monitor/focus">关注域名监控</router-link> 查看全部监控通知查看。
</template>

<script>
export default {
  name: 'compChartReportFocusDomainAnomaly',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportFocusDomainAnomaly'))
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
          right: '3%',
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
.compChartReportFocusDomainAnomaly{
  padding: 30px 0;
}
.compChartReportFocusDomainAnomaly p{
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  padding: 0 100px;
  line-height: 18px;
  text-align: center;
}
.compChartReportFocusDomainAnomaly p a{
  color: #2271f4;
}
.compChartReportFocusDomainAnomaly #chartReportFocusDomainAnomaly{
  border: 1px solid #d9d9d9;
  margin: 0 auto;
}
</style>
