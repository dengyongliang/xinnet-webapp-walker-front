<template lang="pug">
.contReportBudget
  h3.h3T 域名预算总览
  .secBox.secBox1
    h4.h4T.clear
      span.t 域名预算总额
    Row
      Col(span="12")
        strong 域名总览
        em.num 225
          i 元
        ul
          li.clear
            span.l 新注册域名
            span.r 45元
          li.clear
            span.l 域名续费
            span.r 45元
          li.clear
            span.l 域名安全保护
            span.r 45元
          li.clear
            span.l 域名回购
            span.r 45元
      Col(span="12")
        strong 2019年度域名预算
        comp-chart-report-budget-total()

  .secBox.secBox2
    h4.h4T.clear
      span.t 域名注册
    p 据不完全统计下一预算周期即将开放注册的新顶级域 21个，其中推荐注册的有.app、.sep、.op；根据2019年项目规划，需新注通用顶级域名33个。预计新注域名预算如下：

    Row
      Col(span="12")
        strong 新顶级域名注册
        em.num 225
          i 元
        ul
          li.clear
            span.l 重点保护域名
            span.r 45个
          li.clear
            span.l 注册局锁开通率
            span.r 45%
      Col(span="12")
        strong 通用顶级域名注册
        em.num 32
          i 元
        ul
          li.clear
            span.l 已开通
            span.r 32个
          li.clear
            span.l 未开通
            span.r 32个

  .secBox.secBox3
    h4.h4T.clear
      span.t 域名续费及域名安全保护
    Row
      Col(span="12")
        strong 域名续费
        em.num 225
          i 元
        ul
          li.clear
            span.l 新注册域名
            span.r 45元
          li.clear
            span.l 域名续费
            span.r 45元
          li.clear
            span.l 域名安全保护
            span.r 45元
          li.clear
            span.l 域名回购
            span.r 45元
      Col(span="12")
        comp-chart-report-budget-renew()
    Divider()
    Row
      Col(span="12")
        strong 域名安全保护
        em.num 225
          i 元
        ul
          li.clear
            span.l 新注册域名
            span.r 45元
          li.clear
            span.l 域名续费
            span.r 45元
          li.clear
            span.l 域名安全保护
            span.r 45元
          li.clear
            span.l 域名回购
            span.r 45元
      Col(span="12")
        comp-chart-report-budget-safe()

  h3.h3T.clear 域名回购
  .secTable
    <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import compSelect from '@/components/compSelect'
import compChartReportBudgetTotal from '@/components/compChartReportBudgetTotal'
import compChartReportBudgetRenew from '@/components/compChartReportBudgetRenew'
import compChartReportBudgetSafe from '@/components/compChartReportBudgetSafe'

export default {
  components: {
    compInput,
    compSelect,
    compChartReportBudgetTotal,
    compChartReportBudgetRenew,
    compChartReportBudgetSafe
  },
  data () {
    return {
      value: '',
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '提交时间',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '转入完成时间',
          key: 'tansferInTime',
          className: 'col2'
        },
        {
          title: '域名',
          key: 'domainName',
          className: 'col3'
        },
        {
          title: '转入状态',
          key: 'transferStatus',
          className: 'col4',
          render: (h, params) => {
            if (this.list[params.index].transferStatus===4) {
              return h('Tooltip', {
                  props: {
                    content: '转入失败，已退款',
                    placement: "top"
                  }
                },
                [
                  h('Icon', {
                    props: {
                      custom: 'i-icon i-icon-tips',
                      size: "16"
                    },
                    style: {
                      margin: "0 5px 0 0",
                      color: "#48affe"
                    }
                  }),
                  h('a', {
                    props: {
                      href: ''
                    },
                    style: {
                      color: "#f00"
                    }
                  }, this.DATAS.DOMAIN_TRANSFER_STATUS[this.list[params.index].transferStatus])
                ]
              )
            }

            if (this.list[params.index].transferStatus!==4) {
              return h('div', [
                h('a', {
                  props: {
                    href: ''
                  }
                }, this.DATAS.DOMAIN_TRANSFER_STATUS[this.list[params.index].transferStatus])
              ])
            }
          }
        }
      ],
      list: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    pageChange () {

    },
    ...mapActions({
      submitTransferIn: types.SUBMIT_TRANSFER_IN,
      buyBackendLock: types.BUY_BACKEND_LOCK,
      renewBackendLock: types.RENEW_BACKEND_LOCK,
      orderPayDomainRenew: types.ORDER_PAY_DOMAIN_RENEW
    })
  },
  computed: {
  },
  beforeMount () {
  },
  mounted(){
  },
  watch: {
  }
}
</script>

<style>
.contReportBudget .h3T{
  font-size: 25px;
  font-weight: normal;
  padding: 0 0 20px 20px;
}
.contReportBudget .h3T .tR{
  float: right;
  font-size: 12px;
}
.contReportBudget .h3T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportBudget .h3T .tR .ivu-btn{
  margin: 0 10px;
}
.contReportBudget .secBox{
  background: #fff;
  padding: 13px 0;
  margin-bottom: 20px;
}
.contReportBudget .secBox .h4T{
  font-weight: normal;
}
.contReportBudget .secBox .h4T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.contReportBudget .secBox .h4T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.contReportBudget .secBox .h4T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportBudget .secBox .h4T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.contReportBudget .secBox1{
  padding-bottom: 50px;
}
.contReportBudget .secBox1 .ivu-row{
  margin-top: 32px;
}
.contReportBudget .secBox1 .ivu-col{
  height: 215px;
  text-align: center;
}

.contReportBudget .secBox1 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportBudget .secBox1 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportBudget .secBox1 .ivu-col .num i{
  font-size: 25px;
}
.contReportBudget .secBox1 .ivu-col .num:after{
  content: '';
  display: block;
  width: 16px;
  height: 1px;
  background: #999;
  position: absolute;
  left: 50%;
  bottom: 0px;
  margin-left: -8px;
}
.contReportBudget .secBox1 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportBudget .secBox1 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportBudget .secBox1 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportBudget .secBox1 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportBudget .secBox2{
  padding-bottom: 50px;
}
.contReportBudget .secBox2 .h4T{
  margin-bottom: 40px;
}
.contReportBudget .secBox2 p{
  text-align: center;
  font-size: 12px;
}
.contReportBudget .secBox2 .ivu-row{
  margin-top: 32px;
}
.contReportBudget .secBox2 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportBudget .secBox2 .ivu-col:nth-child(2){
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
}

.contReportBudget .secBox2 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportBudget .secBox2 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportBudget .secBox2 .ivu-col .num:after{
  content: '';
  display: block;
  width: 16px;
  height: 1px;
  background: #999;
  position: absolute;
  left: 50%;
  bottom: 0px;
  margin-left: -8px;
}
.contReportBudget .secBox2 .ivu-col .num i{
  font-size: 25px;
}
.contReportBudget .secBox2 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportBudget .secBox2 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportBudget .secBox2 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportBudget .secBox2 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportBudget .secBox3{
  padding-bottom: 50px;
  margin-bottom: 50px;
}
.contReportBudget .secBox3 .ivu-row{
  margin-top: 32px;
}
.contReportBudget .secBox3 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportBudget .secBox3 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportBudget .secBox3 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportBudget .secBox3 .ivu-col .num i{
  font-size: 25px;
}
.contReportBudget .secBox3 .ivu-col .num:after{
  content: '';
  display: block;
  width: 16px;
  height: 1px;
  background: #999;
  position: absolute;
  left: 50%;
  bottom: 0px;
  margin-left: -8px;
}
.contReportBudget .secBox3 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportBudget .secBox3 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportBudget .secBox3 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportBudget .secBox3 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportBudget .secBox3 .ivu-divider{
  margin-top: 40px;
  background: #f7f8fa;
}
.contReportBudget .secTable{
  padding: 0 20px 20px 20px;
  background: #fff;
}
</style>
