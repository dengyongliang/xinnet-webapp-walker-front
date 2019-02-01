export default {
  path: '/record',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'record_domain',
      component (resolve) {
        return require(['@/modular/record/domain'], resolve)
      },
      meta: {
        title: '域名监控日志'
      }
    },
    {
      path: 'domain',
      name: 'record_domain',
      component (resolve) {
        return require(['@/modular/record/domain'], resolve)
      },
      meta: {
        title: '域名监控日志'
      }
    },
    {
      path: 'staff',
      name: 'record_staff',
      component (resolve) {
        return require(['@/modular/record/staff'], resolve)
      },
      meta: {
        title: '员工监控日志'
      }
    }
  ]
}
