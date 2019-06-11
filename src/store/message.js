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
    },
    SEND_UPDATE_PASSWORD ({ commit }) {
      return new Promise((resolve, reject) => {
        api.SEND_UPDATE_PASSWORD().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CHECK_UPDATE_PASSWORD ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CHECK_UPDATE_PASSWORD(params.verificationCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SEND_FORGET_PASSWORD ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SEND_FORGET_PASSWORD(params.phoneNum).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CHECK_FORGET_PASSWORD ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CHECK_FORGET_PASSWORD(params.userMobile, params.verificationCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
