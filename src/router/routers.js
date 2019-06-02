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
    permission: 'root',
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
        icon: 'i-icon i-icon-home',
        show: false,
        isLogin: true
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
},
{
  path: '/domainQuery',
  name: 'domainQuery',
  component (resolve) {
    return require(['@/page/domainQuery'], resolve)
  },
  meta: {
    title: '域名注册',
    keepAlive: true,
    permission: 'client_index',
    compUrl: 'page/domainQuery',
    icon: 'i-icon i-icon-home',
    show: true
  }
},
{
  path: '/domainQueryResult',
  name: 'domainQueryResult',
  component (resolve) {
    return require(['@/page/domainQueryResult'], resolve)
  },
  meta: {
    title: '域名注册',
    keepAlive: true,
    permission: 'client_index',
    compUrl: 'page/domainQueryResult',
    icon: 'i-icon i-icon-home',
    show: true
  }
}
]
