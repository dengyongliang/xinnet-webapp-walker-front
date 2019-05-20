export default {
  path: 'domain',
  name: 'domain',
  component (resolve) {
    return require(['@/page/mainCont'], resolve)
  },
  meta: {
    title: '域名管理',
    keepAlive: true,
    permission: 'client_domain',
    compUrl: 'page/mainCont'
  },
  children: [
    {
      path: 'overview',
      name: 'domain_overview',
      component (resolve) {
        return require(['@/modular/domain/overview'], resolve)
      },
      meta: {
        title: '域名总览',
        keepAlive: true,
        permission: 'client_domain_overview',
        compUrl: 'modular/domain/overview'
      }
    },
    {
      path: 'mgmt',
      name: 'domain_mgmt',
      component (resolve) {
        return require(['@/modular/domain/domainMgmt'], resolve)
      },
      meta: {
        title: '域名管理',
        keepAlive: true,
        permission: 'client_domain_manage',
        compUrl: 'modular/domain/domainMgmt'
      }
    },
    {
      path: 'security',
      name: 'domain_security',
      component (resolve) {
        return require(['@/modular/domain/securityService'], resolve)
      },
      meta: {
        title: '域名安全服务',
        keepAlive: true,
        permission: 'client_domain_safe',
        compUrl: 'modular/domain/securityService'
      }
    },
    {
      path: 'realnameDomain',
      name: 'domain_rn_domain',
      component (resolve) {
        return require(['@/modular/domain/realNameDomain'], resolve)
      },
      meta: {
        title: '域名实名制管理',
        keepAlive: true,
        permission: 'client_domain_realname',
        compUrl: 'modular/domain/realNameDomain'
      }
    },
    {
      path: 'transferin',
      name: 'domain_transferin',
      component (resolve) {
        return require(['@/modular/domain/transferInList'], resolve)
      },
      meta: {
        title: '域名转入管理',
        keepAlive: true,
        permission: 'client_domain_transferin',
        compUrl: 'modular/domain/transferInList'
      }
    },
    {
      path: 'change',
      name: 'domain_change',
      component (resolve) {
        return require(['@/modular/domain/domainChange'], resolve)
      },
      meta: {
        title: '域名过户',
        keepAlive: true,
        permission: 'client_domain_change',
        compUrl: 'modular/domain/domainChange'
      }
    },
    {
      path: 'realname',
      name: 'domain_rn_temp',
      component (resolve) {
        return require(['@/modular/domain/realNameTemplate'], resolve)
      },
      meta: {
        title: '实名模板管理',
        keepAlive: true,
        permission: 'client_domain_template',
        compUrl: 'modular/domain/realNameTemplate'
      }
    }
  ]
}
