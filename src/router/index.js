import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Event from '@/global/event'
import report from './report'
// import routers from './routers'
import store from '@/store'
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
      path: '/noAuth',
      name: 'noAuth',
      component (resolve) {
        return require(['@/page/noAuth'], resolve)
      },
      meta: {
        title: '无权限访问'
      }
    },
    // {
    //   path: '*',
    //   name: '404',
    //   component (resolve) {
    //     return require(['@/page/404'], resolve)
    //   },
    //   meta: {
    //     title: '404',
    //     keepAlive: true,
    //     powers: '',
    //     compName: 'page/404'
    //   }
    // },
    report
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
  window.document.title = to.meta.title
  next()
})
RouterMain.afterEach(transition => {
  NProgress.done()
})
RouterMain.onReady(() => {
  let routers = localStorage.getItem('menus') ? JSON.parse(localStorage.getItem('menus')) : []
  if (routers.length) {
    let pageRouters = []
    // 保存到store
    store.commit('SET_MENUS', routers)
    // 生成可使用的路由表
    menuUtils2(pageRouters, routers)
    pageRouters.forEach((item) => {
      RouterMain.options.routes.push(item)
    })
    // 添加到路由
    RouterMain.addRoutes(pageRouters)
  } else {
    let router404 = {
      path: '*',
      name: '404',
      component (resolve) {
        return require(['@/page/404'], resolve)
      },
      meta: {
        title: '404',
        keepAlive: true,
        permission: '',
        compUrl: 'page/404'
      }
    }
    RouterMain.options.routes.push(router404)
    RouterMain.addRoutes([router404])
  }
})
export default RouterMain
