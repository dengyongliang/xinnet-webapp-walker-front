export default {
  path: 'brand',
  name: 'brand',
  component (resolve) {
    return require(['@/page/mainCont'], resolve)
  },
  meta: {
    title: '商标管理',
    keepAlive: true,
    permission: '',
    compUrl: 'page/mainCont',
    icon: 'i-icon i-icon-trademark',
    show: true
  },
  children: [
    {
      path: 'mgmt',
      name: 'brand_mgmt',
      component (resolve) {
        return require(['@/modular/brand/mgmt'], resolve)
      },
      meta: {
        title: '商标管理',
        keepAlive: true,
        permission: '',
        compUrl: 'modular/brand/mgmt',
        show: true,
        isLogin: true
      }
    },
    {
      path: 'my',
      name: 'brand_my',
      component (resolve) {
        return require(['@/modular/brand/my'], resolve)
      },
      meta: {
        title: '我注册的商标',
        keepAlive: true,
        permission: '',
        compUrl: 'modular/brand/my',
        show: true,
        isLogin: true
      }
    }
  ]
}
