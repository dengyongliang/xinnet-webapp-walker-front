import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_TEMPLATE_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_TEMPLATE_LIST, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.CREATE_TEMPLATE] ({ commit, rootState }, params) {
      rest.post(links.CREATE_TEMPLATE, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SUBMIT_TEMPLATE] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_TEMPLATE, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.DELETE_TEMPLATE] ({ commit, rootState }, params) {
      rest.post(links.DELETE_TEMPLATE, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.UPDATE_TEMPLATE] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_TEMPLATE, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_TEMPLATE_INFO] ({ commit, rootState }, params) {
      rest.post(links.QUERY_TEMPLATE_INFO, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_VERIFY_INFO] ({ commit, rootState }, params) {
      rest.post(links.QUERY_VERIFY_INFO, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_CHANGE_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_CHANGE_LIST, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_TRANSFER_IN_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_TRANSFER_IN_LIST, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_TEMPLATES] ({ commit, rootState }, params) {
      rest.post(links.QUERY_TEMPLATES, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_ORDER_CONFIRM] ({ commit, rootState }, params) {
      rest.post(links.QUERY_ORDER_CONFIRM, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SUBMIT_CHANGE] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_CHANGE, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_CHANGE_INFO] ({ commit, rootState }, params) {
      rest.post(links.QUERY_CHANGE_INFO, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SUBMIT_TRANSFER_IN] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_TRANSFER_IN, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_DOMAIN_VERIFY_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_VERIFY_LIST, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SUBMIT_DOMAIN_VERIFY] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_DOMAIN_VERIFY, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.UPDATE_DOMAIN_AUDIT_STATUS] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_DOMAIN_AUDIT_STATUS, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_DOMAIN_SAFE_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_SAFE_LIST, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SET_PROTECT_LEVEL] ({ commit, rootState }, params) {
      rest.post(links.SET_PROTECT_LEVEL, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SET_AUTO_RENEW] ({ commit, rootState }, params) {
      rest.post(links.SET_AUTO_RENEW, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SET_PROHIBIT_UPDATE] ({ commit, rootState }, params) {
      rest.post(links.SET_PROHIBIT_UPDATE, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_DOMAIN_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_LIST, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.QUERY_DOMAIN_MANAGE_DETAIL] ({ commit, rootState }, params) {
      rest.post(links.QUERY_DOMAIN_MANAGE_DETAIL, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SET_DOMAIN_GROUP] ({ commit, rootState }, params) {
      rest.post(links.SET_DOMAIN_GROUP, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SUBMIT_MOD_DOMAIN_REG_USER] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_MOD_DOMAIN_REG_USER, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SUBMIT_MOD_DOMAIN_ADM_USER] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_MOD_DOMAIN_ADM_USER, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.SET_DOMAIN_DNS] ({ commit, rootState }, params) {
      rest.post(links.SET_DOMAIN_DNS, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.ORDER_PAY_DOMAIN_RENEW] ({ commit, rootState }, params) {
      rest.post(links.ORDER_PAY_DOMAIN_RENEW, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.OVERVIEW_DOMAIN_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    },
    [types.OVERVIEW_DOMAIN_COUNT_STATISTICS] ({ commit, rootState }, params) {
      rest.post(links.OVERVIEW_DOMAIN_COUNT_STATISTICS, params.param)
        .then(params.callback)
        .catch(() => {})
    },
    [types.OVERVIEW_TEMPLATE_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_TEMPLATE_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    },
    [types.OVERVIEW_BACKEND_LOCK_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_BACKEND_LOCK_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    },
    [types.OVERVIEW_DOMAIN_VERIFY_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_VERIFY_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    },
    [types.OVERVIEW_DOMAIN_RENEW_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_RENEW_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    },
    [types.OVERVIEW_DOMAIN_TRANSFER_IN_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_TRANSFER_IN_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    },
    [types.OVERVIEW_DOMAIN_CHANGE_STATISTICS] ({ commit, rootState }, callback) {
      rest.post(links.OVERVIEW_DOMAIN_CHANGE_STATISTICS, {})
        .then(callback)
        .catch(() => {})
    }
  }
}
