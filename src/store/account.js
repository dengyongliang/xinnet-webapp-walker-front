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
    [types.QUERY_USER_LIST] ({ commit, rootState }, params) {
      rest.get(links.QUERY_USER_LIST, JSON.stringify(params.param),params.callback)
    },
    [types.ADD_USER] ({ commit, rootState }, params) {
      rest.get(links.ADD_USER, JSON.stringify(params.param),params.callback)
    },
    [types.QUERY_USER_COMPANYS] ({ commit, rootState }, params) {
      rest.get(links.QUERY_USER_COMPANYS, JSON.stringify(params.param),params.callback)
    },
    [types.DELETE_USER_INFO] ({ commit, rootState }, params) {
      rest.post(links.DELETE_USER_INFO, JSON.stringify(params.param),params.callback)
    },
    [types.QUERY_USER_INFO] ({ commit, rootState }, params) {
      rest.get(links.QUERY_USER_INFO, JSON.stringify(params.param),params.callback)
    },
    [types.UPDATE_USER_AUTH] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_USER_AUTH, JSON.stringify(params.param),params.callback)
    },
    [types.UPDATE_USER] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_USER, JSON.stringify(params.param),params.callback)
    }
  }
}
