import * as api from '@/api/finance'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    PAY_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PAY_STATISTICS(params.startTime, params.endTime).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    PAY_STATISTICS_TREND ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PAY_STATISTICS_TREND(params.startTime, params.endTime).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GET_CUSTOMER_FLOW_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.GET_CUSTOMER_FLOW_LIST(params.pageNum, params.pageSize, params.createTimeBegin, params.createTimeEnd, params.flowCode, params.payType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    PAY_STATISTICS_BALANCE ({ commit }) {
      return new Promise((resolve, reject) => {
        api.PAY_STATISTICS_BALANCE().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    PAY_STATISTICS_UNBILLED ({ commit }) {
      return new Promise((resolve, reject) => {
        api.PAY_STATISTICS_UNBILLED().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    PAY_STATISTICS_HISTORY_BILL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PAY_STATISTICS_HISTORY_BILL(params.historyCycle).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
