import * as api from '@/api/workOrder'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    WORK_ORDER_MANAGE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.WORK_ORDER_MANAGE(params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    WORK_ORDER_SUBMIT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.WORK_ORDER_SUBMIT(params.money, params.securityType, params.orderCode, params.updateType, params.questionType, params.domainName, params.description).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    WORK_ORDER_DETAIL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.WORK_ORDER_DETAIL(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
