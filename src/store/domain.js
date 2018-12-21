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
      rest.post(links.QUERY_CHANGE_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_TRANSFER_IN_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_TRANSFER_IN_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_TEMPLATES] ({ commit, rootState }, params) {
      rest.post(links.QUERY_TEMPLATES, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_ORDER_CONFIRM] ({ commit, rootState }, params) {
      rest.post(links.QUERY_ORDER_CONFIRM, JSON.stringify(params.param), params.callback)
    },
    [types.SUBMIT_CHANGE] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_CHANGE, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_CHANGE_INFO] ({ commit, rootState }, params) {
      rest.post(links.QUERY_CHANGE_INFO, JSON.stringify(params.param), params.callback)
    },
    [types.SUBMIT_TRANSFER_IN] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_TRANSFER_IN, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_DOMAIN_VERIFY_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_VERIFY_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.SUBMIT_DOMAIN_VERIFY] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_DOMAIN_VERIFY, JSON.stringify(params.param), params.callback)
    },
    [types.UPDATE_DOMAIN_AUDIT_STATUS] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_DOMAIN_AUDIT_STATUS, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_DOMAIN_SAFE_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_SAFE_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.SET_PROTECT_LEVEL] ({ commit, rootState }, params) {
      rest.post(links.SET_PROTECT_LEVEL, JSON.stringify(params.param), params.callback)
    },
    [types.SET_AUTO_RENEW] ({ commit, rootState }, params) {
      rest.post(links.SET_AUTO_RENEW, JSON.stringify(params.param), params.callback)
    },
    [types.SET_PROHIBIT_UPDATE] ({ commit, rootState }, params) {
      rest.post(links.SET_PROHIBIT_UPDATE, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_DOMAIN_LIST] ({ commit, rootState }, params) {
      rest.get(links.QUERY_DOMAIN_LIST, JSON.stringify(params.param), params.callback)
    }
  }
}
