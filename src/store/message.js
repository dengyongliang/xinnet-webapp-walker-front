import * as api from '@/api/message'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    ACTIVATION_CODE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.ACTIVATION_CODE(params.userMobile).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CLIENT_LOGIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CLIENT_LOGIN(params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SEND_OLD_PHONE_CODE ({ commit }) {
      return new Promise((resolve, reject) => {
        api.SEND_OLD_PHONE_CODE().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_PHONE_CODE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UPDATE_PHONE_CODE(params.userMobile).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_MANAGE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_MANAGE(params.domainId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CHECK_OLD_PHONE_CODE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CHECK_OLD_PHONE_CODE(params.verificationCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
