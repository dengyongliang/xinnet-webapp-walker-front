'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/domain'

// 域名管理列表
export const DOMAIN_LIST = (pageNum, pageSize, domainName, domainSuffixs, otherSuffix, allSuffix, groupIds, serviceState, createDay, expireDay, createTimeBegin, createTimeEnd, expireTimeBegin, expireTimeEnd) => {
  return axios({
    url: action.DOMAIN_LIST,
    method: 'POST',
    data: {pageNum, pageSize, domainName, domainSuffixs, otherSuffix, allSuffix, groupIds, serviceState, createDay, expireDay, createTimeBegin, createTimeEnd, expireTimeBegin, expireTimeEnd}
  })
}
// 域名管理-详情管理
export const DOMAIN_MANAGE = (domainId) => {
  return axios({
    url: action.DOMAIN_MANAGE,
    method: 'POST',
    data: {domainId}
  })
}
// 域名管理-设置域名分组
export const SET_DOMAIN_GROUP = (groupId, domainIds) => {
  return axios({
    url: action.SET_DOMAIN_GROUP,
    method: 'POST',
    data: {groupId, domainIds}
  })
}
// 域名管理-修改所有人信息
export const MOD_DOMAIN_REG_USER = (domainId, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, userSureNameUk, userNameUk, streetUk) => {
  return axios({
    url: action.MOD_DOMAIN_REG_USER,
    method: 'POST',
    data: {domainId, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, userSureNameUk, userNameUk, streetUk}
  })
}
// 域名管理-修改管理人信息
export const MOD_DOMAIN_ADM_USER = (domainId, organizeNameCn, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, organizeNameUk, userSureNameUk, userNameUk, streetUk) => {
  return axios({
    url: action.MOD_DOMAIN_ADM_USER,
    method: 'POST',
    data: {domainId, organizeNameCn, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, organizeNameUk, userSureNameUk, userNameUk, streetUk}
  })
}
// 域名管理-设置域名DNS
export const SET_DOMAIN_DNS = (domainId, xinnet, verificationCode, dns) => {
  return axios({
    url: action.SET_DOMAIN_DNS,
    method: 'POST',
    data: {domainId, xinnet, verificationCode, dns}
  })
}
// 域名管理-续费
export const DOMAIN_RENEW = () => {
  return axios({
    url: action.DOMAIN_RENEW,
    method: 'POST',
    data: {}
  })
}
// 域名管理-导出管理列表
export const EXPORT_DOMAIN = () => {
  return axios({
    url: action.EXPORT_DOMAIN,
    method: 'POST',
    data: {}
  })
}
