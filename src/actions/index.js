'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 首页-企业信息
export const MY_COMPANY = '/client/index/myCompany' + suffix // INDEX_MY_COMPANY
// 首页-管家信息
export const MY_KEEPER = '/client/index/myKeeper' + suffix // INDEX_MY_KEEPER
// 首页-域名统计
export const DOMAIN_STATISTICS = '/client/index/domainStatistics' + suffix // INDEX_DOMAIN_STATISTICS
// 首页-企业数量
export const COMPANY_STATISTICS = '/client/index/companyStatistics' + suffix // INDEX_COMPANY_STATISTICS
// 首页-员工数量
export const USER_STATISTICS = '/client/index/userStatistics' + suffix // INDEX_USER_STATISTICS
// 首页-未出账单
export const PAY_STATISTICS_UNBILLED = '/client/index/payStatisticsUnBilled' + suffix // INDEX_PAY_STATISTICS_UNBILLED
// 首页-已出账单
export const PAY_STATISTICS_HISTORY_BILL = '/client/index/payStatisticsHistoryBill' + suffix // INDEX_PAY_STATISTICS_HISTORY_BILL
// 首页-账户额度统计
export const ACCOUNT_STATISTICS = '/client/index/accountStatistics' + suffix // INDEX_ACCOUNT_STATISTICS
