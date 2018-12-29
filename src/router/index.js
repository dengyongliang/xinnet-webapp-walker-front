import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Event from '@/global/event'
import domain from './domain'
import mgmt from './mgmt'
import order from './order'
import finance from './finance'
import workorder from './workorder'
import notice from './notice'
import record from './record'
Vue.use(Router)
export const emitter = new Event()

const RouterMain = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: '404',
      component (resolve) {
        return require(['@/page/404'], resolve)
      },
      meta: {
        title: '404'
      }
    },
    {
      path: '/login',
      name: 'LOGIN',
      component (resolve) {
        return require(['@/page/login'], resolve)
      },
      meta: {
        title: '登录'
      }
    },
    {
      path: '/forgetPw',
      name: 'FORGET_PW',
      component (resolve) {
        return require(['@/page/forgetPw'], resolve)
      },
      meta: {
        title: '找回密码'
      }
    },
    {
      path: '/account_activation/:userCode',
      name: 'ACTIVATION',
      component (resolve) {
        return require(['@/page/activation'], resolve)
      },
      props: true,
      meta: {
        title: '账户激活'
      }
    },
    {
      path: '/selectClient',
      name: 'SELECTCLIENT',
      component (resolve) {
        return require(['@/page/selectClient'], resolve)
      },
      meta: {
        title: '选择客户'
      }
    },
    {
      path: '/payConfirm',
      name: 'PAY_CONFIRM',
      component (resolve) {
        return require(['@/page/payConfirm'], resolve)
      },
      meta: {
        title: '支付确认'
      }
    },
    {
      path: '/pay',
      name: 'PAY',
      component (resolve) {
        return require(['@/page/pay'], resolve)
      },
      meta: {
        title: '订单结算'
      }
    },
    {
      path: '/',
      name: 'MAIN',
      component (resolve) {
        return require(['@/page/main'], resolve)
      },
      meta: {
        // title: GLOBAL.TITLE
      },
      children: [
        {
          path: '/',
          name: 'HOME',
          component (resolve) {
            return require(['@/modular/home'], resolve)
          },
          meta: {
            title: '首页'
          }
        },
        {
          path: '/home',
          name: 'HOME',
          component (resolve) {
            return require(['@/modular/home'], resolve)
          },
          meta: {
            title: '首页'
          }
        }
      ]
    },
    domain,
    finance,
    mgmt,
    order,
    workorder,
    notice,
    record
  ],
  base: '/',
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
RouterMain.beforeEach((to, from, next) => {
  NProgress.start()
  window.document.title = to.meta.title
  next()
})
RouterMain.afterEach(transition => {
  NProgress.done()
})
export default RouterMain
