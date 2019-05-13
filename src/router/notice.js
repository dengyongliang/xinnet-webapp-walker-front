export default [
  {
    path: 'notice',
    name: 'notice_monitoring',
    redirect: 'notice/monitoring'
  },
  {
    path: 'notice/monitoring',
    name: 'notice_monitoring',
    component (resolve) {
      return require(['@/modular/notice/monitoring'], resolve)
    },
    meta: {
      title: '监控通知'
    }
  }
]
