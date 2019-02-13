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
    .btn(v-show="!pay")
      Button(type="primary", @click="toPay", :loading="loadingBtn",) 立即支付
    .total(v-show="pay") 实付金额：<em>{{realPrice}}</em>元
</template>

<script>
import {mapState, mapActions} from 'vuex'
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
              }, this.DATAS.ORDER_GOODS_TYPE[this.payFinishData.jsonObj[params.index].orderGoodsType])
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
          className: 'col4'
        },
        {
          title: '价格（元）',
          key: 'price',
          className: 'col5',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#f00'
                }
              }, this.payFinishData.jsonObj[params.index].price.split('_')[0] + '元')
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
                  color: '#f00',
                  display: this.payFinishData.jsonObj[params.index].payStatus === 'fail' ? 'inline-block' : 'none'
                }
              }, this.payFinishData.jsonObj[params.index].errorText),
              h('Button', {
                style: {
                  border: 'none',
                  background: 'none',
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
      if (this.payFinishData.creditBalance < this.total) {
        this.$Message.error('当前账户余额不足')
        return false
      }
      this.pay = true
      let templateId = this.payFinishData.templateId
      let groupId = this.payFinishData.groupId
      this.payFinishData.jsonObj.map((v, i, arr) => {
        this.$set(v, 'payStatus', 'ing')
        let params = {
          param: {
            jsonObj: {
              domainName: v.domainName,
              orderPayType: 1,
              orderMoney: v.price.split('_')[0] * 1,
              orderGoodsNum: v.num,
              orderType: v.orderType,
              orderGoodsType: v.orderGoodsType,
              domainPassword: v.domainPwd,
              templateId: templateId,
              groupId: groupId
            }
          },
          callback: (response) => {
            if (!response) {
              return false
            }
            let data = response.data
            if (data.code === '1000') {
              this.realPrice += this.payFinishData.jsonObj[i].price.split('_')[0] * 1
              this.payFinishData.creditBalance -= this.payFinishData.jsonObj[i].price.split('_')[0] * 1
              // this.payFinishData.jsonObj[i].payStatus = 'success'
              let v = this.payFinishData.jsonObj[i]
              v.payStatus = 'success'
              this.$set(this.payFinishData.jsonObj, i, v)
            } else {
              let v = this.payFinishData.jsonObj[i]
              v.payStatus = 'fail'
              v.errorText = data.msg
              this.$set(this.payFinishData.jsonObj, i, v)
            }
          }
        }
        this.orderPayment(params)
      })
    },
    ...mapActions({
      orderPayment: types.ORDER_PAYMENT
    })
  },
  computed: {
    total () {
      if (typeof this.payFinishData.jsonObj !== 'undefined' && this.payFinishData.jsonObj.length) {
        return this.payFinishData.jsonObj.reduce((prev, cur) => {
          return (cur.price.split('_')[0] * 1) + prev
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
    if (this.payOrdersFinish.jsonObj) {
      localStorage.setItem('data_pay_finish', JSON.stringify(this.payOrdersFinish))
      this.payFinishData = this.payOrdersFinish
      // this.payFinishData = JSON.parse(localStorage.getItem('data_pay_finish'))
    } else if (localStorage.getItem('data_pay_finish')) {
      this.payFinishData = JSON.parse(localStorage.getItem('data_pay_finish'))
    } else {
      this.payFinishData.jsonObj = []
    }
  },
  mounted () {
  },
  watch: {
    payFinishData: {
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
