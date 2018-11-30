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
    [types.QUERY_USER_LIST] ({ commit, rootState }, params) {
      rest.get(links.QUERY_USER_LIST, JSON.stringify(params.param),params.callback)
    },
    [types.ADD_USER] ({ commit, rootState }, params) {
      rest.get(links.ADD_USER, JSON.stringify(params.param),params.callback)
    }
  }
}
