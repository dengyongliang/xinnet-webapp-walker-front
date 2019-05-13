export default [
  {
    path: 'domain',
    name: 'domain_overview',
    redirect: 'domain/overview'
  },
  {
    path: 'domain/overview',
    name: 'domain_overview',
    component (resolve) {
      return require(['@/modular/domain/overview'], resolve)
    },
    meta: {
      title: '域名总览'
    }
  },
  {
    path: 'domain/mgmt',
    name: 'domain_mgmt',
    component (resolve) {
      return require(['@/modular/domain/domainMgmt'], resolve)
    },
    meta: {
      title: '域名管理'
    }
  },
  {
    path: 'domain/security',
    name: 'domain_security',
    component (resolve) {
      return require(['@/modular/domain/securityService'], resolve)
    },
    meta: {
      title: '域名安全服务'
    }
  },
  {
    path: 'domain/realnameDomain',
    name: 'domain_rn_domain',
    component (resolve) {
      return require(['@/modular/domain/realnameDomain'], resolve)
    },
    meta: {
      title: '域名实名制管理'
    }
  },
  {
    path: 'domain/transferin',
    name: 'domain_transferin',
    component (resolve) {
      return require(['@/modular/domain/transferInList'], resolve)
    },
    meta: {
      title: '域名转入管理'
    }
  },
  {
    path: 'domain/change',
    name: 'domain_change',
    component (resolve) {
      return require(['@/modular/domain/domainChange'], resolve)
    },
    meta: {
      title: '域名过户'
    }
  },
  {
    path: 'domain/realname',
    name: 'domain_rn_temp',
    component (resolve) {
      return require(['@/modular/domain/realNameTemplate'], resolve)
    },
    meta: {
      title: '实名模板管理'
    }
  }
]
