export default [
  {
    path: 'mgmt',
    name: 'mgmt_enterprise',
    redirect: 'mgmt/enterprise'
  },
  {
    path: 'mgmt/enterprise',
    name: 'mgmt_enterprise',
    component (resolve) {
      return require(['@/modular/mgmt/enterprise'], resolve)
    },
    meta: {
      title: '企业管理'
    }
  },
  {
    path: 'mgmt/myAccount',
    name: 'mgmt_my_account',
    component (resolve) {
      return require(['@/modular/mgmt/myAccount'], resolve)
    },
    meta: {
      title: '我的账号'
    }
  },
  {
    path: 'mgmt/roles',
    name: 'mgmt_roles',
    component (resolve) {
      return require(['@/modular/mgmt/roles'], resolve)
    },
    meta: {
      title: '角色管理'
    }
  },
  {
    path: 'mgmt/accountMgmt',
    name: 'mgmt_account_mgmt',
    component (resolve) {
      return require(['@/modular/mgmt/accountMgmt'], resolve)
    },
    meta: {
      title: '账号管理'
    }
  },
  {
    path: 'mgmt/workorder',
    name: 'mgmt_workorder',
    component (resolve) {
      return require(['@/modular/mgmt/workOrder'], resolve)
    },
    meta: {
      title: '工单管理'
    }
  }
]
