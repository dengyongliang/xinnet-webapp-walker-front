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
    [types.QUERY_ROLE_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_ROLE_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_ROLE_MENUS] ({ commit, rootState }, params) {
      rest.post(links.QUERY_ROLE_MENUS, JSON.stringify(params.param), params.callback)
    },
    [types.ROLE_CREATE] ({ commit, rootState }, params) {
      rest.post(links.ROLE_CREATE, JSON.stringify(params.param), params.callback)
    },
    [types.ROLE_UPDATE] ({ commit, rootState }, params) {
      rest.post(links.ROLE_UPDATE, JSON.stringify(params.param), params.callback)
    },
    [types.ROLE_DELETE] ({ commit, rootState }, params) {
      rest.post(links.ROLE_DELETE, JSON.stringify(params.param), params.callback)
    }
  }
}
