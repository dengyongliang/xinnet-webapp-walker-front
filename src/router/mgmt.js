export default {
  path: '/mgmt',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'mgmt_enterprise',
      component (resolve) {
        return require(['@/modular/mgmt/enterprise'], resolve)
      },
      meta: {
        title: '企业管理'
      }
    },
    {
      path: 'enterprise',
      name: 'mgmt_enterprise',
      component (resolve) {
        return require(['@/modular/mgmt/enterprise'], resolve)
      },
      meta: {
        title: '企业管理'
      }
    },
    {
      path: 'myAccount',
      name: 'mgmt_my_account',
      component (resolve) {
        return require(['@/modular/mgmt/myAccount'], resolve)
      },
      meta: {
        title: '我的账号'
      }
    },
    {
      path: 'roles',
      name: 'mgmt_roles',
      component (resolve) {
        return require(['@/modular/mgmt/roles'], resolve)
      },
      meta: {
        title: '角色管理'
      }
    },
    {
      path: 'accountMgmt',
      name: 'mgmt_account_mgmt',
      component (resolve) {
        return require(['@/modular/mgmt/accountMgmt'], resolve)
      },
      meta: {
        title: '账号管理'
      }
    },
    {
      path: 'workorder',
      name: 'mgmt_workorder',
      component (resolve) {
        return require(['@/modular/mgmt/workOrder'], resolve)
      },
      meta: {
        title: '工单管理'
      }
    }
  ]
}
