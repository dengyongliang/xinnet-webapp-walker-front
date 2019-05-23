'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 域名管理列表
export const DOMAIN_LIST = '/client/domain/domainList' + suffix // QUERY_DOMAIN_LIST
// 域名管理-详情管理
export const DOMAIN_MANAGE = '/client/domain/domainManage' + suffix // QUERY_DOMAIN_MANAGE_DETAIL
// 域名管理-设置域名分组
export const SET_DOMAIN_GROUP = '/client/domain/setDomainGroup' + suffix
// 域名管理-修改所有人信息
export const MOD_DOMAIN_REG_USER = '/client/domain/modDomainRegUser' + suffix // SUBMIT_MOD_DOMAIN_REG_USER
// 域名管理-修改管理人信息
export const MOD_DOMAIN_ADM_USER = '/client/domain/modDomainAdmUser' + suffix // SUBMIT_MOD_DOMAIN_ADM_USER
// 域名管理-设置域名DNS
export const SET_DOMAIN_DNS = '/client/domain/setDomainDns' + suffix
// 域名管理-续费
export const DOMAIN_RENEW = '/client/domain/renew' + suffix // ORDER_PAY_DOMAIN_RENEW
// 域名管理-导出管理列表
export const EXPORT_DOMAIN = '/client-api/client/domain/exportDomain' + suffix // EXPORT_DOMAIN_LIST
