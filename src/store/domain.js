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
      rest.post(links.QUERY_DOMAIN_LIST, JSON.stringify(params.param), params.callback)
    },
    [types.QUERY_DOMAIN_MANAGE_DETAIL] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MANAGE_DETAIL, JSON.stringify(params.param), params.callback)
    },
    [types.SET_DOMAIN_GROUP] ({ commit, rootState }, params) {
      rest.post(links.SET_DOMAIN_GROUP, JSON.stringify(params.param), params.callback)
    },
    [types.SUBMIT_MOD_DOMAIN_REG_USER] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_MOD_DOMAIN_REG_USER, JSON.stringify(params.param), params.callback)
    },
    [types.SUBMIT_MOD_DOMAIN_ADM_USER] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_MOD_DOMAIN_ADM_USER, JSON.stringify(params.param), params.callback)
    },
    [types.SET_DOMAIN_DNS] ({ commit, rootState }, params) {
      rest.post(links.SET_DOMAIN_DNS, JSON.stringify(params.param), params.callback)
    },
    [types.ORDER_PAY_DOMAIN_RENEW] ({ commit, rootState }, params) {
      rest.post(links.ORDER_PAY_DOMAIN_RENEW, JSON.stringify(params.param), params.callback)
    },
    [types.OVERVIEW_DOMAIN_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_STATISTICS, JSON.stringify({}), callback)
    },
    [types.OVERVIEW_DOMAIN_COUNT_STATISTICS] ({ commit, rootState }, params) {
      rest.post(links.OVERVIEW_DOMAIN_COUNT_STATISTICS, JSON.stringify(params.param), params.callback)
    },
    [types.OVERVIEW_TEMPLATE_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_TEMPLATE_STATISTICS, JSON.stringify({}), callback)
    },
    [types.OVERVIEW_BACKEND_LOCK_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_BACKEND_LOCK_STATISTICS, JSON.stringify({}), callback)
    },
    [types.OVERVIEW_DOMAIN_VERIFY_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_VERIFY_STATISTICS, JSON.stringify({}), callback)
    },
    [types.OVERVIEW_DOMAIN_RENEW_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_RENEW_STATISTICS, JSON.stringify({}), callback)
    },
    [types.OVERVIEW_DOMAIN_TRANSFER_IN_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_TRANSFER_IN_STATISTICS, JSON.stringify({}), callback)
    },
    [types.OVERVIEW_DOMAIN_CHANGE_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_CHANGE_STATISTICS, JSON.stringify({}), callback)
    }
  }
}
