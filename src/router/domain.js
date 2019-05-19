export default [
  // {
  //   path: 'domain',
  //   name: 'domain_overview',
  //   redirect: 'domain/overview'
  // },
  {
    path: 'domain/overview',
    name: 'domain_overview',
    component (resolve) {
      return require(['@/modular/domain/overview'], resolve)
    },
    meta: {
      title: '域名总览',
      keepAlive: true,
      powers: 'client_domain_overview',
      compName: 'modular/domain/overview'
    }
  },
  {
    path: 'domain/mgmt',
    name: 'domain_mgmt',
    component (resolve) {
      return require(['@/modular/domain/domainMgmt'], resolve)
    },
    meta: {
      title: '域名管理',
      keepAlive: true,
      powers: 'client_domain_manage',
      compName: 'modular/domain/domainMgmt'
    }
  },
  {
    path: 'domain/security',
    name: 'domain_security',
    component (resolve) {
      return require(['@/modular/domain/securityService'], resolve)
    },
    meta: {
      title: '域名安全服务',
      keepAlive: true,
      powers: 'client_domain_safe',
      compName: 'modular/domain/securityService'
    }
  },
  {
    path: 'domain/realnameDomain',
    name: 'domain_rn_domain',
    component (resolve) {
      return require(['@/modular/domain/realnameDomain'], resolve)
    },
    meta: {
      title: '域名实名制管理',
      keepAlive: true,
      powers: 'client_domain_realname',
      compName: 'modular/domain/realnameDomain'
    }
  },
  {
    path: 'domain/transferin',
    name: 'domain_transferin',
    component (resolve) {
      return require(['@/modular/domain/transferInList'], resolve)
    },
    meta: {
      title: '域名转入管理',
      keepAlive: true,
      powers: 'client_domain_transferin',
      compName: 'modular/domain/transferInList'
    }
  },
  {
    path: 'domain/change',
    name: 'domain_change',
    component (resolve) {
      return require(['@/modular/domain/domainChange'], resolve)
    },
    meta: {
      title: '域名过户',
      keepAlive: true,
      powers: 'client_domain_change',
      compName: 'modular/domain/domainChange'
    }
  },
  {
    path: 'domain/realname',
    name: 'domain_rn_temp',
    component (resolve) {
      return require(['@/modular/domain/realNameTemplate'], resolve)
    },
    meta: {
      title: '实名模板管理',
      keepAlive: true,
      powers: 'client_domain_template',
      compName: 'modular/domain/realNameTemplate'
    }
  }
]
