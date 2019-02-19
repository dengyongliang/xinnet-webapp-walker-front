import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'

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
    [types.SET_CURRENT_USER_DATA] (state, payload) {
      state.myUserInfo = payload.data
    },
    [types.UPDATE_USER_TEL] (state, payload) {
      state.myUserInfo.userTel = payload
    },
    [types.UPDATE_USER_MOBILE] (state, payload) {
      state.myUserInfo.userMobile = payload
    },
    [types.SET_USER_ROLES] (state, payload) {
      state.userRoles = payload.data
    },
    [types.SET_USERS] (state, payload) {
      state.users = payload.data
    },
    [types.SET_COMPANYS] (state, payload) {
      state.companys = payload.data
    },
    [types.SET_USER_AUTH_GROUPS] (state, payload) {
      state.userAuthGroups = payload.data
    },
    [types.SET_USER_AUTH_GROUPS_ORIGINAL] (state, payload) {
      state.userAuthGroupsOriginal = payload.data
    },
    [types.SET_USER_MSG_NUM] (state, payload) {
      state.userMsgNum = payload.data
    },
    [types.SET_MENUS] (state, payload) {
      state.menus = payload.data.menus
    }
  },
  actions: {
    [types.GET_CURRENT_USER_DATA] ({ commit, rootState }, callback) {
      rest.get(links.GET_CURRENT_USER_DATA, '')
        .then(callback)
        .catch(() => {})
    },
    [types.UPDATE_USER_INFO] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_USER_INFO, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.UPDATE_USER_PASSWORD] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_USER_PASSWORD, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_USER_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_USER_LIST, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.ADD_USER] ({ commit, rootState }, params) {
      rest.post(links.ADD_USER, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_USER_COMPANYS] ({ commit, rootState }, params) {
      rest.post(links.QUERY_USER_COMPANYS, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.DELETE_USER_INFO] ({ commit, rootState }, params) {
      rest.post(links.DELETE_USER_INFO, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_USER_INFO] ({ commit, rootState }, params) {
      rest.post(links.QUERY_USER_INFO, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.UPDATE_USER_AUTH] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_USER_AUTH, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.UPDATE_USER] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_USER, params.param)
        .then(params.callback_resolved)
        .catch(() => {})
    },
    [types.GET_USER_ROLES] ({ commit, rootState }) {
      rest.get(links.GET_USER_ROLES, '')
        .then(function (response) {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            commit(types.SET_USER_ROLES, response.data)
          } else {
          }
        })
        .catch(() => {})
    },
    [types.GET_USERS] ({ commit, rootState }) {
      rest.get(links.GET_USERS, '')
        .then(function (response) {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            commit(types.SET_USERS, response.data)
          } else {
          }
        })
        .catch(() => {})
    },
    [types.GET_COMPANYS] ({ commit, rootState }) {
      rest.get(links.GET_COMPANYS, '')
        .then(function (response) {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            commit(types.SET_COMPANYS, response.data)
          } else {
          }
        })
        .catch(() => {})
    },
    [types.GET_USER_AUTH_GROUPS] ({ commit, rootState }) {
      rest.post(links.GET_USER_AUTH_GROUPS, {userId: ''})
        .then(function (response) {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            commit(types.SET_USER_AUTH_GROUPS, response.data)
            commit(types.SET_USER_AUTH_GROUPS_ORIGINAL, response.data)
          } else {
          }
        })
        .catch(() => {})
    }
  }
}
