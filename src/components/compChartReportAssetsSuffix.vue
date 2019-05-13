<template lang="pug">
  .compChartDomainDueTime
    div(id="myChart2",style="width:688px;height:328px;")
    p 主流域名后缀.com、.cn、.com.cn，占域名总数的{{charData.mainSuffixRate}}，共计{{charData.mainSuffixNumber}}个，其余域名后缀类型，共计{{charData.otherSuffixNumber}}个域名。
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
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        color: this.echartsColorList,
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
            return v.suffixName
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
          data: ['']
        },
        series: datas.map((v) => {
          return {
            name: v.suffixName,
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
.compChartDomainDueTime{
  text-align: center;
  padding: 30px 0;
}
.compChartDomainDueTime #myChart2{
  border: 1px solid #d9d9d9;
  margin: 0 auto;
}
.compChartDomainDueTime p{
  font-size: 12px;
  padding: 30px 0 0 0;
}
.compChartDomainDueTime p em{
  color: #2372f5;
  font-weight: 600;
}
</style>
