import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_DOMAIN_MONITOR_MANAGE] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MONITOR_MANAGE, params.param)
        .then(params.callback)
        .catch()
    },
    [types.QUERY_USER_MONITOR_MANAGE] ({ commit, rootState }, params) {
      rest.post(links.QUERY_USER_MONITOR_MANAGE, params.param)
        .then(params.callback)
        .catch()
    }
  }
}
