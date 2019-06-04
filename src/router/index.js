import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Event from '@/global/event'
import report from './report'
import routers from './routers'
import store from '@/store'
import menuUtils from '@/global/menuUtils.js'
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
        title: '登录',
        isLogin: false
      }
    },
    {
      path: '/findpw',
      name: 'findpw',
      component (resolve) {
        return require(['@/page/findPw'], resolve)
      },
      meta: {
        title: '找回密码',
        isLogin: false
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
        title: '账户激活',
        isLogin: false
      }
    },
    {
      path: '/client',
      name: 'client_list',
      component (resolve) {
        return require(['@/page/selectClient'], resolve)
      },
      meta: {
        title: '选择客户',
        isLogin: false
      }
    },
    {
      path: '/payConfirm',
      name: 'pay_confirm',
      component (resolve) {
        return require(['@/page/payConfirm'], resolve)
      },
      meta: {
        title: '支付确认',
        isLogin: true
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component (resolve) {
        return require(['@/page/pay'], resolve)
      },
      meta: {
        title: '订单结算',
        isLogin: true
      }
    },
    {
      path: '/noAuth',
      name: 'noAuth',
      component (resolve) {
        return require(['@/page/noAuth'], resolve)
      },
      meta: {
        title: '无权限访问',
        isLogin: false
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
        compName: 'page/404',
        isLogin: false
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
  // 判断是否登录 isLogin
  // 判断是否有权限进入
  let isLogin = to.meta.isLogin
  let permission = to.meta.permission ? to.meta.permission : ''
  console.log(permission)
  if (isLogin) {
    store.dispatch('CHECK_USER_AUTH', {authPath: permission}).then(response => {

    }).catch(() => {})
    if (true) { // 已登录
      console.log('已登录')
      if (permission && permission.length) { // 需要权限验证
        if (true) { // 有权限
          console.log('有权限')
          next()
        } else {
          console.log('无权限')
          next('/noAuth')
        }
      } else {
        console.log('无需权限')
        next()
      }
    } else {
      console.log('未登录')
      next('/login')
    }
  } else {
    console.log('无需登录')
    next()
  }
  window.document.title = to.meta.title
})
RouterMain.afterEach(transition => {
  NProgress.done()
})
RouterMain.onReady(() => {
  let menus = localStorage.getItem('menus') ? JSON.parse(localStorage.getItem('menus')) : []
  if (menus.length) {
    // let pageRouters = []
    // 保存到store
    store.commit('SET_MENUS', menus)
    // 生成可使用的路由表
    // menuUtils2(pageRouters, routers)
    // pageRouters.forEach((item) => {
    //   RouterMain.options.routes.push(item)
    // })
    // // 添加到路由
    // RouterMain.addRoutes(pageRouters)
  } else {
    // 获取权限信息
    store.dispatch('MY_USER_INFO').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        let pageMenus = []
        menuUtils(pageMenus, response.data.data.menus)
        // 相关数据 store 存储
        store.commit('SET_MENUS', pageMenus)
        // localStorage 存储 menus 数据
        localStorage.setItem('menus', JSON.stringify(pageMenus))
      } else {
        router.replace({ path: '/login' })
      }
    }).catch(() => {})
    // let router404 = {
    //   path: '*',
    //   name: '404',
    //   component (resolve) {
    //     return require(['@/page/404'], resolve)
    //   },
    //   meta: {
    //     title: '404',
    //     keepAlive: true,
    //     permission: '',
    //     compUrl: 'page/404'
    //   }
    // }
    // RouterMain.options.routes.push(router404)
    // RouterMain.addRoutes([router404])
  }
})
export default RouterMain
