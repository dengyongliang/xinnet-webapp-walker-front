'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/finance'

// 财务-消费统计
export const PAY_STATISTICS = (startTime, endTime) => {
  return axios({
    url: action.PAY_STATISTICS,
    method: 'POST',
    data: {startTime, endTime}
  })
}
// 财务-消费趋势
export const PAY_STATISTICS_TREND = (startTime, endTime) => {
  return axios({
    url: action.PAY_STATISTICS_TREND,
    method: 'POST',
    data: {startTime, endTime}
  })
}
// 财务-账单流水
export const GET_CUSTOMER_FLOW_LIST = (pageNum, pageSize, createTimeBegin, createTimeEnd, flowCode, payType) => {
  return axios({
    url: action.GET_CUSTOMER_FLOW_LIST,
    method: 'POST',
    data: {pageNum, pageSize, createTimeBegin, createTimeEnd, flowCode, payType}
  })
}
// 财务-账单流水导出
export const EXPORT_CUSTOMER_FLOW = () => {
  return axios({
    url: action.EXPORT_CUSTOMER_FLOW,
    method: 'POST',
    data: {}
  })
}
// 财务-信用额度统计
export const PAY_STATISTICS_BALANCE = () => {
  return axios({
    url: action.PAY_STATISTICS_BALANCE,
    method: 'GET',
    data: {}
  })
}
// 财务-未出账单
export const PAY_STATISTICS_UNBILLED = () => {
  return axios({
    url: action.PAY_STATISTICS_UNBILLED,
    method: 'GET',
    data: {}
  })
}
// 财务-往期账单
export const PAY_STATISTICS_HISTORY_BILL = (historyCycle) => {
  return axios({
    url: action.PAY_STATISTICS_HISTORY_BILL,
    method: 'POST',
    data: {historyCycle}
  })
}
