import * as api from '@/api/monitor'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    MAIL_MANAGE ({ commit }, params) {
      params = Object.assign({
        pageNum: 1,
        pageSize: 20,
        createTimeBegin: '',
        createTimeEnd: '',
        type: ''
      }, params)
      return new Promise((resolve, reject) => {
        api.MAIL_MANAGE(params.pageNum, params.pageSize, params.createTimeBegin, params.createTimeEnd, params.type).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    MAIL_RECORD_READ ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.MAIL_RECORD_READ(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    NOTIFY_SET ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.NOTIFY_SET(params.notifyInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    NOTIFY_SET_DETAIL ({ commit }) {
      return new Promise((resolve, reject) => {
        api.NOTIFY_SET_DETAIL().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_MONITOR_MANAGE ({ commit }, params) {
      params = Object.assign({
        pageNum: 1,
        pageSize: 20,
        domainName: '',
        createTimeBegin: '',
        createTimeEnd: '',
        levelType: ''
      }, params)
      return new Promise((resolve, reject) => {
        api.DOMAIN_MONITOR_MANAGE(params.pageNum, params.pageSize, params.domainName, params.createTimeBegin, params.createTimeEnd, params.levelType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    USER_MONITOR_MANAGE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.USER_MONITOR_MANAGE(params.pageNum, params.pageSize, params.userName, params.createTimeBegin, params.createTimeEnd, params.type).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    MAIL_MANAGE_TOP ({ commit }) {
      return new Promise((resolve, reject) => {
        api.MAIL_MANAGE_TOP().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_MONITOR ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_MONITOR(params.pageNum, params.pageSize, params.domainName, params.groupIds, params.serviceState, params.monitorLog).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_MONITOR_DETAIL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_MONITOR_DETAIL(params.domainName).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DOMAIN_MONITOR_LOG ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DOMAIN_MONITOR_LOG(params.pageNum, params.pageSize, params.domainName, params.createTimeBegin, params.createTimeEnd, params.type).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    MAIL_RECORD_DETAIL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.MAIL_RECORD_DETAIL(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
