import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_ROLE_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_ROLE_LIST, params.param, params.callback)
    },
    [types.QUERY_ROLE_MENUS] ({ commit, rootState }, params) {
      rest.post(links.QUERY_ROLE_MENUS, params.param, params.callback)
    },
    [types.ROLE_CREATE] ({ commit, rootState }, params) {
      rest.post(links.ROLE_CREATE, params.param, params.callback)
    },
    [types.ROLE_UPDATE] ({ commit, rootState }, params) {
      rest.post(links.ROLE_UPDATE, params.param, params.callback)
    },
    [types.ROLE_DELETE] ({ commit, rootState }, params) {
      rest.post(links.ROLE_DELETE, params.param, params.callback)
    }
  }
}
