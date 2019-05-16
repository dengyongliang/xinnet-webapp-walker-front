import * as api from '@/api/user'
export default {
  state: {
    myUserInfo: {
      // "userCode": "walker_super",
      // "userName": "超级管理员",
      // "userMobile": "15110066180",
      // "userEmail": "baiyu@xinnet.com",
      // "userTel": "01087128712",
      // "userSex": "1",
      // "status": 1,
      // "createTime": 1540342980000,
      // "lastLoginTime": 1540537863000,
      // "lastLoginIp": "124.127.244.5",
      // "userRoles": [{
      //   "id": 1,
      //   "roleCode": "super",
      //   "roleName": "超级管理员",
      //   "status": 1,
      //   "scope": 0,
      //   "userId": 1,
      //   "customerId": 0,
      //   "createTime": 1540342800000,
      //   "description": "系统超级管理员"
      // }],
      // "userMenus": [{
      //   "id": 1,
      //   "menuCode": "sys_user_list",
      //   "menuName": "用户管理",
      //   "menuUrl": "/user/list",
      //   "parentMenuCode": "0",
      //   "menuGroup": "1",
      //   "menuSort": "1",
      //   "createTime": 1540343160000
      // }]
    },
    userRoles: [],
    menus: [],
    users: [],
    companys: [],
    userAuthGroups: [],
    userAuthGroupsOriginal: [],
    userMsgNum: 0
  },
  mutations: {
    SET_CURRENT_USER_DATA (state, payload) {
      state.myUserInfo = payload.data
    },
    UPDATE_USER_TEL (state, payload) {
      state.myUserInfo.userTel = payload
    },
    UPDATE_USER_MOBILE (state, payload) {
      state.myUserInfo.userMobile = payload
    },
    SET_USER_ROLES (state, payload) {
      state.userRoles = payload.data
    },
    SET_USERS (state, payload) {
      state.users = payload.data
    },
    SET_COMPANYS (state, payload) {
      state.companys = payload.data
    },
    SET_USER_AUTH_GROUPS (state, payload) {
      state.userAuthGroups = payload.data
    },
    SET_USER_AUTH_GROUPS_ORIGINAL (state, payload) {
      state.userAuthGroupsOriginal = payload.data
    },
    SET_USER_MSG_NUM (state, payload) {
      state.userMsgNum = payload.data
    },
    SET_MENUS (state, payload) {
      state.menus = payload.data.menus
    }
  },
  actions: {
    USER_CUSTOMERS ({ commit }) {
      return new Promise((resolve, reject) => {
        api.USER_CUSTOMERS().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    VALID_USER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.VALID_USER(params.userCode, params.userName).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ACTIVATION_USER_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ACTIVATION_USER_INFO(params.userCode, params.userSex, params.userTel, params.userMobile, params.verificationCode, params.qq, params.wx).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ACTIVATION_USER_PWD ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ACTIVATION_USER_PWD(params.userCode, params.password).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LOGOUT ({ commit }) {
      return new Promise((resolve, reject) => {
        api.LOGOUT().then(response => {
          commit('SET_LOGOUT')
          commit('SET_CURRENT_USER_DATA', {})
          commit('SET_MENUS', {})
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LOGIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.LOGIN(params.account, params.password, params.verificationCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    MY_USER_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.MY_USER_INFO(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CHANGE_CUSTOMERS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CHANGE_CUSTOMERS(params.customerId).then(response => {
          window.location.href = '/home'
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    USER_LIST ({ commit }, params) {
      params = Object.assign({
        pageNum: 1,
        pageSize: 20,
        domainCompanyId: '',
        domainGroupId: '',
        companyId: '',
        userCode: ''
      }, params)
      return new Promise((resolve, reject) => {
        api.USER_LIST(params.pageNum, params.pageSize, params.domainCompanyId, params.domainGroupId, params.companyId, params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_USER_INFO ({ commit }, params) {
      params = Object.assign({
        userCode: '',
        userTel: '',
        userMobile: '',
        verificationCode: ''
      }, params)
      return new Promise((resolve, reject) => {
        api.UPDATE_USER_INFO(params.userCode, params.userTel, params.userMobile, params.verificationCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_USER_PASSWORD ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UPDATE_USER_PASSWORD(params.userCode, params.newPassword).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    USER_ROLES ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.USER_ROLES(params).then(response => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            commit('SET_USER_ROLES', response.data)
          } else {
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    USERS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.USERS(params).then(response => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            commit('SET_USERS', response.data)
          } else {
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    COMPANYS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.COMPANYS(params).then(response => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            commit('SET_COMPANYS', response.data)
          } else {
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    USER_AUTH_GROUPS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.USER_AUTH_GROUPS(params).then(response => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            commit('SET_USER_AUTH_GROUPS', response.data)
            commit('SET_USER_AUTH_GROUPS_ORIGINAL', response.data)
          } else {
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    USER_COMPANYS ({ commit }) {
      return new Promise((resolve, reject) => {
        api.USER_COMPANYS().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_USER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ADD_USER(params.roleId, params.groups, params.userName, params.userEmail, params.companyId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DELETE_USER_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DELETE_USER_INFO(params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    USER_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.USER_INFO(params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_USER_AUTH ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UPDATE_USER_AUTH(params.userCode, params.roleId, params.groups).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_USER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UPDATE_USER(params.userMobile, params.userCode, params.userTel, params.userEmail, params.companyId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CHECK_USER_PHONE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CHECK_USER_PHONE(params.userMobile).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
