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