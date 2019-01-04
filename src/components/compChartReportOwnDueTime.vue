<template lang="pug">
  .compChartReportOwnDueTime
    div(id="myChart",style="width:688px;height:328px;")
    p 服务期域名为<em>{{charData.expireReportInfo?charData.expireReportInfo[getIdxItem(0)].domainCount:0}}</em>个，急需续费的域名<em>{{charData.expireReportInfo?charData.expireReportInfo[getIdxItem(1)].domainCount:0}}</em>个，赎回期域名<em>{{charData.expireReportInfo?charData.expireReportInfo[getIdxItem(2)].domainCount:0}}</em>个。

</template>

<script>
export default {
  name: 'compChartReportOwnDueTime',
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
    getIdxItem (v) {
      return this.charData.expireReportInfo.findIndex((item)=>(item.serviceStatus === v))
    },
    drawChart (datas) {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title : {
          text: '',
          subtext: '',
          x:'center'
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x : 'center',
          y : '280',
          itemWidth: 10,
          itemHeight: 10,
          data: datas.map((v)=>{
            return this.DATAS.SERVICE_STATE[v.serviceStatus]
          })
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '20%',
          containLabel: true
        },
        xAxis:  {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['']
        },
        series: datas.map((v)=>{
          return {
            name: this.DATAS.SERVICE_STATE[v.serviceStatus],
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [v.domainCount]
          }
        })
      })
    }
  },
  beforeMount () {

  },
  mounted () {
    if (this.charData.expireReportInfo && this.charData.expireReportInfo.length) {
      this.drawChart(this.charData.expireReportInfo)
    }
  },
  computed: {
  },
  watch: {
    charData: function (val, oldVal) {
      this.drawChart(val.expireReportInfo)
    }
  }
}
</script>
<style scoped>
.compChartReportOwnDueTime{
  text-align: center;
  padding: 30px 0;
}
.compChartReportOwnDueTime #myChart{
  border: 1px solid #d9d9d9;
  margin: 0 auto;
}
.compChartReportOwnDueTime p{
  font-size: 12px;
  padding: 30px 0 0 0;
}
.compChartReportOwnDueTime p em{
  color: #2372f5;
  font-weight: 600;
}
</style>
