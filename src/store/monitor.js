import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_MAIL_MANAGE_TOP] ({ commit, rootState }, params) {
      rest.post(links.QUERY_MAIL_MANAGE_TOP, params.param, params.callback)
    },
    [types.QUERY_DOMAIN_MONITOR] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MONITOR, params.param, params.callback)
    },
    [types.QUERY_DOMAIN_MONITOR_DETAIL] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MONITOR_DETAIL, params.param, params.callback)
    },
    [types.QUERY_DOMAIN_MONITOR_LOG] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MONITOR_LOG, params.param, params.callback)
    }
  }
}
