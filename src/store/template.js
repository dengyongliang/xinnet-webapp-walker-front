import * as api from '@/api/template'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    TEMPLATE_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TEMPLATE_LIST(params.pageNum, params.pageSize, params.templateName, params.verifyStatus).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CREATE_TEMPLATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CREATE_TEMPLATE(params.templateName, params.organizeNameCn, params.userNameCn, params.countryCode, params.cityCode, params.streetCn, params.zipCode, params.email, params.phoneInter, params.phoneArea, params.phoneNumber, params.faxInter, params.faxArea, params.faxNumber, params.organizeNameUk, params.userSureNameUk, params.userNameUk, params.streetUk).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TEMPLATE_VERIFY ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TEMPLATE_VERIFY(params.userCode, params.registrantType, params.idCode, params.idFileUrl, params.idFileName, params.idType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DELETE_TEMPLATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DELETE_TEMPLATE(params.templateId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_TEMPLATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UPDATE_TEMPLATE(params.userCode, params.templateName, params.organizeNameCn, params.userNameCn, params.countryCode, params.cityCode, params.streetCn, params.zipCode, params.email, params.phoneInter, params.phoneArea, params.phoneNumber, params.faxInter, params.faxArea, params.faxNumber, params.organizeNameUk, params.userSureNameUk, params.userNameUk, params.streetUk).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TEMPLATE_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TEMPLATE_INFO(params.templateId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TEMPLATE_VERIFY_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TEMPLATE_VERIFY_INFO(params.templateId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TEMPLATES ({ commit }) {
      return new Promise((resolve, reject) => {
        api.TEMPLATES().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
