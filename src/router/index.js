import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Event from '@/global/event'
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
          path: '/mgmt/enterprise',
          name: 'MGMT_ENTERPRISE',
          component (resolve) {
            return require(['@/modular/mgmt/enterprise'], resolve)
          },
          meta: {
            title: '企业管理'
          }
        },
        {
          path: '/mgmt/myAccount',
          name: 'MGMT_MY_ACCOUNT',
          component (resolve) {
            return require(['@/modular/mgmt/myAccount'], resolve)
          },
          meta: {
            title: '我的账号'
          }
        },
        {
          path: '/mgmt/roles',
          name: 'MGMT_ROLES',
          component (resolve) {
            return require(['@/modular/mgmt/roles'], resolve)
          },
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/mgmt/accountMgmt',
          name: 'MGMT_ACCOUNT',
          component (resolve) {
            return require(['@/modular/mgmt/accountMgmt'], resolve)
          },
          meta: {
            title: '账号管理'
          }
        },
        {
          path: '/finance/overview',
          name: 'FINANCE_OVERVIEW',
          component (resolve) {
            return require(['@/modular/finance/overview'], resolve)
          },
          meta: {
            title: '财务总览'
          }
        },
        {
          path: '/finance/billMgmt',
          name: 'FINANCE_BILLMGMT',
          component (resolve) {
            return require(['@/modular/finance/billMgmt'], resolve)
          },
          meta: {
            title: '账单管理'
          }
        },
        {
          path: '/order/orderMgmt',
          name: 'ORDER_MGMT',
          component (resolve) {
            return require(['@/modular/order/orderMgmt'], resolve)
          },
          meta: {
            title: '订单管理'
          }
        },
        {
          path: '/workorder/order',
          name: 'WORKORDER',
          component (resolve) {
            return require(['@/modular/workorder/order'], resolve)
          },
          meta: {
            title: '工单管理'
          }
        },
        {
          path: '/domain/realname',
          name: 'DOMAIN_REALNAME',
          component (resolve) {
            return require(['@/modular/domain/realNameTemplate'], resolve)
          },
          meta: {
            title: '实名模板管理'
          }
        },
        {
          path: '/domain/change',
          name: 'DOMAIN_CHANGE',
          component (resolve) {
            return require(['@/modular/domain/domainChange'], resolve)
          },
          meta: {
            title: '域名过户'
          }
        },
        {
          path: '/domain/transferin',
          name: 'DOMAIN_TRANSFERIN',
          component (resolve) {
            return require(['@/modular/domain/transferInList'], resolve)
          },
          meta: {
            title: '域名转入管理'
          }
        },
        {
          path: '/domain/realnameDomain',
          name: 'DOMAIN_REALNAME_DOMAIN',
          component (resolve) {
            return require(['@/modular/domain/realnameDomain'], resolve)
          },
          meta: {
            title: '域名实名制管理'
          }
        },
        {
          path: '/domain/security',
          name: 'DOMAIN_SECURITY',
          component (resolve) {
            return require(['@/modular/domain/securityService'], resolve)
          },
          meta: {
            title: '域名安全服务'
          }
        },
        {
          path: '/domain/mgmt',
          name: 'DOMAIN_MGMT',
          component (resolve) {
            return require(['@/modular/domain/domainMgmt'], resolve)
          },
          meta: {
            title: '域名管理'
          }
        }
      ]
    }
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
