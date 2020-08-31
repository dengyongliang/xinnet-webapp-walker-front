import * as api from '@/api/followdomain'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    FOLLOW_DOMAIN_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_DOMAIN_LIST(params.domainName, params.siteTypes, params.excepType, params.isReg, params.brandIds, params.domainSuffixs, params.otherSuffixs, params.createTimeBegin, params.createTimeEnd, params.applyTimeBegin, params.applyTimeEnd, params.expireTimeBegin, params.expireTimeEnd, params.pageNum, params.pageSize, params.orderByProperty, params.orderByType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_DOMAIN_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_DOMAIN_INFO(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_RECORD_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_RECORD_LIST(params.domainId, params.pageNum, params.pageSize, params.createDateBegin, params.createDateEnd, params.recordType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_BRAND_LIST ({ commit }, params) {
      // params = Object.assign({
      //   brandName: '',
      //   brandLevel: '',
      //   order: '',
      //   orderType: ''
      // }, params)
      return new Promise((resolve, reject) => {
        api.FOLLOW_BRAND_LIST(params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    REPORT_FOLLOW_RECORD ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.REPORT_FOLLOW_RECORD(params.reportType, params.brandId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EXCEP_FOLLOW_RECORD_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.EXCEP_FOLLOW_RECORD_LIST(params.pageNum, params.pageSize, params.brandId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CREATE_BRAND ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CREATE_BRAND(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_BRAND ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UPDATE_BRAND(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DELETE_BRAND ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DELETE_BRAND(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CREATE_DOMAIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CREATE_DOMAIN(params.brandId, params.domainNames).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DELETE_DOMAIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DELETE_DOMAIN(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    QUERY_BRAND ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.QUERY_BRAND(params.brandId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    REFRESE_DOMAIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.REFRESE_DOMAIN(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_BRAND_DETAIL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_BRAND_DETAIL(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SEARCH_FOLLOW_BRAND_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SEARCH_FOLLOW_BRAND_LIST(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
