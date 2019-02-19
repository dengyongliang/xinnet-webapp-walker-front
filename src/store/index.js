import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import home from './home.js'
import user from './user.js'
import finance from './finance.js'
import role from './role.js'
import company from './company.js'
import order from './order.js'
import workorder from './workorder.js'
import domain from './domain.js'
import notice from './notice.js'
import record from './record.js'
import report from './report.js'
import monitor from './monitor.js'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'

Vue.use(Vuex)
export default function makeStore () {
  return new Vuex.Store({
    state: {
      showBodySpin: false,
      maskClosable: false,
      islogin: false,
      pending: true,
      activation: {},
      payOrders: {
        jsonObj: []
      },
      payOrdersFinish: {
        // jsonObj: []
      }
    },
    mutations: {
      [types.SET_LOGINED] (state, payload) {
        state.islogin = true
      },
      [types.SHOW_BODY_SPIN] (state, payload) {
        state.showBodySpin = false
      },
      [types.SET_ACTIVATION_DATA] (state, payload) {
        Object.assign(state.activation, payload)
      },
      [types.CLEAR_ACTIVATION_DATA] (state, payload) {
        state.activation = {}
      },
      [types.SET_PAY_ORDERS] (state, payload) {
        state.payOrders = payload
      },
      [types.SET_PAY_ORDERS_FINISH] (state, payload) {
        state.payOrdersFinish = payload
      },
      [types.CLEAR_PAY_DATA] (state) {
        state.payOrders = {jsonObj: []}
        state.payOrdersFinish = {jsonObj: []}
      }
    },
    actions: {
      [types.LOGIN_VERIFICATIONCODE] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_VERIFICATIONCODE, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.LOGIN_SUBMIT] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_SUBMIT, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.LOGIN_OUT] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_OUT, {})
          .then(params.callback)
          .catch(() => {})
      },
      [types.CHECK_VALID_USER] ({ commit, rootState }, params) {
        rest.post(links.CHECK_VALID_USER, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.ACTIVATION_VERIFICATIONCODE] ({ commit, rootState }, params) {
        rest.post(links.ACTIVATION_VERIFICATIONCODE, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.SUBMIT_ACTIVATION_USER_INFO] ({ commit, rootState }, params) {
        rest.post(links.SUBMIT_ACTIVATION_USER_INFO, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.SUBMIT_ACTIVATION_USER_PWD] ({ commit, rootState }, params) {
        rest.post(links.SUBMIT_ACTIVATION_USER_PWD, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.QUERY_USER_CUSTOMERS_LIST] ({ commit, rootState }, callback) {
        rest.get(links.QUERY_USER_CUSTOMERS_LIST, {})
          .then(callback)
          .catch(() => {})
      },
      [types.CHANGE_CUSTOMERS] ({ commit, rootState }, params) {
        rest.post(links.CHANGE_CUSTOMERS, params.param)
          .then(function () {
            window.location.href = '/home'
          })
          .catch(() => {})
      },
      [types.GET_OLD_PHONE_CODE] ({ commit, rootState }, params) {
        rest.post(links.GET_OLD_PHONE_CODE, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.GET_UPDATE_PHONE_CODE] ({ commit, rootState }, params) {
        rest.post(links.GET_UPDATE_PHONE_CODE, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.CHECK_OLD_PHONE_CODE] ({ commit, rootState }, params) {
        rest.post(links.CHECK_OLD_PHONE_CODE, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.ORDER_SETTLEMENT] ({ commit, rootState }, params) {
        rest.post(links.ORDER_SETTLEMENT, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.BUY_BACKEND_LOCK] ({ commit, rootState }, params) {
        rest.post(links.BUY_BACKEND_LOCK, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.RENEW_BACKEND_LOCK] ({ commit, rootState }, params) {
        rest.post(links.RENEW_BACKEND_LOCK, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.GET_DOMAIN_MGMT_V_CODE] ({ commit, rootState }, params) {
        rest.post(links.GET_DOMAIN_MGMT_V_CODE, params.param)
          .then(params.callback)
          .catch(() => {})
      },
      [types.ORDER_PAYMENT] ({ commit, rootState }, params) {
        rest.post(links.ORDER_PAYMENT, params.param)
          .then(params.callback)
          .catch(() => {})
      }
    },
    getters: {
    },
    modules: {
      user,
      role,
      finance,
      company,
      order,
      workorder,
      domain,
      home,
      notice,
      record,
      report,
      monitor
    }
  })
}
