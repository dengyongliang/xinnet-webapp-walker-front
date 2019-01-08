import * as types from './types'
import rest from '../global/rest.js'
// import * as links from '../global/linkdo.js'
import * as links from '../global/linkdo_json.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_MAIL_MANAGE] ({ commit, rootState }, params) {
      rest.get(links.QUERY_MAIL_MANAGE, JSON.stringify(params.param), params.callback)
    },
    [types.SET_MAIL_RECORD_READ] ({ commit, rootState }, params) {
      rest.post(links.SET_MAIL_RECORD_READ, JSON.stringify(params.param), params.callback)
    },
    [types.SET_NOTIFY] ({ commit, rootState }, params) {
      rest.post(links.SET_NOTIFY, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_NOTIFY_DETAIL] ({ commit, rootState }, params) {
      rest.post(links.QUERY_NOTIFY_DETAIL, JSON.stringify(params.param), params.callback)
    }
  }
}
