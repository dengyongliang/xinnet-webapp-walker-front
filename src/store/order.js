import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_ORDER_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_ORDER_LIST, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.EXPORT_ORDER_LIST] ({ commit, rootState }, params) {
      rest.post(links.EXPORT_ORDER_LIST, params.param)
        .then(params.callback)
        .catch(() => {})
    }
  }
}
