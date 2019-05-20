export default {
  path: 'record',
  name: 'record',
  component (resolve) {
    return require(['@/page/mainCont'], resolve)
  },
  meta: {
    title: '监控日志',
    keepAlive: true,
    permission: 'client_log',
    compUrl: 'page/mainCont',
    icon: 'i-icon i-icon-diary'
  },
  children: [
    {
      path: 'domain',
      name: 'record_domain',
      component (resolve) {
        return require(['@/modular/record/domain'], resolve)
      },
      meta: {
        title: '域名监控日志',
        keepAlive: true,
        permission: 'client_log_domain',
        compUrl: 'modular/record/domain'
      }
    },
    {
      path: 'staff',
      name: 'record_staff',
      component (resolve) {
        return require(['@/modular/record/staff'], resolve)
      },
      meta: {
        title: '员工监控日志',
        keepAlive: true,
        permission: 'client_log_user',
        compUrl: 'modular/record/staff'
      }
    }
  ]
}
