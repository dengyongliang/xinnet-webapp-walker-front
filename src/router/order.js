export default {
  path: '/order',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'ORDER_MGMT',
      component (resolve) {
        return require(['@/modular/order/orderMgmt'], resolve)
      },
      meta: {
        title: '订单管理'
      }
    },
    {
      path: 'orderMgmt',
      name: 'ORDER_MGMT',
      component (resolve) {
        return require(['@/modular/order/orderMgmt'], resolve)
      },
      meta: {
        title: '订单管理'
      }
    }
  ]
}