export default {
  path: '/notice',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'notice_monitoring',
      component (resolve) {
        return require(['@/modular/notice/monitoring'], resolve)
      },
      meta: {
        title: '监控通知'
      }
    },
    {
      path: 'monitoring',
      name: 'notice_monitoring',
      component (resolve) {
        return require(['@/modular/notice/monitoring'], resolve)
      },
      meta: {
        title: '监控通知'
      }
    }
  ]
}
