<template lang="pug">
.compChartReportFocusDomainBrand
  #chartReportFocusDomainBrand
  p 在已注册的域名中，7.2%的域名指向疑似非法网站；16.6%的域名指向出售页面；<br />60.5%的域名未指向网站。指向不良网站的品牌相关域名已给品牌形象造成巨大影响。
</template>

<script>
export default {
  name: 'compChartReportFocusDomainBrand',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportFocusDomainBrand'))
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
            name: '品牌相关域名建站',
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
.compChartReportFocusDomainBrand{
  text-align: center;
  padding: 30px 0;
}
.compChartReportFocusDomainBrand #chartReportFocusDomainBrand{
  height: 200px;
  width: 500px;
  margin: 0 auto;
}
.compChartReportFocusDomainBrand p{
  line-height: 18px;
  font-size: 12px;
  color: #666;
  margin-top: 20px;
}
</style>
