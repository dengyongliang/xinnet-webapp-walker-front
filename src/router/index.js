import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Event from '@/global/event'
import report from './report'
import routers from './routers'
import makeStore from '@/store'
import menuUtils2 from '@/global/menuUtils2.js'
Vue.use(Router)
export const emitter = new Event()

const RouterMain = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component (resolve) {
        return require(['@/page/login'], resolve)
      },
      meta: {
        title: '登录'
      }
    },
    {
      path: '/findpw',
      name: 'findpw',
      component (resolve) {
        return require(['@/page/findPw'], resolve)
      },
      meta: {
        title: '找回密码'
      }
    },
    {
      path: '/account_activation/:userCode',
      name: 'activation',
      component (resolve) {
        return require(['@/page/activation'], resolve)
      },
      props: true,
      meta: {
        title: '账户激活'
      }
    },
    {
      path: '/client',
      name: 'client_list',
      component (resolve) {
        return require(['@/page/selectClient'], resolve)
      },
      meta: {
        title: '选择客户'
      }
    },
    {
      path: '/payConfirm',
      name: 'pay_confirm',
      component (resolve) {
        return require(['@/page/payConfirm'], resolve)
      },
      meta: {
        title: '支付确认'
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component (resolve) {
        return require(['@/page/pay'], resolve)
      },
      meta: {
        title: '订单结算'
      }
    },
    {
      path: '*',
      name: '404',
      component (resolve) {
        return require(['@/page/404'], resolve)
      },
      meta: {
        title: '404',
        keepAlive: true,
        powers: '',
        compName: 'page/404'
      }
    },
    report,
    ...routers
  ],
  base: '/',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
RouterMain.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  window.document.title = to.meta.title
})
RouterMain.afterEach(transition => {
  NProgress.done()
})
RouterMain.onReady(() => {
  // let pageRouters = []
  // console.log(localStorage.getItem('menus'))
  // let routers = localStorage.getItem('menus') ? JSON.parse(localStorage.getItem('menus')) : []
  // menuUtils2(pageRouters, routers)
  // console.log("pageRouters")
  // console.log(pageRouters)
  // pageRouters.forEach((item) => {
  //   RouterMain.options.routes.push(item)
  // })
  // RouterMain.addRoutes(pageRouters)
  // console.log("RouterMain")
  // console.log(RouterMain)
})
export default RouterMain
