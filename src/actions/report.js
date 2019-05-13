'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 自有监控报告数量预览
export const DOMAIN_MONITOR_CHANGE_REPORT = '/client/report/domainMonitorChangeReport' + suffix // QUERY_DOMAIN_MONITOR_CHANGE_REPORT
// 自有监控报告域名安全
export const DOMAIN_MONITOR_SAFE_REPORT = '/client/report/domainMonitorSafeReport' + suffix // QUERY_DOMAIN_MONITOR_SAFE_REPORT
// 自有监控报告到期时间
export const DOMAIN_MONITOR_EXPIRE_REPORT = '/client/report/domainMonitorExpireReport' + suffix // QUERY_DOMAIN_MONITOR_EXPIRE_REPORT
// 域名资产报告(资产概况)
export const DOMAIN_ASSETS_VIEW_REPORT = '/client/report/domainAssetsViewReport' + suffix // QUERY_DOMAIN_ASSETS_VIEW_REPORT
// 域名资产报告(域名所属公司柱状图)
export const DOMAIN_COMPANY_VIEW_REPORT = '/client/report/domainCompanyViewReport' + suffix // QUERY_DOMAIN_COMPANY_VIEW_REPORT
// 域名资产报告(域名后缀分布柱状图)
export const DOMAIN_SUFFIX_VIEW_REPORT = '/client/report/domainSuffixViewReport' + suffix // QUERY_DOMAIN_SUFFIX_VIEW_REPORT
// 域名资产报告(域名安全保护一般保护概览柱状图)
export const DOMAIN_SAFE_NORMAL_REPORT = '/client/report/domainSafeNormalReport' + suffix // QUERY_DOMAIN_SAFE_NORMAL_REPORT
// 域名资产报告(域名安全保护重要保护概览柱状图)
export const DOMAIN_SAFE_IMPORTANT_REPORT = '/client/report/domainSafeImportantReport' + suffix // QUERY_DOMAIN_SAFE_IMPORTANT_REPORT
// 域名资产报告(域名安全保护统计)
export const DOMAIN_SAFE_RATE_REPORT = '/client/report/domainSafeRateReport' + suffix // QUERY_DOMAIN_SAFE_RATE_REPORT
// 域名预算报告总览
export const DOMAIN_BUDGET_REPORT = '/client/report/domainBudgetReport' + suffix // QUERY_DOMAIN_BUDGET_REPORT
// 域名预算报告-域名回购
export const DOMAIN_REPURCHASE_REPORT = '/client/report/domainRepurchaseReport' + suffix // QUERY_DOMAIN_REPURCHASE_REPORT
// 域名预算报告-域名续费及域名安全保护
export const DOMAIN_RENEW_AND_SAFE_REPORT = '/client/report/domainRenewAndSafeReport' + suffix // QUERY_DOMAIN_RENEW_AND_SAFE_REPORT
// 域名预算报告-域名注册
export const DOMAIN_REGISTER_REPORT = '/client/report/domainRegisterReport' + suffix // QUERY_DOMAIN_REGISTER_REPORT
// 域名预算报告列表
export const DOMAIN_BUDGET_REPORT_LIST = '/client/report/domainBudgetReportList' + suffix // QUERY_DOMAIN_BUDGET_REPORT_LIST
// 域名消费报告-域名消费列表
export const DOMAIN_CONSUMPTION_REPORT_LIST = '/client/report/domainConsumptionReportList' + suffix // QUERY_DOMAIN_CONSUMPTION_REPORT_LIST
// 域名消费报告-域名消费明细列表
export const DOMAIN_CONSUMPTION_DETAIL_REPORT = '/client/report/domainConsumptionDetailReport' + suffix // QUERY_DOMAIN_CONSUMPTION_DETAIL_REPORT
// 域名消费报告-域名消费报告总览
export const DOMAIN_CONSUMPTION_REPORT = '/client/report/domainConsumptionReport' + suffix // QUERY_DOMAIN_CONSUMPTION_REPORT
// 域名消费报告-域名每月消费类别及金额
export const DOMAIN_CONSUMPTION_SORT_REPORT = '/client/report/domainConsumptionSortReport' + suffix // QUERY_DOMAIN_CONSUMPTION_SORT_REPORT
// 域名消费报告-域名企业消费类别柱状图
export const DOMAIN_CONSUMPTION_COMPANY_SORT_REPORT = '/client/report/domainConsumptionCompanySortReport' + suffix // QUERY_DOMAIN_CONSUMPTION_COMPANY_SORT_REPORT
// 域名消费报告-域名企业消费月份柱状图
export const DOMAIN_CONSUMPTION_COMPANY_MONTH_REPORT = '/client/report/domainConsumptionCompanyMonthReport' + suffix // QUERY_DOMAIN_CONSUMPTION_COMPANY_MONTH_REPORT
// 域名消费报告-域名企业消费总览
export const DOMAIN_CONSUMPTION_COMPANY_REPORT = '/client/report/domainConsumptionCompanyReport' + suffix // QUERY_DOMAIN_CONSUMPTION_COMPANY_REPORT
