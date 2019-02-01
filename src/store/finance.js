import * as types from './types'
import rest from '../global/rest.js'
import * as links from '../global/linkdo.js'
// import * as links from '../global/linkdo_json.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.FINANCE_PAY_STATISTICS] ({ commit, rootState }, params) {
      rest.post(links.FINANCE_PAY_STATISTICS, JSON.stringify(params.param), params.callback)
    },
    [types.FINANCE_PAY_STATISTICS_TREND] ({ commit, rootState }, params) {
      rest.post(links.FINANCE_PAY_STATISTICS_TREND, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_FINANCE_CUSTOMER_FLOW_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_FINANCE_CUSTOMER_FLOW_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_PAY_STATISTICS_BALANCE] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_PAY_STATISTICS_BALANCE, '', callback)
    },
    [types.PAY_STATISTICS_UNBILLED] ({ commit, rootState }, callback) {
      rest.post(links.PAY_STATISTICS_UNBILLED, '', callback)
    },
    [types.PAY_STATISTICS_HISTORY_BILL] ({ commit, rootState }, params) {
      rest.post(links.PAY_STATISTICS_HISTORY_BILL, JSON.stringify(params.param), params.callback)
    }
  }
}
