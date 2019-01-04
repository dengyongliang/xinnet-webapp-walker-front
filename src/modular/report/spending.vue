<template lang="pug">
.contReportSpending
  h3.h3T 消费总览
    .tR 2018年3月1日至2019年2月28日，河北天翼实业集团有限公司及其旗下公司数字品牌资产共计消费<b class="num">45545</b>元。
  .secBox.secBox1
    h4.h4T.clear
      span.t 域名预算总额
    Row
      Col(span="12")
        ul
          li.clear
            span.l 域名注册：
            span.r 45元
          li.clear
            span.l 域名续费：
            span.r 45元
          li.clear
            span.l 域名回购：
            span.r 45元
          li.clear
            span.l 域名安全保护：
            span.r 45元
          li.clear.total
            span.l 总计：
            span.r <b>45545</b>元
      Col(span="12")
        comp-chart-report-spending-cate()

  .secBox.secBox2
    h4.h4T.clear
      span.t 每月消费类别及金额
    .c
      comp-chart-report-spending-month()
  h3.h3T 各企业消费统计
  .secBox.secBox3
    h4.h4T.clear
      span.t 各企业消费金额及占比
    Row
      Col(span="12")
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
          li.clear.total
            span.l 总计：
            span.r <b>45545</b>元
      Col(span="12")
        comp-chart-report-spending-company()

  .secBox.secBox4
    h4.h4T.clear
      span.t 各企业消费类别统计
    .c
      comp-chart-report-spending-company-cate()
  .secBox.secBox5
    h4.h4T.clear
      span.t 各企业每月消费类别统计
    .c
      comp-chart-report-spending-month-cate()

  h3.h3T.clear 消费明细
  .secTable
    <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import compChartReportSpendingCate from '@/components/compChartReportSpendingCate'
import compChartReportSpendingCompany from '@/components/compChartReportSpendingCompany'
import compChartReportSpendingMonth from '@/components/compChartReportSpendingMonth'
import compChartReportSpendingCompanyCate from '@/components/compChartReportSpendingCompanyCate'
import compChartReportSpendingMonthCate from '@/components/compChartReportSpendingMonthCate'

export default {
  components: {
    compChartReportSpendingCate,
    compChartReportSpendingCompany,
    compChartReportSpendingMonth,
    compChartReportSpendingCompanyCate,
    compChartReportSpendingMonthCate
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
.contReportSpending .h3T{
  font-size: 25px;
  font-weight: normal;
  padding: 0 0 20px 20px;
}
.contReportSpending .h3T .tR{
  float: right;
  font-size: 14px;
}
.contReportSpending .h3T .tR .num{
  color: #f30a0d;
}
.contReportSpending .h3T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportSpending .h3T .tR .ivu-btn{
  margin: 0 10px;
}
.contReportSpending .secBox{
  background: #fff;
  padding: 13px 0;
  margin-bottom: 20px;
}
.contReportSpending .secBox .h4T{
  font-weight: normal;
}
.contReportSpending .secBox .h4T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.contReportSpending .secBox .h4T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.contReportSpending .secBox .h4T .tR span.text{
  padding: 0 10px 0 0;
}
.contReportSpending .secBox .h4T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.contReportSpending .secBox1{
  padding-bottom: 50px;
}
.contReportSpending .secBox1 .ivu-row{
  margin-top: 32px;
}
.contReportSpending .secBox1 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportSpending .secBox1 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportSpending .secBox1 .ivu-col ul li{
  padding-bottom: 25px;
}
.contReportSpending .secBox1 .ivu-col ul li.total{
  border-top: 1px dashed #eee;
  padding-top: 25px;
}
.contReportSpending .secBox1 .ivu-col ul li.total b{
  color: #f40a0b;
  font-size: 20px;
}
.contReportSpending .secBox1 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportSpending .secBox1 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportSpending .secBox2{
  margin-bottom: 40px;
}
.contReportSpending .secBox2 .c{
  padding: 40px 0;
}
.contReportSpending .secBox2 .ivu-row{
  margin-top: 32px;
}
.contReportSpending .secBox2 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportSpending .secBox2 .ivu-col:nth-child(2){
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
}

.contReportSpending .secBox2 .ivu-col strong{
  font-weight: normal;
  display: block;
  padding-top: 20px;
}
.contReportSpending .secBox2 .ivu-col .num{
  font-size: 40px;
  font-weight: 600;
  display: block;
  padding: 5px 0 15px 0;
  position:relative;
}
.contReportSpending .secBox2 .ivu-col .num:after{
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
.contReportSpending .secBox2 .ivu-col .num i{
  font-size: 25px;
}
.contReportSpending .secBox2 .ivu-col ul{
  font-size: 12px;
  padding: 20px 55px 0 55px;
}
.contReportSpending .secBox2 .ivu-col ul li{
  padding-bottom: 14px;
}
.contReportSpending .secBox2 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportSpending .secBox2 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportSpending .secBox3{
  padding-bottom: 50px;
  margin-bottom: 50px;
}
.contReportSpending .secBox3 .ivu-row{
  margin-top: 32px;
}
.contReportSpending .secBox3 .ivu-col{
  height: 215px;
  text-align: center;
}
.contReportSpending .secBox3 .ivu-col ul{
  width: 240px;
  font-size: 12px;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
.contReportSpending .secBox3 .ivu-col ul li{
  padding-bottom: 25px;
}
.contReportSpending .secBox3 .ivu-col ul li.total{
  border-top: 1px dashed #eee;
  padding-top: 25px;
}
.contReportSpending .secBox3 .ivu-col ul li.total b{
  color: #f40a0b;
  font-size: 20px;
}
.contReportSpending .secBox3 .ivu-col ul .l{
  float: left;
  color: #666;
}
.contReportSpending .secBox3 .ivu-col ul .r{
  float: right;
  color: #666;
}
.contReportSpending .secBox3 .ivu-divider{
  margin-top: 40px;
  background: #f7f8fa;
}
.contReportSpending .secBox4 .c{
  padding: 40px 0;
}
.contReportSpending .secBox5{
  margin-bottom: 40px;
}
.contReportSpending .secBox5 .c{
  padding: 40px 0;
}
.contReportSpending .secTable{
  padding: 0 20px 20px 20px;
  background: #fff;
}
</style>
