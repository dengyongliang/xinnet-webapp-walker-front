import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_WORK_ORDER_MANAGE_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_WORK_ORDER_MANAGE_LIST, params.param)
        .then(params.callback)
        .catch()
    },
    [types.SUBMIT_WORK_ORDER] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_WORK_ORDER, params.param)
        .then(params.callback)
        .catch()
    },
    [types.QUERY_WORK_ORDER_DETAIL] ({ commit, rootState }, params) {
      rest.post(links.QUERY_WORK_ORDER_DETAIL, params.param)
        .then(params.callback)
        .catch()
    }
  }
}
