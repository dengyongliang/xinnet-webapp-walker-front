import * as api from '@/api/domainSafe'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    DOMAIN_SAFE_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_SAFE_LIST(params.pageNum, params.pageSize, params.domainName, params.domainSuffixs, params.otherSuffix, params.allSuffix, params.groupIds, params.importantFlag, params.renewFlag, params.updateFlag, params.backendLockFlag).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SET_PROTECT_LEVEL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SET_PROTECT_LEVEL(params.protectLevel, params.domainIds).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SET_AUTO_RENEW ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SET_AUTO_RENEW(params.autoRenewFlag, params.domainId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SET_PROHIBIT_UPDATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SET_PROHIBIT_UPDATE(params.prohibitUpdate, params.domainId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    BUY_BACKEND_LOCK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.BUY_BACKEND_LOCK(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    RENEW_BACKEND_LOCK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.RENEW_BACKEND_LOCK(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
