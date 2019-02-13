import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_COMPANY_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_COMPANY_LIST, params.param)
        .then(params.callback)
        .catch()
    },
    [types.CREATE_COMPANY] ({ commit, rootState }, params) {
      rest.post(links.CREATE_COMPANY, params.param)
        .then(params.callback)
        .catch()
    },
    [types.QUERY_COMPANY_INFO] ({ commit, rootState }, params) {
      rest.post(links.QUERY_COMPANY_INFO, params.param)
        .then(params.callback)
        .catch()
    },
    [types.CREATE_GROUP] ({ commit, rootState }, params) {
      rest.post(links.CREATE_GROUP, params.param)
        .then(params.callback)
        .catch()
    },
    [types.UPDATE_GROUP] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_GROUP, params.param)
        .then(params.callback)
        .catch()
    },
    [types.DELETE_GROUP] ({ commit, rootState }, params) {
      rest.post(links.DELETE_GROUP, params.param)
        .then(params.callback)
        .catch()
    },
    [types.UPDATE_COMPANY] ({ commit, rootState }, params) {
      rest.post(links.UPDATE_COMPANY, params.param)
        .then(params.callback)
        .catch()
    },
    [types.DELETE_COMPANY] ({ commit, rootState }, params) {
      rest.post(links.DELETE_COMPANY, params.param)
        .then(params.callback)
        .catch()
    }
  }
}
