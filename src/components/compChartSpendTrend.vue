<template lang="pug">
  div
    div.chartTrend(id="myChart2",style="height:400px;")
    a(@click="show") show
</template>

<script>
export default {
  name: 'compChartSpendTrend',
  props: {

  },
  data () {
    return {
      xAxis_list: [],
      obj: []
    }
  },
  methods: {
    show () {
      console.log(this.obj)
    },
    drawLine2 (param) {
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart.setOption({
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
          x : 'center',
          y : 'bottom',
          data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis:  {
            type: 'category',
            data: this.xAxis_list
        },
        yAxis: {
          type: 'value'
        },
        series: [
            {
                name: '直接访问',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320, 302]
            },
            {
                name: '邮件营销',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120, 132]
            },
            {
                name: '联盟广告',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, 182]
            },
            {
                name: '视频广告',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150, 212]
            },
            {
                name: '搜索引擎',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [820, 832]
            }
        ]
      })
    }
  },
  beforeMount () {
    var result = {
      "2018-11": [
        {
          "orderGoodsType": 1,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 200
        },
        {
          "orderGoodsType": 2,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 0
        },
        {
          "orderGoodsType": 3,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 100
        },
        {
          "orderGoodsType": 4,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 0
        },
        {
          "orderGoodsType": 5,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 0
        }
      ],
      "2018-12": [
        {
          "orderGoodsType": 1,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 200
        },
        {
          "orderGoodsType": 2,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 0
        },
        {
          "orderGoodsType": 3,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 100
        },
        {
          "orderGoodsType": 4,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 0
        },
        {
          "orderGoodsType": 5,
          "orderCreditMoney": 0,
          "orderPayMoney": 0,
          "orderTotalMoney": 0
        }
      ]
    }
    this.xAxis_list = Object.keys(result)
    var obj = []

    Object.values(result).map(function(val,idx,array){
      obj[idx] = {}

      obj[idx].name = name
    })
    this.obj = obj

  },
  mounted () {
    this.drawLine2()
  },
  computed: {
  }
}
</script>
<style scoped>
.chartTrend{
  width:900px!important;
  margin: 0 auto;
  padding-bottom:20px;
}
</style>
