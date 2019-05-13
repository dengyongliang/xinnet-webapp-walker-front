<template lang="pug">
.pagePayConfirm
  header-body
  .mainBody
    h1 订单确认
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="payConfirmData.jsonObj" :loading="loadingTable"></Table>
      .total(v-show="payConfirmData.jsonObj.length") 合计：<em>{{total}}</em>元
      .readme(v-show="payConfirmData.jsonObj.length")
        Checkbox(v-model="readme", @on-change="readmeChange") 我已阅读并同意
        a(href="#") 《域名注册协议》
    .btn(v-show="payConfirmData.jsonObj.length")
      Button(type="primary", @click="nextForm", :loading="loadingBtn", :disabled="disabled") 下一步
</template>

<script>
import {mapState} from 'vuex'
import headerBody from '../modular/header'
export default {
  components: {
    headerBody
  },
  data () {
    return {
      payConfirmData: {
        jsonObj: []
      },
      loadingTable: false,
      loadingBtn: false,
      disabled: true,
      readme: false,
      columns: [
        {
          title: '产品名称',
          key: 'orderGoodsType',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.DATAS.ORDER_GOODS_TYPE[this.payConfirmData.jsonObj[params.index].orderGoodsType])
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
          className: 'col7',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.DATAS.ORDER_TYPE[this.payConfirmData.jsonObj[params.index].orderType])
            ])
          }
        },
        {
          title: '数量',
          key: 'action',
          width: 170,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Select', {
                props: {
                  value: this.payConfirmData.jsonObj[params.index].price,
                  'label-in-value': true
                },
                on: {
                  'on-change': (event) => {
                    console.log(event)
                    this.payConfirmData.jsonObj[params.index].num = event.label
                    this.payConfirmData.jsonObj[params.index].price = event.value
                    this.payConfirmData.jsonObj[params.index].unit = event.value.split('_')[1]
                    localStorage.setItem('data_pay_confirm', JSON.stringify(this.payConfirmData))
                  }
                },
                style: {
                  'display': this.payConfirmData.jsonObj[params.index].num ? 'inline-block' : 'none'
                }
              },
              params.row.goodsNumAndPrice.map((item) => {
                return h('Option', {
                  props: {
                    value: item.price + '_' + item.unit,
                    label: item.num
                  }
                })
              })),
              h('span', {
                style: {
                  display: !this.payConfirmData.jsonObj[params.index].num ? 'inline-block' : 'none'
                }
              }, '已超最大续费年限')
            ])
          }
        },
        {
          title: '价格（元）',
          key: 'price',
          className: 'col6',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#f00'
                }
              }, this.payConfirmData.jsonObj[params.index].num ? (this.payConfirmData.jsonObj[params.index].price.split('_')[0] + '元') : '-')
            ])
          }
        },
        {
          title: '付款方式',
          key: 'methed',
          className: 'col7',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.payConfirmData.jsonObj[params.index].num ? '信用消费' : '-')
            ])
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  custom: 'i-icon i-icon-error1',
                  size: '16'
                },
                on: {
                  click: () => {
                    this.payConfirmData.jsonObj.splice(params.index, 1)
                    localStorage.setItem('data_pay_confirm', JSON.stringify(this.payConfirmData))
                  }
                }
              }, '')
            ])
          }
        }
      ]
    }
  },
  methods: {
    readmeChange () {
      this.disabled = !this.readme
    },
    nextForm () {
      this.payConfirmData.jsonObj.map((v) => {
        v.payStatus = null
        v.errorText = ''
      })
      this.$store.commit('SET_PAY_ORDERS_FINISH', this.payConfirmData)
      this.$router.push({path: '/pay'})
    }
  },
  computed: {
    total () {
      if (typeof this.payConfirmData.jsonObj !== 'undefined' && this.payConfirmData.jsonObj.length) {
        return this.payConfirmData.jsonObj.reduce((prev, cur) => {
          return (cur.price.split('_')[0] * 1) + prev
        }, 0)
      }
      return 0
    },
    ...mapState([
      'payOrders'
    ])
  },
  beforeMount () {
    // 查看vuex中是否有数据，有使用vuex数据
    // 如果没有数据，查看本地存储中是否存在数据，有使用本地存储数据
    // 都没有，显示空列表
    if (this.payOrders.jsonObj.length) {
      this.payConfirmData = this.payOrders
      localStorage.setItem('data_pay_confirm', JSON.stringify(this.payOrders))
    } else if (localStorage.getItem('data_pay_confirm')) {
      this.payConfirmData = JSON.parse(localStorage.getItem('data_pay_confirm'))
    } else {
    }
  },
  mounted () {
  },
  watch: {
    payOrders: {
      handler (newV, oldV) {
      },
      deep: true
    }
  }
}
</script>

<style>
.pagePayConfirm .mainBody{
  width:1200px;
  margin:0 auto;
  padding-top:100px;
}
.pagePayConfirm .mainBody h1{
  height:202px;
  line-height:202px;
  background:url(../../static/img/activation/img_01.png) no-repeat;
  font-size:30px;
  color:#fff;
  font-weight:400;
  text-align:center;
}
.pagePayConfirm .mainBody .secTable{
  padding:0 50px 50px 50px;
  background: #fff;
}
.pagePayConfirm .total{
  text-align: right;
  padding: 40px 0 20px 0;
}
.pagePayConfirm .total{
  font-size:14px;
}
.pagePayConfirm .total em{
  font-size:26px;
  color:#f00;
  font-weight:600;
}
.pagePayConfirm .readme{
  text-align: right;
}
.pagePayConfirm .readme a{
  color:#0f5bd3;
}
.pagePayConfirm .btn {
  text-align:right;
  padding: 36px 50px;
}
.pagePayConfirm .btn button{
  width:100px;
}
.pagePayConfirm .operate .ivu-icon{
  cursor: pointer;
}
.pagePayConfirm .operate .ivu-icon:hover{
  color: #f00;
}
</style>
