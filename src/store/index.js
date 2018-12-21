import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import user from './user.js'
import account from './account.js'
import finance from './finance.js'
import role from './role.js'
import company from './company.js'
import order from './order.js'
import domain from './domain.js'
import rest from '../global/rest.js'
// import * as links from '../global/linkdo.js'
import * as links from '../global/linkdo_json.js'
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
        jsonObj: []
      }
    },
    mutations: {
      [types.SET_LOGINED] (state, payload) {
        state.islogin = true
      },
      [types.SHOW_BODY_SPIN] (state,payload) {
        state.showBodySpin = false
      },
      [types.SET_ACTIVATION_DATA] (state,payload) {
        Object.assign(state.activation, payload)
      },
      [types.CLEAR_ACTIVATION_DATA] (state,payload) {
        state.activation = {}
      },
      [types.SET_PAY_ORDERS] (state,payload) {
        state.payOrders = payload
      },
      [types.SET_PAY_ORDERS_FINISH] (state,payload) {
        state.payOrdersFinish = payload
      },
      [types.CLEAR_PAY_DATA] (state) {
        state.payOrders = {jsonObj: []}
        state.payOrdersFinish = {jsonObj: []}
      }
    },
    actions: {
      [types.LOGIN_VERIFICATIONCODE] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_VERIFICATIONCODE, JSON.stringify(params.param),params.callback)
      },
      [types.LOGIN_SUBMIT] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_SUBMIT, JSON.stringify(params.param),params.callback)
      },
      [types.LOGIN_OUT] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_OUT, '',params.callback)
      },
      [types.CHECK_VALID_USER] ({ commit, rootState }, params) {
        rest.post(links.CHECK_VALID_USER, JSON.stringify(params.param),params.callback)
      },
      [types.ACTIVATION_VERIFICATIONCODE] ({ commit, rootState }, params) {
        rest.post(links.ACTIVATION_VERIFICATIONCODE, JSON.stringify(params.param),params.callback)
      },
      [types.SUBMIT_ACTIVATION_USER_INFO] ({ commit, rootState }, params) {
        rest.post(links.SUBMIT_ACTIVATION_USER_INFO, JSON.stringify(params.param),params.callback)
      },
      [types.SUBMIT_ACTIVATION_USER_PWD] ({ commit, rootState }, params) {
        rest.post(links.SUBMIT_ACTIVATION_USER_PWD, JSON.stringify(params.param),params.callback)
      },
      [types.QUERY_USER_CUSTOMERS_LIST] ({ commit, rootState }, callback) {
        rest.post(links.QUERY_USER_CUSTOMERS_LIST, '',callback)
      },
      [types.CHANGE_CUSTOMERS] ({ commit, rootState }, param) {
        rest.post(links.CHANGE_CUSTOMERS, JSON.stringify(param),function () {
          //Vue.$router.push({path: '/finance/overview'})
        })
      },
      [types.GET_OLD_PHONE_CODE] ({ commit, rootState }, params) {
        rest.post(links.GET_OLD_PHONE_CODE, JSON.stringify(params.param), params.callback)
      },
      [types.GET_UPDATE_PHONE_CODE] ({ commit, rootState }, params) {
        rest.post(links.GET_UPDATE_PHONE_CODE, JSON.stringify(params.param), params.callback)
      },
      [types.CHECK_OLD_PHONE_CODE] ({ commit, rootState }, params) {
        rest.post(links.CHECK_OLD_PHONE_CODE, JSON.stringify(params.param), params.callback)
      },
      [types.ORDER_SETTLEMENT] ({ commit, rootState }, params) {
        rest.post(links.ORDER_SETTLEMENT, JSON.stringify(params.param), params.callback)
      },
      [types.BUY_BACKEND_LOCK] ({ commit, rootState }, params) {
        rest.post(links.BUY_BACKEND_LOCK, JSON.stringify(params.param), params.callback)
      },
      [types.RENEW_BACKEND_LOCK] ({ commit, rootState }, params) {
        rest.post(links.RENEW_BACKEND_LOCK, JSON.stringify(params.param), params.callback)
      }
    },
    getters: {
    },
    modules: {
      user,
      role,
      account,
      finance,
      company,
      order,
      domain
    }
  })
}
