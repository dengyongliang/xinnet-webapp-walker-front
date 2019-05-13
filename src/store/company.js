import * as api from '@/api/company'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    COMPANY_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.COMPANY_LIST(params.companyName).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    COMPANY_CREATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.COMPANY_CREATE(params.logoFile, params.name, params.contactor, params.mobile, params.email, params.tel).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    COMPANY_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.COMPANY_INFO(params.companyId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GROUP_CREATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.GROUP_CREATE(params.companyId, params.manageId, params.name).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GROUP_UPDATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.GROUP_UPDATE(params.manageId, params.groupId, params.name).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GROUP_DELETE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.GROUP_DELETE(params.groupId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    COMPANY_UPDATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.COMPANY_UPDATE(params.companyId, params.logoFile, params.name, params.contactor, params.mobile, params.email, params.tel).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    COMPANY_DELETE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.COMPANY_DELETE(params.companyId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
