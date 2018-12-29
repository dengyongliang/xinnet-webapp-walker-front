export default {
  path: '/mgmt',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'MGMT_ENTERPRISE',
      component (resolve) {
        return require(['@/modular/mgmt/enterprise'], resolve)
      },
      meta: {
        title: '企业管理'
      }
    },
    {
      path: 'enterprise',
      name: 'MGMT_ENTERPRISE',
      component (resolve) {
        return require(['@/modular/mgmt/enterprise'], resolve)
      },
      meta: {
        title: '企业管理'
      }
    },
    {
      path: 'myAccount',
      name: 'MGMT_MY_ACCOUNT',
      component (resolve) {
        return require(['@/modular/mgmt/myAccount'], resolve)
      },
      meta: {
        title: '我的账号'
      }
    },
    {
      path: 'roles',
      name: 'MGMT_ROLES',
      component (resolve) {
        return require(['@/modular/mgmt/roles'], resolve)
      },
      meta: {
        title: '角色管理'
      }
    },
    {
      path: 'accountMgmt',
      name: 'MGMT_ACCOUNT',
      component (resolve) {
        return require(['@/modular/mgmt/accountMgmt'], resolve)
      },
      meta: {
        title: '账号管理'
      }
    }
  ]
}