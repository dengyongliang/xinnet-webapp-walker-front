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
    [types.QUERY_WORK_ORDER_MANAGE_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_WORK_ORDER_MANAGE_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.SUBMIT_WORK_ORDER] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_WORK_ORDER, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_WORK_ORDER_DETAIL] ({ commit, rootState }, params) {
      rest.post(links.QUERY_WORK_ORDER_DETAIL, JSON.stringify(params.param), params.callback)
    }
  }
}
