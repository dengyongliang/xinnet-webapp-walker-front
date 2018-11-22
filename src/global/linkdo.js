'use strict'
const api = process.env.NODE_ENV === 'production' ? '' : '/api'
// 管家管理的客户列表
export const QUERY_USER_CUSTOMERS_LIST = api + '/client-api/client/user/userCustomers'
// 激活-step1
export const CHECK_VALID_USER = api + '/client-api/account/user/validUser'
// 激活验证码
export const ACTIVATION_VERIFICATIONCODE = api + '/client-api/server/message/send/activationCode'
// 激活账号-基本信息
export const SUBMIT_ACTIVATION_USER_INFO = api + '/client-api/account/user/activationUserInfo'
// 激活账号-密码
export const SUBMIT_ACTIVATION_USER_PWD = api + '/client-api/account/user/activationUserPwd'
// 登出
export const LOGIN_OUT = api + '/client-api/user/logout'
// 登录
export const LOGIN_SUBMIT = api + '/client-api/user/login'
// 登录_获取验证码
export const LOGIN_VERIFICATIONCODE = api + '/client-api/server/message/send/clientLogin'
// 获取当前账号信息
export const GET_CURRENT_USER_DATA = api + '/client-api/client/user/myUserInfo'
// 财务-消费统计
export const FINANCE_PAY_STATISTICS = api + '/client-api/client/finance/payStatistics'
// 财务-消费趋势
export const FINANCE_PAY_STATISTICS_TREND = api + '/client-api/client/finance/payStatisticsTrend'
// 财务-账单流水
export const QUERY_FINANCE_CUSTOMER_FLOW_LIST = api + '/client-api/client/finance/getCustomerFlowList'
// 财务-账单流水导出
export const EXPORT_FINANCE_CUSTOMER_FLOW_LIST = api + '/client-api/client/finance/exportCustomerFlow'
// 财务-信用额度统计
export const QUERY_PAY_STATISTICS_BALANCE = api + '/client-api/client/finance/payStatisticsBalance'
// 财务-未出账单
export const PAY_STATISTICS_UNBILLED = api + '/client-api/client/finance/payStatisticsUnBilled'
// 财务-往期账单
export const PAY_STATISTICS_HISTORY_BILL = api + '/client-api/client/finance/payStatisticsHistoryBill'
// 管家切换管理的客户
export const CHANGE_CUSTOMERS = api + '/client-api/account/user/changeCustomers'

