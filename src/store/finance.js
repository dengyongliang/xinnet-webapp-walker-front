import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.FINANCE_PAY_STATISTICS] ({ commit, rootState }, params) {
      rest.post(links.FINANCE_PAY_STATISTICS, params.param)
        .then(params.callback)
        .catch()
    },
    [types.FINANCE_PAY_STATISTICS_TREND] ({ commit, rootState }, params) {
      rest.post(links.FINANCE_PAY_STATISTICS_TREND, params.param)
        .then(params.callback)
        .catch()
    },
    [types.QUERY_FINANCE_CUSTOMER_FLOW_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_FINANCE_CUSTOMER_FLOW_LIST, params.param)
        .then(params.callback)
        .catch()
    },
    [types.QUERY_PAY_STATISTICS_BALANCE] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_PAY_STATISTICS_BALANCE, {})
        .then(callback)
        .catch()
    },
    [types.PAY_STATISTICS_UNBILLED] ({ commit, rootState }, callback) {
      rest.post(links.PAY_STATISTICS_UNBILLED, {})
        .then(callback)
        .catch()
    },
    [types.PAY_STATISTICS_HISTORY_BILL] ({ commit, rootState }, params) {
      rest.post(links.PAY_STATISTICS_HISTORY_BILL, params.param)
        .then(params.callback)
        .catch()
    }
  }
}
