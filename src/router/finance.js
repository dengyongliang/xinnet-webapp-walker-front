export default {
  path: 'finance',
  name: 'finance',
  component (resolve) {
    return require(['@/page/mainCont'], resolve)
  },
  meta: {
    title: '财务',
    keepAlive: true,
    permission: 'client_finance',
    compUrl: 'page/mainCont',
    icon: 'i-icon i-icon-bill',
    show: true
  },
  children: [
    {
      path: 'overview',
      name: 'finance_overview',
      component (resolve) {
        return require(['@/modular/finance/overview'], resolve)
      },
      meta: {
        title: '财务总览',
        keepAlive: true,
        permission: 'client_finance_overview',
        compUrl: 'modular/finance/overview',
        show: true
      }
    },
    {
      path: 'billMgmt',
      name: 'finance_billmgmt',
      component (resolve) {
        return require(['@/modular/finance/billMgmt'], resolve)
      },
      meta: {
        title: '账单管理',
        keepAlive: true,
        permission: 'client_finance_bill',
        compUrl: 'modular/finance/billMgmt',
        show: true
      }
    }
  ]
}
