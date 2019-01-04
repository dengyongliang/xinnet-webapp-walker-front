export default {
  path: '/monitor',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'MONITOR_OWN',
      component (resolve) {
        return require(['@/modular/monitor/own'], resolve)
      },
      meta: {
        title: '自有域名监控'
      }
    },
    {
      path: 'own',
      name: 'MONITOR_OWN',
      component (resolve) {
        return require(['@/modular/monitor/own'], resolve)
      },
      meta: {
        title: '自有域名监控'
      }
    },
    {
      path: 'focus',
      name: 'MONITOR_FOCUS',
      component (resolve) {
        return require(['@/modular/monitor/focus'], resolve)
      },
      meta: {
        title: '关注域名监控'
      }
    }
  ]
}