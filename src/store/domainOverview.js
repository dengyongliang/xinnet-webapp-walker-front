import * as api from '@/api/domainOverview'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    DOMAIN_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_STATISTICS(params.depositFlag).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_COUNT_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_COUNT_STATISTICS(params.days).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TEMPLATE_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TEMPLATE_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    BACKEND_LOCK_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.BACKEND_LOCK_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_VERIFY_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_VERIFY_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_RENEW_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_RENEW_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_TRANSFER_IN_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_TRANSFER_IN_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_CHANGE_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_CHANGE_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
