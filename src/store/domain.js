import * as api from '@/api/domain'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    DOMAIN_LIST ({ commit }, params) {
      params = Object.assign({
        orderExpireDate: 'desc'
      }, params)
      return new Promise((resolve, reject) => {
        api.DOMAIN_LIST(params.pageNum, params.pageSize, params.domainName, params.domainSuffixs, params.otherSuffix, params.allSuffix, params.groupIds, params.serviceState, params.createDay, params.expireDay, params.createTimeBegin, params.createTimeEnd, params.expireTimeBegin, params.expireTimeEnd, params.orderExpireDate, params.depositFlag).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_DOMAIN_MANAGE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_MANAGE(params.domainId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SET_DOMAIN_GROUP ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SET_DOMAIN_GROUP(params.groupId, params.domainIds).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    MOD_DOMAIN_REG_USER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.MOD_DOMAIN_REG_USER(params.domainId, params.userNameCn, params.countryCode, params.cityCode, params.streetCn, params.zipCode, params.email, params.phoneInter, params.phoneArea, params.phoneNumber, params.faxInter, params.faxArea, params.faxNumber, params.userSureNameUk, params.userNameUk, params.streetUk).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    MOD_DOMAIN_ADM_USER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.MOD_DOMAIN_ADM_USER(params.domainId, params.organizeNameCn, params.userNameCn, params.countryCode, params.cityCode, params.streetCn, params.zipCode, params.email, params.phoneInter, params.phoneArea, params.phoneNumber, params.faxInter, params.faxArea, params.faxNumber, params.organizeNameUk, params.userSureNameUk, params.userNameUk, params.streetUk).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SET_DOMAIN_DNS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SET_DOMAIN_DNS(params.domainId, params.xinnet, params.verificationCode, params.dns).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_RENEW ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_RENEW(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DELETE_DEPOSIT_DOMAIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DELETE_DEPOSIT_DOMAIN(params.domainIds).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SET_DOMAIN_BRAND ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SET_DOMAIN_BRAND(params.domainIds, params.brandId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SYNC_DEPOSIT_DOMAIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SYNC_DEPOSIT_DOMAIN(params.domainId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_DEPOSIT_DOMAIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UPDATE_DEPOSIT_DOMAIN(params.domainId, params.registrarName, params.applyDate, params.expireDate, params.regUserName, params.regUserEmail).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CREATE_DEPOSIT_DOMAIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CREATE_DEPOSIT_DOMAIN(params.domainNames, params.companyId, params.groupId, params.brandId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
