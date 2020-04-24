import * as api from '@/api/trademark'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    TRADEMARK_SEARCH ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_SEARCH(params.searchType, params.keyWords, params.intCls, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TRADEMARK_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_INFO(params.regNo, params.intCls).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TRADEMARK_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_LIST(params.keyWords, params.currentStatus, params.brandId, params.intCls, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TRADEMARK_SORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_SORT().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DELETE_TRADEMARK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DELETE_TRADEMARK(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TRADEMARK_CHECK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_CHECK(params.regNos, params.keyWords).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CREATE_TRADEMARK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CREATE_TRADEMARK(params.brandId, params.regNos).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    APP_TRADEMARK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.APP_TRADEMARK(params.tmName, params.contactor, params.phoneNum, params.email, params.description).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
