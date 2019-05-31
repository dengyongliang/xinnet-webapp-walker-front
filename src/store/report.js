import * as api from '@/api/report'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    DOMAIN_MONITOR_CHANGE_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_MONITOR_CHANGE_REPORT(params.cycleTime).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_MONITOR_SAFE_REPORT ({ commit }) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_MONITOR_SAFE_REPORT().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_MONITOR_EXPIRE_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_MONITOR_EXPIRE_REPORT(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_ASSETS_VIEW_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_ASSETS_VIEW_REPORT(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_COMPANY_VIEW_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_COMPANY_VIEW_REPORT(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_SUFFIX_VIEW_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_SUFFIX_VIEW_REPORT(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_SAFE_NORMAL_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_SAFE_NORMAL_REPORT(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_SAFE_IMPORTANT_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_SAFE_IMPORTANT_REPORT(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_SAFE_RATE_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_SAFE_RATE_REPORT(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_BUDGET_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_BUDGET_REPORT(params.reportId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_REPURCHASE_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_REPURCHASE_REPORT(params.reportId, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_RENEW_AND_SAFE_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_RENEW_AND_SAFE_REPORT(params.reportId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_REGISTER_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_REGISTER_REPORT(params.reportId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_BUDGET_REPORT_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_BUDGET_REPORT_LIST(params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_CONSUMPTION_REPORT_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_CONSUMPTION_REPORT_LIST(params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_CONSUMPTION_DETAIL_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_CONSUMPTION_DETAIL_REPORT(params.customerId, params.backCycleStart, params.backCycleEnd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_CONSUMPTION_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_CONSUMPTION_REPORT(params.customerId, params.backCycleStart, params.backCycleEnd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_CONSUMPTION_SORT_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_CONSUMPTION_SORT_REPORT(params.customerId, params.backCycleStart, params.backCycleEnd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_CONSUMPTION_COMPANY_SORT_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_CONSUMPTION_COMPANY_SORT_REPORT(params.customerId, params.backCycleStart, params.backCycleEnd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_CONSUMPTION_COMPANY_MONTH_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_CONSUMPTION_COMPANY_MONTH_REPORT(params.customerId, params.backCycleStart, params.backCycleEnd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_CONSUMPTION_COMPANY_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_CONSUMPTION_COMPANY_REPORT(params.customerId, params.backCycleStart, params.backCycleEnd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
