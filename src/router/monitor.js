export default {
  path: 'monitor',
  name: 'monitor',
  component (resolve) {
    return require(['@/page/mainCont'], resolve)
  },
  meta: {
    title: '域名监控',
    keepAlive: true,
    permission: 'client_monitor',
    compUrl: 'page/mainCont',
    icon: 'i-icon i-icon-finance',
    show: false
  },
  children: [
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
    }
    // ,
    // {
    //   path: 'focus',
    //   name: 'monitor_focus',
    //   component (resolve) {
    //     return require(['@/modular/monitor/focus'], resolve)
    //   },
    //   meta: {
    //     title: '关注域名监控',
    //     keepAlive: true,
    //     powers: 'client_log_domain'
    //   }
    // }
  ]
}
