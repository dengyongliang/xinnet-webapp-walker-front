import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import user from './user.js'
import account from './account.js'
import finance from './finance.js'
import role from './role.js'
import company from './company.js'
import rest from '../global/rest.js'
import * as links from '../global/linkdo.js'
// import * as links from '../global/linkdo_json.js'
Vue.use(Vuex)
export default function makeStore () {
  return new Vuex.Store({
    state: {
      showBodySpin: false,
      maskClosable: false,
      islogin: false,
      pending: true,
      activation: {}
    },
    mutations: {
      [types.SHOW_BODY_SPIN] (state,payload) {
        state.showBodySpin = false
      },
      [types.SET_ACTIVATION_DATA] (state,payload) {
        Object.assign(state.activation, payload)
      },
      [types.CLEAR_ACTIVATION_DATA] (state,payload) {
        state.activation = {}
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
        rest.post(links.CHANGE_CUSTOMERS, JSON.stringify(param),function () {})
      },
      [types.GET_OLD_PHONE_CODE] ({ commit, rootState }, params) {
        rest.post(links.GET_OLD_PHONE_CODE, JSON.stringify(params.param), params.callback)
      },
      [types.GET_UPDATE_PHONE_CODE] ({ commit, rootState }, params) {
        rest.post(links.GET_UPDATE_PHONE_CODE, JSON.stringify(params.param), params.callback)
      },
      [types.CHECK_OLD_PHONE_CODE] ({ commit, rootState }, params) {
        rest.post(links.CHECK_OLD_PHONE_CODE, JSON.stringify(params.param), params.callback)
      }
    },
    getters: {
    },
    modules: {
      user,
      role,
      account,
      finance,
      company
    }
  })
}
