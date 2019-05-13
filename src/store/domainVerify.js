import * as api from '@/api/domainVerify'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    DOMAIN_VERIFY_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_VERIFY_LIST(params.pageNum, params.pageSize, params.domainName, params.groupIds, params.serviceState, params.rnvcStatus, params.dnvcStatus, params.verifyDay, params.verifyTimeBegin, params.verifyTimeEnd).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPLOAD_DOMAIN_VERIFY ({ commit }, params) {
      params = Object.assign({
        domainIds: '',
        registrantType: '',
        idCode: '',
        idType: '',
        idFileUrl: '',
        idFileName: '',
        templateId: ''
      }, params)
      return new Promise((resolve, reject) => {
        api.UPLOAD_DOMAIN_VERIFY(params.domainIds, params.registrantType, params.idCode, params.idType, params.idFileUrl, params.idFileName, params.templateId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_DOMAIN_AUDIT_STATUS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UPDATE_DOMAIN_AUDIT_STATUS(params.domainIds).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
