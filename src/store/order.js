import * as api from '@/api/order'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    ORDER_PAYMENT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ORDER_PAYMENT(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ORDER_CONFIRM ({ commit }, params) {
      params = Object.assign({
        templateId: '',
        groupId: '',
        jsonObj: []
      }, params)
      return new Promise((resolve, reject) => {
        api.ORDER_CONFIRM(params.templateId, params.groupId, params.jsonObj).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ORDER_SETTLEMENT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ORDER_SETTLEMENT(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ORDER_MANAGE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ORDER_MANAGE(params.pageNum, params.pageSize, params.createTimeBegin, params.createTimeEnd, params.orderGoodsInfo, params.orderGoodsType, params.orderMode, params.orderPayType, params.orderType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
