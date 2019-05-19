export default [
  // {
  //   path: 'monitor',
  //   name: 'monitor_own',
  //   redirect: 'monitor/own'
  // },
  {
    path: 'monitor/own',
    name: 'monitor_own',
    component (resolve) {
      return require(['@/modular/monitor/own'], resolve)
    },
    meta: {
      title: '自有域名监控',
      keepAlive: true,
      powers: 'client_monitor_own',
      compName: 'modular/monitor/own'
    }
  }
  // ,
  // {
  //   path: 'monitor/focus',
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
