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
    [types.QUERY_COMPANY_LIST] ({ commit, rootState }, params) {
      rest.get(links.QUERY_COMPANY_LIST, JSON.stringify(params.param), params.callback)
    }
  }
}
