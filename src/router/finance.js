export default {
  path: '/finance',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'finance_overview',
      component (resolve) {
        return require(['@/modular/finance/overview'], resolve)
      },
      meta: {
        title: '财务总览'
      }
    },
    {
      path: 'overview',
      name: 'finance_overview',
      component (resolve) {
        return require(['@/modular/finance/overview'], resolve)
      },
      meta: {
        title: '财务总览'
      }
    },
    {
      path: 'billMgmt',
      name: 'finance_billmgmt',
      component (resolve) {
        return require(['@/modular/finance/billMgmt'], resolve)
      },
      meta: {
        title: '账单管理'
      }
    }
  ]
}
