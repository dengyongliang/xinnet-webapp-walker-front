export default {
  path: 'order',
  name: 'order',
  component (resolve) {
    return require(['@/page/mainCont'], resolve)
  },
  meta: {
    title: '订单',
    keepAlive: true,
    permission: 'client_order',
    compUrl: 'page/mainCont',
    icon: 'i-icon i-icon-file',
    show: false
  },
  children: [
    {
      path: 'orderMgmt',
      name: 'order_mgmt',
      component (resolve) {
        return require(['@/modular/order/orderMgmt'], resolve)
      },
      meta: {
        title: '订单管理',
        keepAlive: true,
        permission: 'client_order_manage',
        compUrl: 'modular/order/orderMgmt',
        show: false,
        isLogin: true
      }
    }
  ]
}
