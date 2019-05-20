import domain from './domain'
import mgmt from './mgmt'
import order from './order'
import finance from './finance'
import notice from './notice'
import record from './record'
import monitor from './monitor'

export default [{
  path: '/',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  meta: {
    title: 'main',
    keepAlive: true,
    permission: '',
    compUrl: 'page/main'
  },
  children: [
    {
      path: '/',
      name: 'home',
      component (resolve) {
        return require(['@/modular/home'], resolve)
      },
      meta: {
        title: '首页',
        keepAlive: true,
        permission: 'client_index',
        compUrl: 'modular/home',
        icon: 'i-icon i-icon-home'
      }
    },
    domain,
    monitor,
    finance,
    order,
    mgmt,
    record,
    notice
  ]
}]
