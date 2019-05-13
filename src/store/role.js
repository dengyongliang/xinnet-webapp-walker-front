import * as api from '@/api/role'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    ROLE_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ROLE_LIST(params.pageNum, params.pageSize).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    MENUS ({ commit }, params) {
      params = Object.assign({
        roleId: ''
      }, params)
      return new Promise((resolve, reject) => {
        api.MENUS(params.roleId).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ROLE_CREATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ROLE_CREATE(params.menuIds, params.roleName).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ROLE_UPDATE ({ commit }, params) {
      params = Object.assign({
        menuIds: '',
        roleId: '',
        roleName: ''
      }, params)
      return new Promise((resolve, reject) => {
        api.ROLE_UPDATE(params.menuIds, params.roleId, params.roleName).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ROLE_DELETE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ROLE_DELETE(params.roleId).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
