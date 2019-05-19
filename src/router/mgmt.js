export default [
  // {
  //   path: 'mgmt',
  //   name: 'mgmt_enterprise',
  //   redirect: 'mgmt/enterprise'
  // },
  {
    path: 'mgmt/enterprise',
    name: 'mgmt_enterprise',
    component (resolve) {
      return require(['@/modular/mgmt/enterprise'], resolve)
    },
    meta: {
      title: '企业管理',
      keepAlive: true,
      powers: 'client_user_companyManage',
      compName: 'modular/mgmt/enterprise'
    }
  },
  {
    path: 'mgmt/myAccount',
    name: 'mgmt_my_account',
    component (resolve) {
      return require(['@/modular/mgmt/myAccount'], resolve)
    },
    meta: {
      title: '我的账号',
      keepAlive: true,
      powers: 'client_user_myUserInfo',
      compName: 'modular/mgmt/myAccount'
    }
  },
  {
    path: 'mgmt/roles',
    name: 'mgmt_roles',
    component (resolve) {
      return require(['@/modular/mgmt/roles'], resolve)
    },
    meta: {
      title: '角色管理',
      keepAlive: true,
      powers: 'client_user_roleManage',
      compName: 'modular/mgmt/roles'
    }
  },
  {
    path: 'mgmt/accountMgmt',
    name: 'mgmt_account_mgmt',
    component (resolve) {
      return require(['@/modular/mgmt/accountMgmt'], resolve)
    },
    meta: {
      title: '账号管理',
      keepAlive: true,
      powers: 'client_user_userManage',
      compName: 'modular/mgmt/accountMgmt'
    }
  },
  {
    path: 'mgmt/workorder',
    name: 'mgmt_workorder',
    component (resolve) {
      return require(['@/modular/mgmt/workOrder'], resolve)
    },
    meta: {
      title: '工单管理',
      keepAlive: true,
      powers: 'client_user_workOrderManage',
      compName: 'modular/mgmt/workOrder'
    }
  }
]
