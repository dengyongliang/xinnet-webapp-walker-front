'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/followdomain'

// 域名管理-详情管理
export const FOLLOW_DOMAIN_LIST = (domainName, siteTypes, excepType, isReg, brandIds, domainSuffixs, otherSuffixs, createTimeBegin, createTimeEnd, applyTimeBegin, applyTimeEnd, expireTimeBegin, expireTimeEnd, pageNum, pageSize, orderByProperty, orderByType) => {
  return axios({
    url: action.FOLLOW_DOMAIN_LIST,
    method: 'POST',
    data: {domainName, siteTypes, excepType, isReg, brandIds, domainSuffixs, otherSuffixs, createTimeBegin, createTimeEnd, applyTimeBegin, applyTimeEnd, expireTimeBegin, expireTimeEnd, pageNum, pageSize, orderByProperty, orderByType}
  })
}
export const FOLLOW_DOMAIN_INFO = (id) => {
  return axios({
    url: action.FOLLOW_DOMAIN_INFO,
    method: 'POST',
    data: {id}
  })
}
export const FOLLOW_RECORD_LIST = (domainId, pageNum, pageSize, createDateBegin, createDateEnd, recordType) => {
  return axios({
    url: action.FOLLOW_RECORD_LIST,
    method: 'POST',
    data: {domainId, pageNum, pageSize, createDateBegin, createDateEnd, recordType}
  })
}
export const FOLLOW_BRAND_LIST = (pageNum, pageSize) => {
  // pageNum, pageSize, brandName, brandLevel, order, orderType
  return axios({
    url: action.FOLLOW_BRAND_LIST,
    method: 'POST',
    data: {pageNum, pageSize}
  })
}
export const REPORT_FOLLOW_RECORD = (reportType, brandId) => {
  return axios({
    url: action.REPORT_FOLLOW_RECORD,
    method: 'POST',
    data: {reportType, brandId}
  })
}
export const EXCEP_FOLLOW_RECORD_LIST = (pageNum, pageSize, brandId) => {
  return axios({
    url: action.EXCEP_FOLLOW_RECORD_LIST,
    method: 'POST',
    data: {pageNum, pageSize, brandId}
  })
}
export const CREATE_BRAND = (params) => {
  return axios({
    url: action.CREATE_BRAND,
    method: 'POST',
    data: params
  })
}
export const UPDATE_BRAND = (params) => {
  return axios({
    url: action.UPDATE_BRAND,
    method: 'POST',
    data: params
  })
}
export const DELETE_BRAND = (id) => {
  return axios({
    url: action.DELETE_BRAND,
    method: 'POST',
    data: {id}
  })
}
export const CREATE_DOMAIN = (brandId, domainNames) => {
  return axios({
    url: action.CREATE_DOMAIN,
    method: 'POST',
    data: {brandId, domainNames}
  })
}
export const DELETE_DOMAIN = (id) => {
  return axios({
    url: action.DELETE_DOMAIN,
    method: 'POST',
    data: {id}
  })
}
export const QUERY_BRAND = (brandId) => {
  return axios({
    url: action.QUERY_BRAND,
    method: 'POST',
    data: {brandId}
  })
}
export const REFRESE_DOMAIN = (id) => {
  return axios({
    url: action.REFRESE_DOMAIN,
    method: 'POST',
    data: {id}
  })
}
export const FOLLOW_BRAND_DETAIL = (id) => {
  return axios({
    url: action.FOLLOW_BRAND_DETAIL,
    method: 'POST',
    data: {id}
  })
}
export const SEARCH_FOLLOW_BRAND_LIST = (params) => {
  return axios({
    url: action.SEARCH_FOLLOW_BRAND_LIST,
    method: 'POST',
    data: params
  })
}

// export const FOLLOW_DOMAIN_CREATE_BRAND = (brandName, companyId, brandLevel, brandKeyword, brandLogo, notifyUsers, notifyWay) => {
//   return axios({
//     url: action.FOLLOW_DOMAIN_CREATE_BRAND,
//     method: 'POST',
//     data: {brandName, companyId, brandLevel, brandKeyword, brandLogo, notifyUsers, notifyWay}
//   })
// }
// export const FOLLOW_DOMAIN_UPDATE_BRAND = (id, brandName, companyId, brandLevel, brandKeyword, brandLogo, notifyUsers, notifyWay) => {
//   return axios({
//     url: action.FOLLOW_DOMAIN_UPDATE_BRAND,
//     method: 'POST',
//     data: {id, brandName, companyId, brandLevel, brandKeyword, brandLogo, notifyUsers, notifyWay}
//   })
// }
