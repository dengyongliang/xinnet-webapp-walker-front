export default {
  path: 'monitor',
  name: 'monitor',
  component (resolve) {
    return require(['@/page/mainCont'], resolve)
  },
  meta: {
    title: '品牌保护',
    keepAlive: true,
    permission: 'client_monitor',
    compUrl: 'page/mainCont',
    icon: 'i-icon i-icon-protect',
    show: false
  },
  children: [
    {
      path: 'brandlib',
      name: 'monitor_brandlib',
      component (resolve) {
        return require(['@/modular/monitor/brandlib'], resolve)
      },
      meta: {
        title: '品牌库',
        keepAlive: true,
        permission: 'client_brand',
        compUrl: 'modular/monitor/brandlib',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'own',
      name: 'monitor_own',
      component (resolve) {
        return require(['@/modular/monitor/own'], resolve)
      },
      meta: {
        title: '自有域名监控',
        keepAlive: true,
        permission: 'client_monitor_own',
        compUrl: 'modular/monitor/own',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'focus',
      name: 'monitor_focus',
      component (resolve) {
        return require(['@/modular/monitor/focus'], resolve)
      },
      meta: {
        title: '关注域名监控',
        keepAlive: true,
        permission: 'client_monitor_focus',
        compUrl: 'modular/monitor/focus',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'brand',
      name: 'monitor_brand',
      component (resolve) {
        return require(['@/modular/monitor/brand'], resolve)
      },
      meta: {
        title: '商标监控',
        keepAlive: true,
        permission: 'client_tm_monitor',
        compUrl: 'modular/monitor/brand',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'followBrandDetail/id/:id',
      name: 'followBrandDetail',
      component (resolve) {
        return require(['@/modular/monitor/followBrandDetail'], resolve)
      },
      meta: {
        title: '品牌详情',
        keepAlive: true,
        permission: '',
        compUrl: 'modular/monitor/followBrandDetail',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'similarTrademarkDetail/id/:id',
      name: 'similarTrademarkDetail',
      component (resolve) {
        return require(['@/modular/monitor/trademarkSimilarDetail'], resolve)
      },
      meta: {
        title: '近似商标监控详情',
        keepAlive: true,
        permission: '',
        compUrl: 'modular/monitor/trademarkSimilarDetail',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'bodyTrademarkDetail/monitorBodyId/:monitorBodyId/applicantCn/:applicantCn',
      name: 'bodyTrademarkDetail',
      component (resolve) {
        return require(['@/modular/monitor/trademarkBodyDetail'], resolve)
      },
      meta: {
        title: '主体监控详情查询',
        keepAlive: true,
        permission: '',
        compUrl: 'modular/monitor/trademarkBodyDetail',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'tmch',
      name: 'monitor_tmch',
      component (resolve) {
        return require(['@/modular/monitor/tmch'], resolve)
      },
      meta: {
        title: 'TMCH',
        keepAlive: true,
        permission: 'client_tmch',
        compUrl: 'modular/monitor/tmch',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'dpml',
      name: 'monitor_dpml',
      component (resolve) {
        return require(['@/modular/monitor/dpml'], resolve)
      },
      meta: {
        title: 'DPML',
        keepAlive: true,
        permission: 'client_dpml',
        compUrl: 'modular/monitor/dpml',
        show: false,
        isLogin: true
      }
    }
  ]
}
