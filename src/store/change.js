import * as api from '@/api/change'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    CHANGE_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CHANGE_LIST(params.pageNum, params.pageSize, params.domainName, params.changeStatus, params.createTimeBegin, params.createTimeEnd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SUBMIT_CHANGE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SUBMIT_CHANGE(params.templateId, params.domainNames).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CHANGE_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CHANGE_INFO(params.changeId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
