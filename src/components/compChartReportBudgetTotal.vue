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
          data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
          {
            name: '域名所属公司',
            type: 'pie',
            radius : '85%',
            center: ['40%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
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
