export default {
  path: '/finance',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'FINANCE_OVERVIEW',
      component (resolve) {
        return require(['@/modular/finance/overview'], resolve)
      },
      meta: {
        title: '财务总览'
      }
    },
    {
      path: 'overview',
      name: 'FINANCE_OVERVIEW',
      component (resolve) {
        return require(['@/modular/finance/overview'], resolve)
      },
      meta: {
        title: '财务总览'
      }
    },
    {
      path: 'billMgmt',
      name: 'FINANCE_BILLMGMT',
      component (resolve) {
        return require(['@/modular/finance/billMgmt'], resolve)
      },
      meta: {
        title: '账单管理'
      }
    }
  ]
}