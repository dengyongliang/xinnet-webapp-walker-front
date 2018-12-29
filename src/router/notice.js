export default {
  path: '/notice',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'NOTICE_MONITORING',
      component (resolve) {
        return require(['@/modular/notice/monitoring'], resolve)
      },
      meta: {
        title: '监控通知'
      }
    },
    {
      path: 'monitoring',
      name: 'NOTICE_MONITORING',
      component (resolve) {
        return require(['@/modular/notice/monitoring'], resolve)
      },
      meta: {
        title: '监控通知'
      }
    }
  ]
}