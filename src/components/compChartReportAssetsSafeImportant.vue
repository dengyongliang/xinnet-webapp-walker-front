<template lang="pug">
  .compChartReportAssetsSafeImportant
    div(id="chartReportAssetsSafeImportant",style="width:450px;height:328px;")
</template>

<script>
export default {
  name: 'compChartReportAssetsSafeImportant',
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
      let myChart = this.$echarts.init(document.getElementById('chartReportAssetsSafeImportant'))
      let labelOption = {
        normal: {
          show: true,
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          formatter: '{c}',
          fontSize: 12,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      }
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
        legend: {
          x: 'center',
          y: '90%',
          itemWidth: 10,
          itemHeight: 10,
          data: ['已开通', '未开通']
        },
        calculable: true,
        xAxis: {
          type: 'category',
          axisTick: {show: false},
          data: ['注册局锁', '自动续费', '禁止更新']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '已开通',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            data: [datas.backEndLockOpenNumber, datas.autoRenewOpenNumber, datas.updateProhibitedOpenNumber]
          },
          {
            name: '未开通',
            type: 'bar',
            label: labelOption,
            data: [datas.backEndLockNumber, datas.autoRenewNumber, datas.updateProhibitedNumber]
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
.compChartReportAssetsSafeImportant{
  padding: 30px 0;
  text-align: left;
}
.compChartReportAssetsSafeImportant #chartReportAssetsSafeImportant{
  border: 1px solid #d9d9d9;
  margin: 0 auto;
}
</style>
