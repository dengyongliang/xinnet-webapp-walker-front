'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/followdomain'

// 域名管理-详情管理
export const FOLLOW_DOMAIN_LIST = (domainName, siteTypes, ipTypes, isReg, brandIds, domainSuffixs, createTimeBegin, createTimeEnd, applyTimeBegin, applyTimeEnd, expireTimeBegin, expireTimeEnd, pageNum, pageSize) => {
  return axios({
    url: action.FOLLOW_DOMAIN_LIST,
    method: 'POST',
    data: {domainName, siteTypes, ipTypes, isReg, brandIds, domainSuffixs, createTimeBegin, createTimeEnd, applyTimeBegin, applyTimeEnd, expireTimeBegin, expireTimeEnd, pageNum, pageSize}
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
export const CREATE_BRAND = (brandName, notifyUsers, notifyWay) => {
  return axios({
    url: action.CREATE_BRAND,
    method: 'POST',
    data: {brandName, notifyUsers, notifyWay}
  })
}
export const UPDATE_BRAND = (id, brandName, notifyUsers, notifyWay) => {
  return axios({
    url: action.UPDATE_BRAND,
    method: 'POST',
    data: {id, brandName, notifyUsers, notifyWay}
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
