export default {
  path: '/domain',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'DOMAIN_OVERVIEW',
      component (resolve) {
        return require(['@/modular/domain/overview'], resolve)
      },
      meta: {
        title: '域名总览'
      }
    },
    {
      path: 'overview',
      name: 'DOMAIN_OVERVIEW',
      component (resolve) {
        return require(['@/modular/domain/overview'], resolve)
      },
      meta: {
        title: '域名总览'
      }
    },
    {
      path: 'mgmt',
      name: 'DOMAIN_MGMT',
      component (resolve) {
        return require(['@/modular/domain/domainMgmt'], resolve)
      },
      meta: {
        title: '域名管理'
      }
    },
    {
      path: 'security',
      name: 'DOMAIN_SECURITY',
      component (resolve) {
        return require(['@/modular/domain/securityService'], resolve)
      },
      meta: {
        title: '域名安全服务'
      }
    },
    {
      path: 'realnameDomain',
      name: 'DOMAIN_REALNAME_DOMAIN',
      component (resolve) {
        return require(['@/modular/domain/realnameDomain'], resolve)
      },
      meta: {
        title: '域名实名制管理'
      }
    },
    {
      path: 'transferin',
      name: 'DOMAIN_TRANSFERIN',
      component (resolve) {
        return require(['@/modular/domain/transferInList'], resolve)
      },
      meta: {
        title: '域名转入管理'
      }
    },
    {
      path: 'change',
      name: 'DOMAIN_CHANGE',
      component (resolve) {
        return require(['@/modular/domain/domainChange'], resolve)
      },
      meta: {
        title: '域名过户'
      }
    },
    {
      path: 'realname',
      name: 'DOMAIN_REALNAME',
      component (resolve) {
        return require(['@/modular/domain/realNameTemplate'], resolve)
      },
      meta: {
        title: '实名模板管理'
      }
    }
  ]
}