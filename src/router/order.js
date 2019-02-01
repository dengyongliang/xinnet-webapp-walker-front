export default {
  path: '/order',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'order_mgmt',
      component (resolve) {
        return require(['@/modular/order/orderMgmt'], resolve)
      },
      meta: {
        title: '订单管理'
      }
    },
    {
      path: 'orderMgmt',
      name: 'order_mgmt',
      component (resolve) {
        return require(['@/modular/order/orderMgmt'], resolve)
      },
      meta: {
        title: '订单管理'
      }
    }
  ]
}
