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
    [types.QUERY_DOMAIN_MONITOR_CHANGE_REPORT] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MONITOR_CHANGE_REPORT, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_DOMAIN_MONITOR_SAFE_REPORT] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_DOMAIN_MONITOR_SAFE_REPORT, JSON.stringify({}), callback)
    },
    [types.QUERY_DOMAIN_MONITOR_EXPIRE_REPORT] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_DOMAIN_MONITOR_EXPIRE_REPORT, JSON.stringify({}), callback)
    },
    [types.QUERY_DOMAIN_ASSETS_VIEW_REPORT] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_DOMAIN_ASSETS_VIEW_REPORT, JSON.stringify({}), callback)
    },
    [types.QUERY_DOMAIN_COMPANY_VIEW_REPORT] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_DOMAIN_COMPANY_VIEW_REPORT, JSON.stringify({}), callback)
    },
    [types.QUERY_DOMAIN_SUFFIX_VIEW_REPORT] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_DOMAIN_SUFFIX_VIEW_REPORT, JSON.stringify({}), callback)
    },
    [types.QUERY_DOMAIN_SAFE_NORMAL_REPORT] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_DOMAIN_SAFE_NORMAL_REPORT, JSON.stringify({}), callback)
    },
    [types.QUERY_DOMAIN_SAFE_IMPORTANT_REPORT] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_DOMAIN_SAFE_IMPORTANT_REPORT, JSON.stringify({}), callback)
    },
    [types.QUERY_DOMAIN_SAFE_RATE_REPORT] ({ commit, rootState }, callback) {
      rest.post(links.QUERY_DOMAIN_SAFE_RATE_REPORT, JSON.stringify({}), callback)
    }
  }
}
