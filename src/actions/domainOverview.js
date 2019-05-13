'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 域名总览-域名统计
export const DOMAIN_STATISTICS = '/client/domainOverview/domainStatistics' + suffix // OVERVIEW_DOMAIN_STATISTICS
// 域名总览-数量变化总览
export const DOMAIN_COUNT_STATISTICS = '/client/domainOverview/domainCountStatistics' + suffix // OVERVIEW_DOMAIN_COUNT_STATISTICS
// 域名总览-实名模板统计
export const TEMPLATE_STATISTICS = '/client/domainOverview/templateStatistics' + suffix // OVERVIEW_TEMPLATE_STATISTICS
// 域名总览-注册居锁统计
export const BACKEND_LOCK_STATISTICS = '/client/domainOverview/backendLockStatistics' + suffix // OVERVIEW_BACKEND_LOCK_STATISTICS
// 域名总览-实名认证统计
export const DOMAIN_VERIFY_STATISTICS = '/client/domainOverview/domainVerifyStatistics' + suffix // OVERVIEW_DOMAIN_VERIFY_STATISTICS
// 域名总览-急需续费域名统计
export const DOMAIN_RENEW_STATISTICS = '/client/domainOverview/domainRenewStatistics' + suffix // OVERVIEW_DOMAIN_RENEW_STATISTICS
// 域名总览-转入中域名统计
export const DOMAIN_TRANSFER_IN_STATISTICS = '/client/domainOverview/domainTransferInStatistics' + suffix // OVERVIEW_DOMAIN_TRANSFER_IN_STATISTICS
// 域名总览-过户中域名统计
export const DOMAIN_CHANGE_STATISTICS = '/client/domainOverview/domainChangeStatistics' + suffix // OVERVIEW_DOMAIN_CHANGE_STATISTICS
