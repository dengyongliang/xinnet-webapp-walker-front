export default {
  path: '/domain',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'domain_overview',
      component (resolve) {
        return require(['@/modular/domain/overview'], resolve)
      },
      meta: {
        title: '域名总览'
      }
    },
    {
      path: 'overview',
      name: 'domain_overview',
      component (resolve) {
        return require(['@/modular/domain/overview'], resolve)
      },
      meta: {
        title: '域名总览'
      }
    },
    {
      path: 'mgmt',
      name: 'domain_mgmt',
      component (resolve) {
        return require(['@/modular/domain/domainMgmt'], resolve)
      },
      meta: {
        title: '域名管理'
      }
    },
    {
      path: 'security',
      name: 'domain_security',
      component (resolve) {
        return require(['@/modular/domain/securityService'], resolve)
      },
      meta: {
        title: '域名安全服务'
      }
    },
    {
      path: 'realnameDomain',
      name: 'domain_rn_domain',
      component (resolve) {
        return require(['@/modular/domain/realnameDomain'], resolve)
      },
      meta: {
        title: '域名实名制管理'
      }
    },
    {
      path: 'transferin',
      name: 'domain_transferin',
      component (resolve) {
        return require(['@/modular/domain/transferInList'], resolve)
      },
      meta: {
        title: '域名转入管理'
      }
    },
    {
      path: 'change',
      name: 'domain_change',
      component (resolve) {
        return require(['@/modular/domain/domainChange'], resolve)
      },
      meta: {
        title: '域名过户'
      }
    },
    {
      path: 'realname',
      name: 'domain_rn_temp',
      component (resolve) {
        return require(['@/modular/domain/realNameTemplate'], resolve)
      },
      meta: {
        title: '实名模板管理'
      }
    }
  ]
}
