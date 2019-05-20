export default {
  path: 'notice',
  name: 'notice',
  component (resolve) {
    return require(['@/page/mainCont'], resolve)
  },
  meta: {
    title: '通知中心',
    keepAlive: true,
    permission: 'client_notice',
    compUrl: 'page/mainCont',
    icon: 'i-icon i-icon-notice'
  },
  children: [
    {
      path: 'monitoring',
      name: 'notice_monitoring',
      component (resolve) {
        return require(['@/modular/notice/monitoring'], resolve)
      },
      meta: {
        title: '监控通知',
        keepAlive: true,
        permission: 'client_notice_monitor',
        compUrl: 'modular/notice/monitoring'
      }
    }
  ]
}
