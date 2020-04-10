import Vue from 'vue'
import Vuex from 'vuex'
import change from './change.js'
import company from './company.js'
import domain from './domain.js'
import domainOverview from './domainOverview.js'
import domainSafe from './domainSafe.js'
import domainVerify from './domainVerify.js'
import finance from './finance.js'
import message from './message.js'
import monitor from './monitor.js'
import order from './order.js'
import report from './report.js'
import role from './role.js'
import template from './template.js'
import transferin from './transferin.js'
import user from './user.js'
import workorder from './workorder.js'
import followdomain from './followdomain.js'
import trademark from './trademark.js'
import * as api from '@/api/index'

Vue.use(Vuex)

const store = new Vuex.Store({
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
    SET_LOGINED (state, payload) {
      state.islogin = true
    },
    SET_LOGOUT (state, payload) {
      state.islogin = false
    },
    SHOW_BODY_SPIN (state, payload) {
      state.showBodySpin = false
    },
    SET_ACTIVATION_DATA (state, payload) {
      Object.assign(state.activation, payload)
    },
    CLEAR_ACTIVATION_DATA (state, payload) {
      state.activation = {}
    },
    SET_PAY_ORDERS (state, payload) {
      state.payOrders = payload
    },
    SET_PAY_ORDERS_FINISH (state, payload) {
      state.payOrdersFinish = payload
    },
    CLEAR_PAY_DATA (state) {
      state.payOrders = {jsonObj: []}
      state.payOrdersFinish = {jsonObj: []}
    }
  },
  actions: {
    MY_COMPANY ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.MY_COMPANY(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    MY_KEEPER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.MY_KEEPER(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    INDEX_DOMAIN_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    COMPANY_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.COMPANY_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    USER_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.USER_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    INDEX_PAY_STATISTICS_UNBILLED ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PAY_STATISTICS_UNBILLED(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    INDEX_PAY_STATISTICS_HISTORY_BILL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PAY_STATISTICS_HISTORY_BILL(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ACCOUNT_STATISTICS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ACCOUNT_STATISTICS(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
  },
  modules: {
    change,
    user,
    role,
    finance,
    company,
    order,
    workorder,
    domain,
    domainOverview,
    domainSafe,
    domainVerify,
    message,
    report,
    monitor,
    template,
    transferin,
    followdomain,
    trademark
  }
})
export default store
