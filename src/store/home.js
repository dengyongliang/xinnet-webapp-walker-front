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
    [types.INDEX_MY_COMPANY] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_MY_COMPANY, JSON.stringify({}), callback)
    },
    [types.INDEX_MY_KEEPER] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_MY_KEEPER, JSON.stringify({}), callback)
    },
    [types.INDEX_DOMAIN_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_DOMAIN_STATISTICS, JSON.stringify({}), callback)
    },
    [types.INDEX_COMPANY_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_COMPANY_STATISTICS, JSON.stringify({}), callback)
    },
    [types.INDEX_USER_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_USER_STATISTICS, JSON.stringify({}), callback)
    },
    [types.INDEX_PAY_STATISTICS_UNBILLED] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_PAY_STATISTICS_UNBILLED, JSON.stringify({}), callback)
    },
    [types.INDEX_PAY_STATISTICS_HISTORY_BILL] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_PAY_STATISTICS_HISTORY_BILL, JSON.stringify({}), callback)
    },
    [types.INDEX_ACCOUNT_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_ACCOUNT_STATISTICS, JSON.stringify({}), callback)
    }
  }
}
