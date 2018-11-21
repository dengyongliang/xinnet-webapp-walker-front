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
    [types.FINANCE_PAY_STATISTICS] ({ commit, rootState }, params) {
      rest.get(links.FINANCE_PAY_STATISTICS, params.param,params.callback)
    }
  }
}
