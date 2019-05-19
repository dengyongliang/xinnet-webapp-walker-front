export default [
  // {
  //   path: 'finance',
  //   name: 'finance_overview',
  //   redirect: 'finance/overview'
  // },
  {
    path: 'finance/overview',
    name: 'finance_overview',
    component (resolve) {
      return require(['@/modular/finance/overview'], resolve)
    },
    meta: {
      title: '财务总览',
      keepAlive: true,
      powers: 'client_finance_overview',
      compName: 'modular/finance/overview'
    }
  },
  {
    path: 'finance/billMgmt',
    name: 'finance_billmgmt',
    component (resolve) {
      return require(['@/modular/finance/billMgmt'], resolve)
    },
    meta: {
      title: '账单管理',
      keepAlive: true,
      powers: 'client_finance_bill',
      compName: 'modular/finance/billMgmt'
    }
  }
]
