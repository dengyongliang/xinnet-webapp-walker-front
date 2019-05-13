export default [
  {
    path: 'finance',
    name: 'finance_overview',
    redirect: 'finance/overview'
  },
  {
    path: 'finance/overview',
    name: 'finance_overview',
    component (resolve) {
      return require(['@/modular/finance/overview'], resolve)
    },
    meta: {
      title: '财务总览'
    }
  },
  {
    path: 'finance/billMgmt',
    name: 'finance_billmgmt',
    component (resolve) {
      return require(['@/modular/finance/billMgmt'], resolve)
    },
    meta: {
      title: '账单管理'
    }
  }
]
