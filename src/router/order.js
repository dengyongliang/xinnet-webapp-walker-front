export default [
  {
    path: 'order',
    name: 'order_mgmt',
    redirect: 'order/orderMgmt'
  },
  {
    path: 'order/orderMgmt',
    name: 'order_mgmt',
    component (resolve) {
      return require(['@/modular/order/orderMgmt'], resolve)
    },
    meta: {
      title: '订单管理'
    }
  }
]
