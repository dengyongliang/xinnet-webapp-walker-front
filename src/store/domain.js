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
    [types.QUERY_TEMPLATE_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_TEMPLATE_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.CREATE_TEMPLATE] ({ commit, rootState }, params) {
      rest.post(links.CREATE_TEMPLATE, JSON.stringify(params.param), params.callback)
    },
    [types.SUBMIT_TEMPLATE] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_TEMPLATE, JSON.stringify(params.param), params.callback)
    },
    [types.DELETE_TEMPLATE] ({ commit, rootState }, params) {
      rest.post(links.DELETE_TEMPLATE, JSON.stringify(params.param), params.callback)
    },
    [types.UPDATE_TEMPLATE] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_TEMPLATE, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_TEMPLATE_INFO] ({ commit, rootState }, params) {
      rest.post(links.QUERY_TEMPLATE_INFO, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_VERIFY_INFO] ({ commit, rootState }, params) {
      rest.post(links.QUERY_VERIFY_INFO, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_CHANGE_LIST] ({ commit, rootState }, params) {
      rest.get(links.QUERY_CHANGE_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_TRANSFER_IN_LIST] ({ commit, rootState }, params) {
      rest.get(links.QUERY_TRANSFER_IN_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_TEMPLATES] ({ commit, rootState }, params) {
      rest.get(links.QUERY_TEMPLATES, JSON.stringify(params.param), params.callback)
    }
  }
}
