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
    [types.QUERY_COMPANY_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_COMPANY_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.CREATE_COMPANY] ({ commit, rootState }, params) {
      rest.post(links.CREATE_COMPANY, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_COMPANY_INFO] ({ commit, rootState }, params) {
      rest.post(links.QUERY_COMPANY_INFO, JSON.stringify(params.param), params.callback)
    },
    [types.CREATE_GROUP] ({ commit, rootState }, params) {
      rest.post(links.CREATE_GROUP, JSON.stringify(params.param), params.callback)
    },
    [types.UPDATE_GROUP] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_GROUP, JSON.stringify(params.param), params.callback)
    },
    [types.DELETE_GROUP] ({ commit, rootState }, params) {
      rest.post(links.DELETE_GROUP, JSON.stringify(params.param), params.callback)
    },
    [types.UPDATE_COMPANY] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_COMPANY, JSON.stringify(params.param), params.callback)
    },
    [types.DELETE_COMPANY] ({ commit, rootState }, params) {
      rest.post(links.DELETE_COMPANY, JSON.stringify(params.param), params.callback)
    }
  }
}
