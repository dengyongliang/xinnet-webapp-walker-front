'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 域名安全服务列表
export const DOMAIN_SAFE_LIST = '/client/domainSafe/domainSafeList' + suffix // QUERY_DOMAIN_SAFE_LIST
// 设置域名保护级别
export const SET_PROTECT_LEVEL = '/client/domainSafe/setProtectLevel' + suffix
// 设置域名自动续费
export const SET_AUTO_RENEW = '/client/domainSafe/setAutoRenew' + suffix
// 设置域名禁止更新
export const SET_PROHIBIT_UPDATE = '/client/domainSafe/setProhibitUpdate' + suffix
// 购买域名注册局锁定
export const BUY_BACKEND_LOCK = '/client/domainSafe/buyBackendLock' + suffix
// 续费域名注册局锁定
export const RENEW_BACKEND_LOCK = '/client/domainSafe/renewBackendLock' + suffix
