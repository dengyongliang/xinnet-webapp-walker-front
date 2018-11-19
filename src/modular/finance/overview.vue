<template lang="pug">
.contOverview
  <!-- 标题区 -->
  h1.pageTitle.clear 财务总览

  .secMain
    div.sec.count
      div.t.clear
        span.text 消费统计
        .r
          span.text 统计日期
          DatePicker(type="daterange",placeholder="",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",placement="bottom-end")
      div.c
        Row
          Col.data(span="12")
            .colWrap
              table
                tr
                  td.col1 信用消费：
                  td.col2 5,125.12元
                tr
                  td.col1 预付费消费：
                  td.col2 5,125.12元
              Divider(dashed)
              table
                tr
                  td.col1 消费总额：
                  td.col2 <em>5,125.12</em>元
          Col.chart(span="12")
            .colWrap
              div.chartCount(id="myChart",style="width:450px;height:300px;")
      <Table :columns="columns" :data="clientList" :loading="loadingTable"></Table>
    div.sec.trend
      div.t.clear
        span.text 消费趋势
        .r
          span.text 统计日期
          DatePicker(type="daterange",placeholder="",v-model="time2",format="yyyy-MM-dd",@on-change="time=$event",placement="bottom-end")
      compChartSpendTrend()
</template>

<script>
import compChartSpendTrend from '@/components/compChartSpendTrend'
export default {
  components: {
    compChartSpendTrend
  },
  data () {
    return {
      time: '',
      time2: '',
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '创建时间',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '企业名称',
          key: 'name',
          className: 'col2'
        },
        {
          title: '客户ID',
          key: 'customerUserId',
          className: 'col3'
        },
        {
          title: '账期',
          key: 'accountPeriod',
          className: 'col4'
        },
        {
          title: '额度',
          key: 'creditBalance',
          className: 'col5'
        },
        {
          title: '状态',
          key: 'status',
          className: 'col6'
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    let param = {
                      client: this.clientList[params.index].name,
                      money: this.clientList[params.index].orgCode,
                      cycle: this.clientList[params.index].customerUserId,
                      balance: this.clientList[params.index].accountPeriod
                    }
                    this.showDrawerBillConfirm(param)
                  }
                }
              }, '结算')
            ])
          }
        }
      ],
      clientList: [],
    }
  },
  methods: {
    drawLine (param) {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title : {
          text: '',
          subtext: '',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          right: '12%',
          top: 'center',
          data: ['域名注册','域名续费','域名回购','域名安全保护']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '70%',
            center: ['30%', '50%'],
            data:[
              {value:1032, name:'域名注册'},
              {value:325, name:'域名续费'},
              {value:500, name:'域名回购'},
              {value:13654, name:'域名安全保护'}
            ],
            label: {
                normal: {
                  show: false,
                  position: 'inner'
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
  computed: {
  },
  beforeMount () {
  },
  mounted(){
    this.drawLine()
  }
}
</script>

<style scoped>
.contOverview .secMain{
  background:none;
}
.contOverview .sec{
  background:#fff;
  padding:20px 0 0 0;
  margin-bottom:20px;
}
.contOverview .sec .t{
  padding:0 20px 0 0;
}
.contOverview .sec .t .text{
  font-size:16px;
  border-left:5px solid #2271f2;
  display:inline-block;
  height:25px;
  line-height:25px;
  padding-left:15px;
}
.contOverview .sec .r{
  float:right;
  font-size:12px;
}
.contOverview .sec .r .text{
  font-size:12px;
  padding:0px;
  border:none;
  color:#666;
  margin-right:10px;
}
.contOverview .sec.count .colWrap{
  padding: 0 15%;
  font-size:12px;
}
.contOverview .sec.count td{
  line-height:35px;
}
.contOverview .sec.count td.col2{
  text-align:right;
}
.contOverview .sec.count td.col2 em{
  font-size:16px;
  font-weight:600;
  color:#f10c09;
}
.ivu-divider{
  margin:10px 0;
}
.chartCount{
  display:inline-block;
  margin:0 auto;
}
.contOverview .ivu-col.chart .colWrap{
  padding:0px!important;
  text-align:center;
}
.contOverview .ivu-col.data .colWrap{
  padding-top:80px;
}
.contOverview .sec.trend{
  text-align:center;
  padding-bottom:30px;
}
.contOverview .sec.trend .t{
  text-align:left;
}

</style>
