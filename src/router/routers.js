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
    powers: 'client_index',
    compName: 'page/main'
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
        powers: 'client_index',
        compName: 'modular/home'
      }
    },
    ...domain,
    ...finance,
    ...mgmt,
    ...order,
    ...notice,
    ...record,
    ...monitor
  ]
}]
