import * as api from '@/api/transferin'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    TRANSFER_IN_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRANSFER_IN_LIST(params.pageNum, params.pageSize, params.domainName, params.transferStatus, params.createTimeBegin, params.createTimeEnd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SUBMIT_TRANSFER_IN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SUBMIT_TRANSFER_IN(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
