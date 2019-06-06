<template lang="pug">
  .contHome
    .secMain
      Row.row1
        Col(span="12")
          .secBox.secBox1
            h3.h3T.clear
              span.t 企业信息
            .c.clear
              span.logo
                img(:src="myCompany.logoFile?myCompany.logoFile:''")
              .info
                h4 {{myCompany.name}}
                span {{myCompany.status ? '使用中' : '已停用'}}
              ul
                li 联系人：{{myCompany.contactor}}
                li 手机：{{myCompany.mobile}}
                li 邮箱：{{myCompany.email}}
                li 固话：{{myCompany.tel}}
        Col(span="12")
          .secBox.secBox2
            h3.h3T.clear
              span.t 我的管家
            .c.clear
              span.logo
                img(src='../../static/img/img_butler.png')
              .info
                h4 管家姓名：{{myKeeper.userName}}
              Row
                Col(span="12")
                  ul
                    li 座机：{{myKeeper.userTel}}
                    li 邮箱：{{myKeeper.userEmail}}
                    li 手机：{{myKeeper.userMobile}}
                    li 微信：{{myKeeper.wx}}
                    li QQ：{{myKeeper.qq}}
                Col.col2(span="12") 工作时间：周一~周六9：00~18：00<br />非工作时间请拨打7*24小时客服专线<br />400 818 2233
      Row.row2
        Col(span="8")
          .secBox.secBox3
            h3.h3T.clear
              span.t 域名总数 <b>{{domainStatistics.all}}</b>个
              div.tR
                router-link.text(to="/domain/mgmt") 详情
            ul
              li 需要续费的域名：{{domainStatistics.renew}}个
        Col(span="8")
          .secBox.secBox4
            h3.h3T.clear
              span.t 企业数量 <b>{{companyStatistics.companyCount}}</b>个
              div.tR
                router-link.text(to="/mgmt/enterprise") 详情
        Col(span="8")
          .secBox.secBox5
            h3.h3T.clear
              span.t 员工数量 <b>{{userStatistics.userCount}}</b>个
              div.tR
                router-link.text(to="/mgmt/accountMgmt") 详情
      .secBox.secBox6(:class="payStatisticsHistoryBill.thisCycle?('status_'+payStatisticsHistoryBill.status):''")
        h3.h3T.clear
          span.t 账单管理
        Row
          Col(span="12")
            h4.h4T 未出账单
            strong 应结款项：<em>{{payStatisticsUnBilled.creditMoney}}</em>元
            ul
              li.clear
                span.l 结算周期：
                span.r
                  em {{payStatisticsUnBilled.thisCycle}}
              li.clear
                span.l 出账日期：
                span.r
                  em {{payStatisticsUnBilled.outBill}}
              li.clear
                span.l 最晚结算日：
                span.r
                  em {{payStatisticsUnBilled.checkBill}}
          Col(span="12",)
            h4.h4T {{payStatisticsHistoryBill.thisCycle?'已出账单':'暂无已出账单'}}
            strong(v-show="payStatisticsHistoryBill.thisCycle") 账单金额：<em>{{payStatisticsHistoryBill.creditMoney}}</em>元
            ul(v-show="payStatisticsHistoryBill.thisCycle")
              li.clear
                span.l 结算周期：
                span.r
                  em {{payStatisticsHistoryBill.thisCycle}}
              li.clear
                span.l 出账日期：
                span.r
                  em {{payStatisticsHistoryBill.outBill}}
              li.clear
                span.l 结算时间：
                span.r
                  em {{payStatisticsHistoryBill.checkBill}}
        p.other
          span 信用剩余额度：{{accountStatistics.creditBalance}}元
          span 信用总额度：{{accountStatistics.totalCreditBalance}}元
          span 信用已用额度：{{accountStatistics.totalCreditBalance - accountStatistics.creditBalance}}元
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      value: '',
      myCompany: {},
      myKeeper: {},
      domainStatistics: {},
      companyStatistics: {},
      userStatistics: {},
      payStatisticsUnBilled: {},
      payStatisticsHistoryBill: {},
      accountStatistics: {}
    }
  },
  methods: {
  },
  computed: {
  },
  beforeMount () {
    Promise.all([
      this.$store.dispatch('MY_COMPANY'),
      this.$store.dispatch('MY_KEEPER'),
      this.$store.dispatch('INDEX_DOMAIN_STATISTICS'),
      this.$store.dispatch('COMPANY_STATISTICS'),
      this.$store.dispatch('USER_STATISTICS'),
      this.$store.dispatch('INDEX_PAY_STATISTICS_UNBILLED'),
      this.$store.dispatch('INDEX_PAY_STATISTICS_HISTORY_BILL'),
      this.$store.dispatch('ACCOUNT_STATISTICS')
    ]).then(response => {
      console.log(response)
      this.myCompany = response[0].data.data
      this.myKeeper = response[1].data.data
      this.domainStatistics = response[2].data.data
      this.companyStatistics = response[3].data.data
      this.userStatistics = response[4].data.data
      this.payStatisticsUnBilled = response[5].data.data
      this.payStatisticsHistoryBill = response[6].data.data
      this.accountStatistics = response[7].data.data.customerAccountInfo
    }).catch(() => {})
  },
  mounted () {
  }
}
</script>

<style scoped>
.contHome .secMain{
  background: none;
}
.contHome .secBox{
  background: #fff;
  padding: 13px 0;
}
.contHome .secBox .h3T{
  font-weight: normal;
}
.contHome .secBox .h3T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.contHome .secBox .h3T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.contHome .secBox .h3T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.contHome .secBox1{
  margin-right: 10px;
  height: 346px;
}
.contHome .row1 .h3T{
  margin-bottom: 30px;
}
.contHome .row1 .c{
  padding: 0 40px;
}
.contHome .row1 .logo{
  width:80px;
  height:80px;
  border-radius:100%;
  overflow:hidden;
  border:5px solid #fff;
  vertical-align:middle;
  margin-right: 20px;
  margin-bottom: 25px;
  float: left;
  -moz-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  -webkit-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  box-shadow:0px 0px 6px rgba(0,0,0,0.2);
}
.contHome .row1 .logo img{
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.contHome .row1 .info{
  overflow: hidden;
}
.contHome .row1 .info h4{
  font-size: 19px;
  margin-bottom: 20px;
  margin-top: 12px;
}
.contHome .row1 .info span{
  font-size: 16px;
  color: #135edb;
}
.contHome .row1 .ivu-row{
  clear:both;
}
.contHome .row1 .c .col2{
  font-size: 12px;
  line-height: 26px;
  color: #666;
}
.contHome .row1 ul{
  clear: both;
}
.contHome .row1 li{
  color: #666;
  padding: 7px 0;
  font-size: 12px;
}
.contHome .secBox2{
  margin-left: 10px;
  height: 346px;
}
.contHome .secBox2 .h3T{
  margin-bottom: 30px;
}
.contHome .secBox2 .c{
  padding: 0 40px;
}
.contHome .secBox3{
  margin-right: 10px;
  height: 90px;
}
.contHome .secBox3 ul{
  padding: 0 20px;
  font-size: 12px;
}
.contHome .secBox3 li{
  color: #666;
  padding: 10px 0;
}
.contHome .secBox4{
  margin: 0 10px;
  height: 90px;
}
.contHome .secBox5{
  margin-left: 10px;
  height: 90px;
}
.contHome .secBox3 .h3T .t,
.contHome .secBox4 .h3T .t,
.contHome .secBox5 .h3T .t{
  border-color: #fff;
}
.contHome .row1{
  margin-bottom: 20px;
}
.contHome .row2{
  margin-bottom: 20px;
}
.contHome .secBox6{
  padding-bottom: 0px;
}
.contHome .secBox6 .h3T{
  margin-bottom: 60px;
}
.contHome .secBox6 .h4T{
  font-weight: normal;
  text-align: center;
}
.contHome .secBox6 strong{
  display: block;
  font-weight: normal;
  text-align: center;
  font-size: 17px;
  padding: 10px 0 20px 0;
  position: relative;
}
.contHome .secBox6 strong:after{
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
.contHome .secBox6 strong em{
  font-size: 28px;
  font-weight: 600;
}
.contHome .secBox6 .ivu-col:nth-child(1){
  border-right: 1px solid #ededed;
}
.contHome .secBox6 ul{
  font-size: 12px;
  padding: 20px 55px 0 55px;
}
.contHome .secBox6 ul li{
  padding-bottom: 14px;
}
.contHome .secBox6 ul .l{
  float: left;
  color: #666;
}
.contHome .secBox6 ul .r{
  float: right;
  color: #666;
}
.contHome .secBox6 .other{
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #ededed;
  padding: 0 40px;
  margin-top: 40px;
}
.contHome .status_1{
  background:#fff url(../../static/img/img_bill_1.png) no-repeat 95% 40px;
}
.contHome .status_2{
  background:#fff url(../../static/img/img_bill_2.png) no-repeat 95% 40px;
}
.contHome .status_3{
  background:#fff url(../../static/img/img_bill_3.png) no-repeat 95% 40px;
}
.contHome .secBox6 .other span{
  display: inline-block;
  margin-right: 50px;
  color: #666;
  font-size: 12px;
}
</style>
