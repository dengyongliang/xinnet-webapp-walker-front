<template lang="pug">
.contOrderMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 订单管理
  .secFilter
    form.filterWrap(ref="exportForm",target="_blank" method="post" accept-charset="utf-8" :action="exportLink")
      table
        tr.row1
          td.td1
            span.n 搜索：
            .inputWrap
              <Input v-model="param.orderGoodsInfo" placeholder="订单编号/域名/用户名" />
          td.td2
            span.n 下单时间：
            .inputWrap
              DatePicker(type="daterange",placeholder="全部",v-model="param.createTime",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
          td.td3
            span.n 下单方式：
            .inputWrap
              Select(v-model="param.orderMode")
                Option(v-for="item in orderModeList",:value="item.value",:key="item.value") {{ item.label }}

          td.td4
            span.n 产品类型：
            .inputWrap
              Select(v-model="param.orderGoodsType")
                Option(v-for="item in orderGoodsTypeList",:value="item.value",:key="item.value") {{ item.label }}
        tr.row2
          td.td1
            span.n 订单类型：
            .inputWrap
              Select(v-model="param.orderType")
                Option(v-for="item in orderTypeList",:value="item.value",:key="item.value") {{ item.label }}
          td.td2
            span.n 付款方式：
            .inputWrap
              Select(v-model="param.orderPayType")
                Option(v-for="item in orderPayTypeList",:value="item.value",:key="item.value") {{ item.label }}
          td.td3
          td.tdBtn
            Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
            a(href="javascript:;",class="exportOrder",@click="exportOrder") 导出订单
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="orderList" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",:page-size=20, show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange")

</template>

<script>
import * as actions from '@/actions/order.js'
import moment from 'moment'
export default {
  components: {
  },
  data () {
    return {
      exportLink: actions.EXPORT_ORDER,
      searchUserId: '',
      time: '',
      param: {
        orderGoodsInfo: '',
        orderMode: '',
        createTime: [],
        orderGoodsType: '',
        orderType: '',
        orderPayType: ''
      },
      orderModeList: (function (vm) {
        let array = [{
          label: '全部',
          value: ''
        }]
        for (var i in vm.DATAS.ORDER_MODE) {
          array.push({
            label: vm.DATAS.ORDER_MODE[i],
            value: i + ''
          })
        }
        return array
      })(this),
      orderGoodsTypeList: (function (vm) {
        let array = [{
          label: '全部',
          value: ''
        }]
        for (var i in vm.DATAS.ORDER_GOODS_TYPE) {
          array.push({
            label: vm.DATAS.ORDER_GOODS_TYPE[i],
            value: i + ''
          })
        }
        return array
      })(this),
      orderTypeList: (function (vm) {
        let array = [{
          label: '全部',
          value: ''
        }]
        for (var i in vm.DATAS.ORDER_TYPE) {
          array.push({
            label: vm.DATAS.ORDER_TYPE[i],
            value: i + ''
          })
        }
        return array
      })(this),
      orderPayTypeList: (function (vm) {
        let array = [{
          label: '全部',
          value: ''
        }]
        for (var i in vm.DATAS.ORDER_PAY_TYPE) {
          array.push({
            label: vm.DATAS.ORDER_PAY_TYPE[i],
            value: i + ''
          })
        }
        return array
      })(this),
      columns: [
        {
          title: '下单时间',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '订单编号',
          key: 'orderCode',
          className: 'col2'
        },
        {
          title: '下单方式',
          key: 'orderMode',
          className: 'col3',
          render: (h, params) => {
            if (this.orderList[params.index].orderMode === 1) {
              return h('div', [
                h('span', {}, '用户下单')
              ])
            }
            if (this.orderList[params.index].orderMode === 2) {
              return h('div', [
                h('span', {}, '系统下单')
              ])
            }
            if (this.orderList[params.index].orderMode === 3) {
              return h('div', [
                h('span', {}, '线下下单')
              ])
            }
          }
        },
        {
          title: '用户',
          key: 'userCode',
          className: 'col5'
        },
        {
          title: '产品名称',
          key: 'orderGoodsName',
          className: 'col6'
        },
        {
          title: '域名',
          key: 'orderGoodsInfo',
          className: 'col7'
        },
        {
          title: '数量',
          key: 'orderGoodsNum',
          className: 'col8',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.orderList[params.index].orderGoodsNum + this.DATAS.UNIT[this.orderList[params.index].orderGoodsUnit])
            ])
          }
        },
        {
          title: '订单类型',
          key: 'orderType',
          className: 'col9',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.DATAS.ORDER_TYPE[this.orderList[params.index].orderType])
            ])
          }
        },
        {
          title: '金额',
          key: 'orderMoney',
          className: 'col10',
          render: (h, params) => {
            return h('div', [
              h('span', {}, this.orderList[params.index].orderMoney + ' 元')
            ])
          }
        },
        {
          title: '付款方式',
          key: 'orderPayType',
          className: 'col11',
          render: (h, params) => {
            if (this.orderList[params.index].orderPayType === 1) {
              return h('div', [
                h('span', {}, '信用消费')
              ])
            }
            if (this.orderList[params.index].orderPayType === 2) {
              return h('div', [
                h('span', {}, '预付款消费')
              ])
            }
          }
        }
      ],
      orderList: [],
      loadingTable: true,
      loadingBtn: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchListData () {
      // 查询数据
      this.queryList(1)
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryList(curPage)
    },
    exportOrder () {
      this.$refs.exportForm.submit()
    },
    queryOrderListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        createTimeBegin: this.param.createTime[0] !== '' ? moment(this.param.createTime[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        createTimeEnd: this.param.createTime[1] !== '' ? moment(this.param.createTime[1]).format('YYYY-MM-DD') + ' 23:59:59' : '',
        orderGoodsInfo: this.param.orderGoodsInfo,
        orderGoodsType: this.param.orderGoodsType,
        orderMode: this.param.orderMode,
        orderPayType: this.param.orderPayType,
        orderType: this.param.orderType
      }
      return params
    },
    queryList (num) {
      this.$store.dispatch('ORDER_MANAGE', this.queryOrderListParam({pageNum: num})).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.orderList = response.data.data.list
          this.page.pageItems = response.data.data.totalNum
        } else {
          // if (response.data.code === '900') {
          //   this.$Message.error('查询失败')
          // }
        }
      }).catch(() => {})
    }
  },
  computed: {
  },
  create () {

  },
  beforeMount () {

  },
  mounted () {
    if (this.$route.query.orderGoodsType) {
      this.$set(this.param, 'orderGoodsType', this.$route.query.orderGoodsType + '')
    }
    if (this.$route.query.startTime) {
      this.param.createTime[0] = this.$route.query.startTime
    }
    if (this.$route.query.endTime) {
      this.param.createTime[1] = this.$route.query.endTime
    }
    this.queryList(1)
  },
  watch: {

  }
}
</script>

<style scoped>
.pageTitle .tR{
  float:right;
  font-size:12px;
}
.pageTitle .tR input{
  height:32px;
  line-height:32px;
  min-height:32px;
  margin-left:10px;
}
.pageTitle .tR .xwBtn{
  height:32px;
  line-height:32px;
  min-height:32px;
  font-size:12px;
  margin-left:10px;
}
.secMain{
  padding-top:0px;
}
.exportOrder{
  margin-left:20px;
}
</style>
