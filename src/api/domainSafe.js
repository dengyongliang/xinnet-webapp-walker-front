'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/domainSafe'

// 域名安全服务列表
export const DOMAIN_SAFE_LIST = (pageNum, pageSize, domainName, domainSuffixs, otherSuffix, allSuffix, groupIds, importantFlag, renewFlag, updateFlag, backendLockFlag) => {
  return axios({
    url: action.DOMAIN_SAFE_LIST,
    method: 'get',
    data: {pageNum, pageSize, domainName, domainSuffixs, otherSuffix, allSuffix, groupIds, importantFlag, renewFlag, updateFlag, backendLockFlag}
  })
}
// 设置域名保护级别
export const SET_PROTECT_LEVEL = (protectLevel, domainIds) => {
  return axios({
    url: action.SET_PROTECT_LEVEL,
    method: 'get',
    data: {protectLevel, domainIds}
  })
}
// 设置域名自动续费
export const SET_AUTO_RENEW = (autoRenewFlag, domainId) => {
  return axios({
    url: action.SET_AUTO_RENEW,
    method: 'get',
    data: {autoRenewFlag, domainId}
  })
}
// 设置域名禁止更新
export const SET_PROHIBIT_UPDATE = (prohibitUpdate, domainId) => {
  return axios({
    url: action.SET_PROHIBIT_UPDATE,
    method: 'get',
    data: {prohibitUpdate, domainId}
  })
}
// 购买域名注册局锁定
export const BUY_BACKEND_LOCK = () => {
  return axios({
    url: action.BUY_BACKEND_LOCK,
    method: 'get',
    data: {}
  })
}
// 续费域名注册局锁定
export const RENEW_BACKEND_LOCK = () => {
  return axios({
    url: action.RENEW_BACKEND_LOCK,
    method: 'get',
    data: {}
  })
}
