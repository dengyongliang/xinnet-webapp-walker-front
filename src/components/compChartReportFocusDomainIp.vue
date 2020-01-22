<template lang="pug">
.compChartReportFocusDomainIp
  #chartReportFocusDomainIp
  p(v-if="charData.list && charData.list['非大陆IP']") {{((charData.list['大陆IP'] / charData.total) * 100).toFixed(2)}}%的域名指向国内IP，{{((charData.list['非大陆IP'] / charData.total) * 100).toFixed(2)}}%的域名指向国外的IP，{{((charData.list['未解析'] / charData.total) * 100).toFixed(2)}}%的域名未解析。对于域名指<br />向IP的情况需要进行监控，及时发现域名指向IP的变化情况，早做防范。
</template>

<script>
export default {
  name: 'compChartReportFocusDomainIp',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportFocusDomainIp'))
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
          data: Object.keys(datas)
        },
        series: [
          {
            name: '域名指向IP',
            type: 'pie',
            radius: '85%',
            center: ['40%', '50%'],
            data: Object.keys(datas).map((v) => {
              return {
                value: datas[v],
                name: v
              }
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
    this.drawChart(this.charData.list)
  },
  computed: {
  },
  watch: {
    charData: function (val, oldVal) {
      this.drawChart(val.list)
    }
  }
}
</script>
<style scoped>
.compChartReportFocusDomainIp{
  text-align: center;
  padding: 30px 0;
}
.compChartReportFocusDomainIp #chartReportFocusDomainIp{
  height: 200px;
  width: 500px;
  margin: 0 auto;
}
.compChartReportFocusDomainIp p{
  line-height: 18px;
  font-size: 12px;
  color: #666;
  margin-top: 20px;
}
</style>
