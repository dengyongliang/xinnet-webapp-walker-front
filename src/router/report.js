export default {
  path: '/report',
  // redirect: '/report/center',
  component (resolve) {
    return require(['@/page/report'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'REPORT_CENTER',
      component (resolve) {
        return require(['@/modular/report/center'], resolve)
      },
      meta: {
        title: '报告中心'
      }
    },
    {
      path: 'own',
      name: 'REPORT_OWN',
      component (resolve) {
        return require(['@/modular/report/own'], resolve)
      },
      meta: {
        title: '自有域名监控报告'
      }
    },
    {
      path: 'assets',
      name: 'REPORT_ASSETS',
      component (resolve) {
        return require(['@/modular/report/assets'], resolve)
      },
      meta: {
        title: '域名资产报告'
      }
    },
    {
      path: 'budget',
      name: 'budget',
      component (resolve) {
        return require(['@/modular/report/budget'], resolve)
      },
      props: true,
      meta: {
        title: '域名预算报告'
      }
    },
    {
      path: 'spending',
      name: 'REPORT_SPENDING',
      component (resolve) {
        return require(['@/modular/report/spending'], resolve)
      },
      meta: {
        title: '域名消费报告'
      }
    }
  ]
}