'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 财务-消费统计
export const PAY_STATISTICS = '/client/finance/payStatistics' + suffix // FINANCE_PAY_STATISTICS
// 财务-消费趋势
export const PAY_STATISTICS_TREND = '/client/finance/payStatisticsTrend' + suffix // FINANCE_PAY_STATISTICS_TREND
// 财务-账单流水
export const GET_CUSTOMER_FLOW_LIST = '/client/finance/getCustomerFlowList' + suffix // QUERY_FINANCE_CUSTOMER_FLOW_LIST
// 财务-账单流水导出
export const EXPORT_CUSTOMER_FLOW = '/client/finance/exportCustomerFlow' + suffix // EXPORT_FINANCE_CUSTOMER_FLOW_LIST
// 财务-信用额度统计
export const PAY_STATISTICS_BALANCE = '/client/finance/payStatisticsBalance' + suffix // QUERY_PAY_STATISTICS_BALANCE
// 财务-未出账单
export const PAY_STATISTICS_UNBILLED = '/client/finance/payStatisticsUnBilled' + suffix // PAY_STATISTICS_UNBILLED
// 财务-往期账单
export const PAY_STATISTICS_HISTORY_BILL = '/client/finance/payStatisticsHistoryBill' + suffix // PAY_STATISTICS_HISTORY_BILL
