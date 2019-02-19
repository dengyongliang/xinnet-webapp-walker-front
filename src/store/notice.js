import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_MAIL_MANAGE] ({ commit, rootState }, params) {
      rest.post(links.QUERY_MAIL_MANAGE, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SET_MAIL_RECORD_READ] ({ commit, rootState }, params) {
      rest.post(links.SET_MAIL_RECORD_READ, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SET_NOTIFY] ({ commit, rootState }, params) {
      rest.post(links.SET_NOTIFY, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_NOTIFY_DETAIL] ({ commit, rootState }, params) {
      rest.post(links.QUERY_NOTIFY_DETAIL, params.param)
        .then(params.callback)
        .catch(() => {})
    }
  }
}
