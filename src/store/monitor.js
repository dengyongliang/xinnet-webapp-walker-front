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
    [types.QUERY_MAIL_MANAGE_TOP] ({ commit, rootState }, params) {
      rest.post(links.QUERY_MAIL_MANAGE_TOP, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_DOMAIN_MONITOR] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MONITOR, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_DOMAIN_MONITOR_DETAIL] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MONITOR_DETAIL, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_DOMAIN_MONITOR_LOG] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MONITOR_LOG, JSON.stringify(params.param), params.callback)
    }
  }
}
