'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/domain'

// 域名管理列表
export const DOMAIN_LIST = (pageNum, pageSize, domainName, domainSuffixs, otherSuffix, allSuffix, groupIds, serviceState, createDay, expireDay, createTimeBegin, createTimeEnd, expireTimeBegin, expireTimeEnd, orderExpireDate, depositFlag) => {
  return axios({
    url: action.DOMAIN_LIST,
    method: 'get',
    data: {pageNum, pageSize, domainName, domainSuffixs, otherSuffix, allSuffix, groupIds, serviceState, createDay, expireDay, createTimeBegin, createTimeEnd, expireTimeBegin, expireTimeEnd, orderExpireDate, depositFlag}
  })
}
// 域名管理-详情管理
export const DOMAIN_MANAGE = (domainId) => {
  return axios({
    url: action.DOMAIN_MANAGE,
    method: 'get',
    data: {domainId}
  })
}
// 域名管理-设置域名分组
export const SET_DOMAIN_GROUP = (groupId, domainIds) => {
  return axios({
    url: action.SET_DOMAIN_GROUP,
    method: 'get',
    data: {groupId, domainIds}
  })
}
// 域名管理-修改所有人信息
export const MOD_DOMAIN_REG_USER = (domainId, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, userSureNameUk, userNameUk, streetUk) => {
  return axios({
    url: action.MOD_DOMAIN_REG_USER,
    method: 'get',
    data: {domainId, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, userSureNameUk, userNameUk, streetUk}
  })
}
// 域名管理-修改管理人信息
export const MOD_DOMAIN_ADM_USER = (domainId, organizeNameCn, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, organizeNameUk, userSureNameUk, userNameUk, streetUk) => {
  return axios({
    url: action.MOD_DOMAIN_ADM_USER,
    method: 'get',
    data: {domainId, organizeNameCn, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, organizeNameUk, userSureNameUk, userNameUk, streetUk}
  })
}
// 域名管理-设置域名DNS
export const SET_DOMAIN_DNS = (domainId, xinnet, verificationCode, dns) => {
  return axios({
    url: action.SET_DOMAIN_DNS,
    method: 'get',
    data: {domainId, xinnet, verificationCode, dns}
  })
}
// 域名管理-续费
export const DOMAIN_RENEW = () => {
  return axios({
    url: action.DOMAIN_RENEW,
    method: 'get',
    data: {}
  })
}
// 域名管理-导出管理列表
export const EXPORT_DOMAIN = () => {
  return axios({
    url: action.EXPORT_DOMAIN,
    method: 'get',
    data: {}
  })
}
// 域名管理-删除托管域名
export const DELETE_DEPOSIT_DOMAIN = (domainIds) => {
  return axios({
    url: action.DELETE_DEPOSIT_DOMAIN,
    method: 'get',
    data: {domainIds}
  })
}
// 域名管理-设置域名品牌
export const SET_DOMAIN_BRAND = (domainIds, brandId) => {
  return axios({
    url: action.SET_DOMAIN_BRAND,
    method: 'get',
    data: {domainIds, brandId}
  })
}
// 域名管理-刷新托管域名
export const SYNC_DEPOSIT_DOMAIN = (domainId) => {
  return axios({
    url: action.SYNC_DEPOSIT_DOMAIN,
    method: 'get',
    data: {domainId}
  })
}
// 域名管理-修改托管域名
export const UPDATE_DEPOSIT_DOMAIN = (domainId, registrarName, applyDate, expireDate, regUserName, regUserEmail) => {
  return axios({
    url: action.UPDATE_DEPOSIT_DOMAIN,
    method: 'get',
    data: {domainId, registrarName, applyDate, expireDate, regUserName, regUserEmail}
  })
}
// 域名管理-修改托管域名
export const CREATE_DEPOSIT_DOMAIN = (domainNames, companyId, groupId, brandId) => {
  return axios({
    url: action.CREATE_DEPOSIT_DOMAIN,
    method: 'get',
    data: {domainNames, companyId, groupId, brandId}
  })
}
