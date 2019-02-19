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
      rest.post(links.INDEX_MY_COMPANY, {})
        .then(callback)
        .catch(() => {})
    },
    [types.INDEX_MY_KEEPER] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_MY_KEEPER, {})
        .then(callback)
        .catch(() => {})
    },
    [types.INDEX_DOMAIN_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_DOMAIN_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    },
    [types.INDEX_COMPANY_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_COMPANY_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    },
    [types.INDEX_USER_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_USER_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    },
    [types.INDEX_PAY_STATISTICS_UNBILLED] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_PAY_STATISTICS_UNBILLED, {})
        .then(callback)
        .catch(() => {})
    },
    [types.INDEX_PAY_STATISTICS_HISTORY_BILL] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_PAY_STATISTICS_HISTORY_BILL, {})
        .then(callback)
        .catch(() => {})
    },
    [types.INDEX_ACCOUNT_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.INDEX_ACCOUNT_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    }
  }
}
