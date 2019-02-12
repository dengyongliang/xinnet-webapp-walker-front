import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.INDEX_MY_COMPANY] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_MY_COMPANY, {}, callback)
    },
    [types.INDEX_MY_KEEPER] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_MY_KEEPER, {}, callback)
    },
    [types.INDEX_DOMAIN_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_DOMAIN_STATISTICS, {}, callback)
    },
    [types.INDEX_COMPANY_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_COMPANY_STATISTICS, {}, callback)
    },
    [types.INDEX_USER_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_USER_STATISTICS, {}, callback)
    },
    [types.INDEX_PAY_STATISTICS_UNBILLED] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_PAY_STATISTICS_UNBILLED, {}, callback)
    },
    [types.INDEX_PAY_STATISTICS_HISTORY_BILL] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_PAY_STATISTICS_HISTORY_BILL, {}, callback)
    },
    [types.INDEX_ACCOUNT_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_ACCOUNT_STATISTICS, {}, callback)
    }
  }
}
