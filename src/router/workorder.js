export default {
  path: '/workorder',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'WORKORDER',
      component (resolve) {
        return require(['@/modular/workorder/order'], resolve)
      },
      meta: {
        title: '工单管理'
      }
    },
    {
      path: 'order',
      name: 'WORKORDER',
      component (resolve) {
        return require(['@/modular/workorder/order'], resolve)
      },
      meta: {
        title: '工单管理'
      }
    }
  ]
}