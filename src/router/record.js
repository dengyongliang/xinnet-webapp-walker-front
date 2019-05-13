export default [
  {
    path: 'record',
    name: 'record_domain',
    redirect: 'record/domain'
  },
  {
    path: 'record/domain',
    name: 'record_domain',
    component (resolve) {
      return require(['@/modular/record/domain'], resolve)
    },
    meta: {
      title: '域名监控日志'
    }
  },
  {
    path: 'record/staff',
    name: 'record_staff',
    component (resolve) {
      return require(['@/modular/record/staff'], resolve)
    },
    meta: {
      title: '员工监控日志'
    }
  }
]
