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
    // {
    //   path: 'brandlib',
    //   name: 'monitor_brandlib',
    //   component (resolve) {
    //     return require(['@/modular/monitor/brandlib'], resolve)
    //   },
    //   meta: {
    //     title: '品牌库',
    //     keepAlive: true,
    //     permission: '',
    //     compUrl: 'modular/monitor/brandlib',
    //     show: true,
    //     isLogin: true
    //   }
    // },
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
    // {
    //   path: 'brand',
    //   name: 'monitor_brand',
    //   component (resolve) {
    //     return require(['@/modular/monitor/brand'], resolve)
    //   },
    //   meta: {
    //     title: '商标监控',
    //     keepAlive: true,
    //     permission: '',
    //     compUrl: 'modular/monitor/brand',
    //     show: true,
    //     isLogin: true
    //   }
    // },
    {
      path: 'tmch',
      name: 'monitor_tmch',
      component (resolve) {
        return require(['@/modular/monitor/tmch'], resolve)
      },
      meta: {
        title: 'TMCH',
        keepAlive: true,
        permission: '',
        compUrl: 'modular/monitor/tmch',
        show: true,
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
        permission: '',
        compUrl: 'modular/monitor/dpml',
        show: true,
        isLogin: true
      }
    }
  ]
}
