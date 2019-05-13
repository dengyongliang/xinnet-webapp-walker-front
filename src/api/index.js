'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/index'

// 首页-企业信息
export const MY_COMPANY = () => {
  return axios({
    url: action.MY_COMPANY,
    method: 'POST',
    data: {}
  })
}
// 首页-管家信息
export const MY_KEEPER = () => {
  return axios({
    url: action.MY_KEEPER,
    method: 'POST',
    data: {}
  })
}
// 首页-域名统计
export const DOMAIN_STATISTICS = () => {
  return axios({
    url: action.DOMAIN_STATISTICS,
    method: 'POST',
    data: {}
  })
}
// 首页-企业数量
export const COMPANY_STATISTICS = () => {
  return axios({
    url: action.COMPANY_STATISTICS,
    method: 'POST',
    data: {}
  })
}
// 首页-员工数量
export const USER_STATISTICS = () => {
  return axios({
    url: action.USER_STATISTICS,
    method: 'POST',
    data: {}
  })
}
// 首页-未出账单
export const PAY_STATISTICS_UNBILLED = () => {
  return axios({
    url: action.PAY_STATISTICS_UNBILLED,
    method: 'POST',
    data: {}
  })
}
// 首页-已出账单
export const PAY_STATISTICS_HISTORY_BILL = () => {
  return axios({
    url: action.PAY_STATISTICS_HISTORY_BILL,
    method: 'POST',
    data: {}
  })
}
// 首页-账户额度统计
export const ACCOUNT_STATISTICS = () => {
  return axios({
    url: action.ACCOUNT_STATISTICS,
    method: 'POST',
    data: {}
  })
}
