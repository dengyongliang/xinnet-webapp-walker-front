export default [
  // {
  //   path: 'notice',
  //   name: 'notice_monitoring',
  //   redirect: 'notice/monitoring'
  // },
  {
    path: 'notice/monitoring',
    name: 'notice_monitoring',
    component (resolve) {
      return require(['@/modular/notice/monitoring'], resolve)
    },
    meta: {
      title: '监控通知',
      keepAlive: true,
      powers: 'client_notice_monitor',
      compName: 'modular/notice/monitoring'
    }
  }
]
