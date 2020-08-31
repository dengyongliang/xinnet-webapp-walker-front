import * as api from '@/api/trademark'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    TRADEMARK_SEARCH ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_SEARCH(params.searchType, params.keyWords, params.intCls, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TRADEMARK_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_INFO(params.regNo, params.intCls).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TRADEMARK_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_LIST(params.keyWords, params.currentStatus, params.brandId, params.intCls, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TRADEMARK_SORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_SORT().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DELETE_TRADEMARK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.DELETE_TRADEMARK(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TRADEMARK_CHECK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.TRADEMARK_CHECK(params.regNos, params.keyWords).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CREATE_TRADEMARK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CREATE_TRADEMARK(params.brandId, params.regNos).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    APP_TRADEMARK ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.APP_TRADEMARK(params.tmName, params.contactor, params.phoneNum, params.email, params.description).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_TRADEMARK_SEARCH ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_TRADEMARK_SEARCH(params.keyWords, params.currentStatus, params.brandId, params.intCls, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SIMILAR_TRADEMARK_SEARCH ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SIMILAR_TRADEMARK_SEARCH(params.keyWords, params.brandId, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    BODY_TRADEMARK_SEARCH ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.BODY_TRADEMARK_SEARCH(params.applicantCn, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    BODY_TRADEMARK_UNFOLLOW ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.BODY_TRADEMARK_UNFOLLOW(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SIMILAR_TRADEMARK_UNFOLLOW ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SIMILAR_TRADEMARK_UNFOLLOW(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_TRADEMARK_UNFOLLOW ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_TRADEMARK_UNFOLLOW(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SIMILAR_TRADEMARK_DETAIL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SIMILAR_TRADEMARK_DETAIL(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SIMILAR_TRADEMARK_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SIMILAR_TRADEMARK_LIST(params.id, params.issueNumber, params.intClass, params.order, params.orderType, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    BODY_TRADEMARK_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.BODY_TRADEMARK_LIST(params.monitorBodyId, params.keyWords, params.intClass, params.orderType, params.pageNum, params.pageSize).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_TRADEMARK_SIMILAR_FOLLOW ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_TRADEMARK_SIMILAR_FOLLOW(params.ids, params.brandId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_TRADEMARK_BODY_FOLLOW ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_TRADEMARK_BODY_FOLLOW(params.regNo, params.intCls, params.brandId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_TRADEMARK_ADD_NOTIFY ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_TRADEMARK_ADD_NOTIFY(params.notifyWay, params.notifyUsers).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    BODY_TRADEMARK_INSERT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.BODY_TRADEMARK_INSERT(params.applicantCn).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SIMILAR_TRADEMARK_INSERT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SIMILAR_TRADEMARK_INSERT(params.monitorType, params.keyWords, params.monitorCondition, params.intClasses, params.brandId, params.excludeApplicant).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SIMILAR_TRADEMARK_UPDATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SIMILAR_TRADEMARK_UPDATE(params.id, params.brandId, params.excludeApplicant).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SIMILAR_TRADEMARK_QUERY ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.SIMILAR_TRADEMARK_QUERY(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_TRADEMARK_SEARCH_NOTIFY ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.FOLLOW_TRADEMARK_SEARCH_NOTIFY().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
