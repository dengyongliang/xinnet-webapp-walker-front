export default {
  path: '/monitor',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'monitor_own',
      component (resolve) {
        return require(['@/modular/monitor/own'], resolve)
      },
      meta: {
        title: '自有域名监控'
      }
    },
    {
      path: 'own',
      name: 'monitor_own',
      component (resolve) {
        return require(['@/modular/monitor/own'], resolve)
      },
      meta: {
        title: '自有域名监控'
      }
    },
    {
      path: 'focus',
      name: 'monitor_focus',
      component (resolve) {
        return require(['@/modular/monitor/focus'], resolve)
      },
      meta: {
        title: '关注域名监控'
      }
    }
  ]
}
