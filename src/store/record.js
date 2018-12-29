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
    [types.QUERY_DOMAIN_MONITOR_MANAGE] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MONITOR_MANAGE, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_USER_MONITOR_MANAGE] ({ commit, rootState }, params) {
      rest.post(links.QUERY_USER_MONITOR_MANAGE, JSON.stringify(params.param), params.callback)
    }
  }
}
