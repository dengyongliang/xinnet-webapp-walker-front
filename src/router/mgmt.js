export default {
  path: 'mgmt',
  name: 'mgmt',
  component (resolve) {
    return require(['@/page/mainCont'], resolve)
  },
  meta: {
    title: '管理',
    keepAlive: true,
    permission: 'client_user',
    compUrl: 'page/mainCont',
    icon: 'i-icon i-icon-admin',
    show: false
  },
  children: [
    {
      path: 'myAccount',
      name: 'mgmt_my_account',
      component (resolve) {
        return require(['@/modular/mgmt/myAccount'], resolve)
      },
      meta: {
        title: '我的账号',
        keepAlive: true,
        permission: 'client_user_myUserInfo',
        compUrl: 'modular/mgmt/myAccount',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'accountMgmt',
      name: 'mgmt_account_mgmt',
      component (resolve) {
        return require(['@/modular/mgmt/accountMgmt'], resolve)
      },
      meta: {
        title: '账号管理',
        keepAlive: true,
        permission: 'client_user_userManage',
        compUrl: 'modular/mgmt/accountMgmt',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'enterprise',
      name: 'mgmt_enterprise',
      component (resolve) {
        return require(['@/modular/mgmt/enterprise'], resolve)
      },
      meta: {
        title: '企业管理',
        keepAlive: true,
        permission: 'client_user_companyManage',
        compUrl: 'modular/mgmt/enterprise',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'roles',
      name: 'mgmt_roles',
      component (resolve) {
        return require(['@/modular/mgmt/roles'], resolve)
      },
      meta: {
        title: '角色管理',
        keepAlive: true,
        permission: 'client_user_roleManage',
        compUrl: 'modular/mgmt/roles',
        show: false,
        isLogin: true
      }
    },
    {
      path: 'workorder',
      name: 'mgmt_workorder',
      component (resolve) {
        return require(['@/modular/mgmt/workOrder'], resolve)
      },
      meta: {
        title: '工单管理',
        keepAlive: true,
        permission: 'client_user_workOrderManage',
        compUrl: 'modular/mgmt/workOrder',
        show: false,
        isLogin: true
      }
    }
  ]
}
