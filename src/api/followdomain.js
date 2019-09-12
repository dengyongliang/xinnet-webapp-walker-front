'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/followdomain'

// 域名管理-详情管理
export const FOLLOW_DOMAIN_LIST = (domainName, siteTypes, ipTypes, isReg, brandIds, domainSuffixs, createTimeBegin, createTimeEnd, applyTimeBegin, applyTimeEnd, expireTimeBegin, expireTimeEnd, pageNum, pageSize) => {
  return axios({
    url: action.FOLLOW_DOMAIN_LIST,
    method: 'post',
    data: {domainName, siteTypes, ipTypes, isReg, brandIds, domainSuffixs, createTimeBegin, createTimeEnd, applyTimeBegin, applyTimeEnd, expireTimeBegin, expireTimeEnd, pageNum, pageSize}
  })
}
export const FOLLOW_DOMAIN_INFO = (id) => {
  return axios({
    url: action.FOLLOW_DOMAIN_INFO,
    method: 'post',
    data: {id}
  })
}
export const FOLLOW_RECORD_LIST = (domainId, pageNum, pageSize, createDateBegin, createDateEnd, recordType) => {
  return axios({
    url: action.FOLLOW_RECORD_LIST,
    method: 'post',
    data: {domainId, pageNum, pageSize, createDateBegin, createDateEnd, recordType}
  })
}
export const FOLLOW_BRAND_LIST = (pageNum, pageSize) => {
  return axios({
    url: action.FOLLOW_BRAND_LIST,
    method: 'post',
    data: {pageNum, pageSize}
  })
}
export const REPORT_FOLLOW_RECORD = (reportType, brandId) => {
  return axios({
    url: action.REPORT_FOLLOW_RECORD,
    method: 'post',
    data: {reportType, brandId}
  })
}
export const EXCEP_FOLLOW_RECORD_LIST = (pageNum, pageSize, brandId) => {
  return axios({
    url: action.EXCEP_FOLLOW_RECORD_LIST,
    method: 'post',
    data: {pageNum, pageSize, brandId}
  })
}
export const CREATE_BRAND = (brandName, notifyUsers, notifyWay) => {
  return axios({
    url: action.CREATE_BRAND,
    method: 'post',
    data: {brandName, notifyUsers, notifyWay}
  })
}
export const UPDATE_BRAND = (id, brandName, notifyUsers, notifyWay) => {
  return axios({
    url: action.UPDATE_BRAND,
    method: 'post',
    data: {id, brandName, notifyUsers, notifyWay}
  })
}
export const DELETE_BRAND = (id) => {
  return axios({
    url: action.DELETE_BRAND,
    method: 'post',
    data: {id}
  })
}
export const CREATE_DOMAIN = (brandId, domainNames) => {
  return axios({
    url: action.CREATE_DOMAIN,
    method: 'post',
    data: {brandId, domainNames}
  })
}
export const DELETE_DOMAIN = (id) => {
  return axios({
    url: action.DELETE_DOMAIN,
    method: 'post',
    data: {id}
  })
}
