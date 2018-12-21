<template lang="pug">
.pagePay
  header-body
  .mainBody
    h1(v-show="!pay") 订单结算
      p.clear 已确认订单信息，请尽快完成支付 <a href="javascript:;" @click="toBackModify">修改</a>
    h1(v-show="pay") 支付结果
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="payFinishData.jsonObj" :loading="loadingTable"></Table>
      .price 应付金额：<em>{{total}}</em>元
      .quota 剩余信用额度：<em>{{payFinishData.creditBalance}}</em>元
    .btn(v-show="!pay && (payFinishData.creditBalance >= total)")
      Button(type="primary", @click="toPay", :loading="loadingBtn",) 立即支付
    .total(v-show="pay") 实付金额：<em>{{realPrice}}</em>元
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import headerBody from '../modular/header'
export default {
  components: {
    headerBody
  },
  data () {
    return {
      loadingTable: false,
      loadingBtn: false,
      pay: false,
      realPrice: 0,
      payFinishData: {
        jsonObj: []
      },
      columns: [
        {
          title: '产品名称',
          key: 'orderGoodsType',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.GLOBALS.ORDER_GOODS_TYPE[this.payFinishData.jsonObj[params.index].orderGoodsType])
            ])
          }
        },
        {
          title: '域名',
          key: 'domainName',
          className: 'col2'
        },
        {
          title: '订单类型',
          key: 'orderType',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.DATAS.ORDER_TYPE[this.payFinishData.jsonObj[params.index].orderType])
            ])
          }
        },
        {
           title: '数量',
           key: 'num',
           className: 'col4',
        },
        {
          title: '价格（元）',
          key: 'price',
          className: 'col5',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color:'#f00'
                }
              }, this.payFinishData.jsonObj[params.index].price.split("_")[0] + '元')
            ])
          }
        },
        {
          title: '付款方式',
          key: 'methed',
          className: 'col6',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, '信用消费')
            ])
          }
        },
        {
          title: '支付状态',
          key: '',
          className: 'result',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: this.payFinishData.jsonObj[params.index].payStatus === null ? 'inline-block' : 'none'
                }
              }, '待支付'),
              h('span', {
                style: {
                  display: this.payFinishData.jsonObj[params.index].payStatus === 'success' ? 'inline-block' : 'none'
                }
              }, '支付成功'),
              h('span', {
                style: {
                  color: "#f00",
                  display: this.payFinishData.jsonObj[params.index].payStatus === 'fail' ? 'inline-block' : 'none'
                }
              }, this.payFinishData.jsonObj[params.index].errorText),
              h('Button', {
                style: {
                  border: "none",
                  background: "none",
                  display: this.payFinishData.jsonObj[params.index].payStatus === 'ing' ? 'inline-block' : 'none'
                },
                props: {
                  loading: true
                }
              }, '')
            ])
          }
        }
      ]
    }
  },
  methods: {
    toBackModify () {
      this.$router.push({path: '/payConfirm'})
    },
    toPay () {
      this.pay = true
      let templateId = this.payFinishData.templateId
      let groupId = this.payFinishData.groupId
      this.payFinishData.jsonObj.map((v,i,arr) => {
        v.payStatus = "ing"
        let params = {
          param: {

          },
          callback: (response) => {
            let data = response.data
            if (data.code === '1000') {
              this.realPrice += this.payFinishData.jsonObj[i].price.split("_")[0] * 1
              this.payFinishData.creditBalance -= this.payFinishData.jsonObj[i].price.split("_")[0] * 1
              this.payFinishData.jsonObj[i].payStatus = "success"
            } else {
              if (data.code==='100') {
                this.payFinishData.jsonObj[i].errorText = '域名正在转入中，无法重复提交'
              } else if (data.code==='200') {
                this.payFinishData.jsonObj[i].errorText = '余额不足'
              } else {
                this.payFinishData.jsonObj[i].errorText = '支付失败'
              }
              this.payFinishData.jsonObj[i].payStatus = "fail"
            }
          }
        }
        if (this.payFinishData.type==="4_1") {
          params.param = {
            domainName: v.domainName,
            orderMoney: v.price.split("_")[0] * 1,
            orderGoodsNum: v.num,
            orderPayType: 1
          }
          this.buyBackendLock(params)
        } else if (this.payFinishData.type==="4_2") {
          params.param = {
            domainName: v.domainName,
            orderMoney: v.price.split("_")[0] * 1,
            orderGoodsNum: v.num,
            orderPayType: 1
          }
          this.renewBackendLock(params)
        } else {
          params.param = {
            templateId: templateId,
            groupId: groupId,
            domainName: v.domainName,
            domainPassword: v.domainPwd,
            orderPayType: 1
          }
          this.submitTransferIn(params)
        }
      })

    },
    ...mapActions({
      submitTransferIn: types.SUBMIT_TRANSFER_IN,
      buyBackendLock: types.BUY_BACKEND_LOCK,
      renewBackendLock: types.RENEW_BACKEND_LOCK
    })
  },
  computed: {
    total () {
      if (typeof this.payFinishData.jsonObj !== 'undefined' && this.payFinishData.jsonObj.length) {
        return this.payFinishData.jsonObj.reduce(function(prev, cur) {
          return (cur.price.split("_")[0] * 1) + prev
        }, 0)
      } else {
        return 0
      }
    },
    ...mapState([
      'payOrdersFinish'
    ])
  },
  beforeMount () {
    // 查看vuex中是否有数据，有使用vuex数据
    // 如果没有数据，查看本地存储中是否存在数据，有使用本地存储数据
    // 都没有，显示空列表
    if (this.payOrdersFinish.jsonObj.length) {
      this.payFinishData = this.payOrdersFinish
      localStorage.setItem('data_pay_finish', JSON.stringify(this.payFinishData))
    } else if (localStorage.getItem("data_pay_finish")) {
      this.payFinishData = JSON.parse(localStorage.getItem('data_pay_finish'))
    } else {
    }
  },
  mounted(){
  },
  watch: {
    payOrdersFinish: {
      handler (newV, oldV) {
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.pagePay .mainBody{
  width:1200px;
  margin:0 auto;
  padding-top:100px;
}
.pagePay .mainBody h1{
  height:202px;
  background:url(../../static/img/activation/img_01.png) no-repeat;
  font-size:30px;
  color:#fff;
  font-weight:400;
  text-align:center;
  padding-top:70px;
}
.pagePay .mainBody h1 p{
  color:#fcd106;
  font-size:16px;
  margin-top:15px;
  position:relative;
}
.pagePay .mainBody h1 a{
  position:absolute;
  right:70px;
  top:0px;
  color:#fff;
  font-size:14px;
  text-decoration: underline;
}
.pagePay .mainBody .secTable{
  padding:0 50px 50px 50px;
  background: #fff;
}
.pagePay .total{
  text-align: right;
  padding: 30px 50px 20px 0;
  font-size:14px;
}
.pagePay .quota{
  text-align: right;
  font-size:14px;
}
.pagePay .price{
  text-align: right;
  font-size:14px;
  padding: 30px 0 20px 0;
}
.pagePay .total em{
  font-size:26px;
  color:#f00;
  font-weight:600;
}
.pagePay .btn {
  text-align:right;
  padding: 36px 50px;
}
.pagePay .btn button{
  width:100px;
}
</style>
