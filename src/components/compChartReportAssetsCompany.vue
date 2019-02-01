<template lang="pug">
  .compChartReportAssetsCompany
    div(id="myChart",style="width:688px;height:328px;")
    p {{charData.companyName}}管理域名数量最多共计<em>{{charData.mainDomainNumber}}</em>个，占域名总数的<em>{{charData.mainDomainRate}}</em>，其余公司管理其余<em>{{charData.otherDomainNumber}}</em>个域名。

</template>

<script>
export default {
  name: 'compChartDomainDueTime',
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
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          x: 'center',
          y: '280',
          itemWidth: 10,
          itemHeight: 10,
          data: datas.map((v) => {
            return v.companyName
          })
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: [' ']
        },
        series: datas.map((v) => {
          return {
            name: v.companyName,
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [v.domainNumber]
          }
        })
      })
    }
  },
  beforeMount () {

  },
  mounted () {
    if (this.charData.domainInfo && this.charData.domainInfo.length) {
      this.drawChart(this.charData.domainInfo)
    }
  },
  computed: {
  },
  watch: {
    charData: function (val, oldVal) {
      this.drawChart(val.domainInfo)
    }
  }
}
</script>
<style scoped>
.compChartReportAssetsCompany{
  text-align: center;
  padding: 30px 0;
}
.compChartReportAssetsCompany #myChart{
  border: 1px solid #d9d9d9;
  margin: 0 auto;
}
.compChartReportAssetsCompany p{
  font-size: 12px;
  padding: 30px 0 0 0;
}
.compChartReportAssetsCompany p em{
  color: #2372f5;
  font-weight: 600;
}
</style>
