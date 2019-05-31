'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/report'

// 自有监控报告数量预览
export const DOMAIN_MONITOR_CHANGE_REPORT = (cycleTime) => {
  return axios({
    url: action.DOMAIN_MONITOR_CHANGE_REPORT,
    method: 'POST',
    data: {cycleTime}
  })
}
// 自有监控报告域名安全
export const DOMAIN_MONITOR_SAFE_REPORT = () => {
  return axios({
    url: action.DOMAIN_MONITOR_SAFE_REPORT,
    method: 'POST',
    data: {}
  })
}
// 自有监控报告到期时间
export const DOMAIN_MONITOR_EXPIRE_REPORT = () => {
  return axios({
    url: action.DOMAIN_MONITOR_EXPIRE_REPORT,
    method: 'POST',
    data: {}
  })
}
// 域名资产报告(资产概况)
export const DOMAIN_ASSETS_VIEW_REPORT = () => {
  return axios({
    url: action.DOMAIN_ASSETS_VIEW_REPORT,
    method: 'POST',
    data: {}
  })
}
// 域名资产报告(域名所属公司柱状图)
export const DOMAIN_COMPANY_VIEW_REPORT = () => {
  return axios({
    url: action.DOMAIN_COMPANY_VIEW_REPORT,
    method: 'POST',
    data: {}
  })
}
// 域名资产报告(域名后缀分布柱状图)
export const DOMAIN_SUFFIX_VIEW_REPORT = () => {
  return axios({
    url: action.DOMAIN_SUFFIX_VIEW_REPORT,
    method: 'POST',
    data: {}
  })
}
// 域名资产报告(域名安全保护一般保护概览柱状图)
export const DOMAIN_SAFE_NORMAL_REPORT = () => {
  return axios({
    url: action.DOMAIN_SAFE_NORMAL_REPORT,
    method: 'POST',
    data: {}
  })
}
// 域名资产报告(域名安全保护重要保护概览柱状图)
export const DOMAIN_SAFE_IMPORTANT_REPORT = () => {
  return axios({
    url: action.DOMAIN_SAFE_IMPORTANT_REPORT,
    method: 'POST',
    data: {}
  })
}
// 域名资产报告(域名安全保护统计)
export const DOMAIN_SAFE_RATE_REPORT = () => {
  return axios({
    url: action.DOMAIN_SAFE_RATE_REPORT,
    method: 'POST',
    data: {}
  })
}
// 域名预算报告总览
export const DOMAIN_BUDGET_REPORT = (reportId) => {
  return axios({
    url: action.DOMAIN_BUDGET_REPORT,
    method: 'POST',
    data: {reportId}
  })
}
// 域名预算报告-域名回购
export const DOMAIN_REPURCHASE_REPORT = (reportId, pageNum, pageSize) => {
  return axios({
    url: action.DOMAIN_REPURCHASE_REPORT,
    method: 'POST',
    data: {reportId, pageNum, pageSize}
  })
}
// 域名预算报告-域名续费及域名安全保护
export const DOMAIN_RENEW_AND_SAFE_REPORT = (reportId) => {
  return axios({
    url: action.DOMAIN_RENEW_AND_SAFE_REPORT,
    method: 'POST',
    data: {reportId}
  })
}
// 域名预算报告-域名注册
export const DOMAIN_REGISTER_REPORT = (reportId) => {
  return axios({
    url: action.DOMAIN_REGISTER_REPORT,
    method: 'POST',
    data: {reportId}
  })
}
// 域名预算报告列表
export const DOMAIN_BUDGET_REPORT_LIST = (pageNum, pageSize) => {
  return axios({
    url: action.DOMAIN_BUDGET_REPORT_LIST,
    method: 'POST',
    data: {pageNum, pageSize}
  })
}
// 域名消费报告-域名消费列表
export const DOMAIN_CONSUMPTION_REPORT_LIST = (pageNum, pageSize) => {
  return axios({
    url: action.DOMAIN_CONSUMPTION_REPORT_LIST,
    method: 'POST',
    data: {pageNum, pageSize}
  })
}
// 域名消费报告-域名消费明细列表
export const DOMAIN_CONSUMPTION_DETAIL_REPORT = (customerId, backCycleStart, backCycleEnd) => {
  return axios({
    url: action.DOMAIN_CONSUMPTION_DETAIL_REPORT,
    method: 'POST',
    data: {customerId, backCycleStart, backCycleEnd}
  })
}
// 域名消费报告-域名消费报告总览
export const DOMAIN_CONSUMPTION_REPORT = (customerId, backCycleStart, backCycleEnd) => {
  return axios({
    url: action.DOMAIN_CONSUMPTION_REPORT,
    method: 'POST',
    data: {customerId, backCycleStart, backCycleEnd}
  })
}
// 域名消费报告-域名每月消费类别及金额
export const DOMAIN_CONSUMPTION_SORT_REPORT = (customerId, backCycleStart, backCycleEnd) => {
  return axios({
    url: action.DOMAIN_CONSUMPTION_SORT_REPORT,
    method: 'POST',
    data: {customerId, backCycleStart, backCycleEnd}
  })
}
// 域名消费报告-域名企业消费类别柱状图
export const DOMAIN_CONSUMPTION_COMPANY_SORT_REPORT = (customerId, backCycleStart, backCycleEnd) => {
  return axios({
    url: action.DOMAIN_CONSUMPTION_COMPANY_SORT_REPORT,
    method: 'POST',
    data: {customerId, backCycleStart, backCycleEnd}
  })
}
// 域名消费报告-域名企业消费月份柱状图
export const DOMAIN_CONSUMPTION_COMPANY_MONTH_REPORT = (customerId, backCycleStart, backCycleEnd) => {
  return axios({
    url: action.DOMAIN_CONSUMPTION_COMPANY_MONTH_REPORT,
    method: 'POST',
    data: {customerId, backCycleStart, backCycleEnd}
  })
}
// 域名消费报告-域名企业消费总览
export const DOMAIN_CONSUMPTION_COMPANY_REPORT = (customerId, backCycleStart, backCycleEnd) => {
  return axios({
    url: action.DOMAIN_CONSUMPTION_COMPANY_REPORT,
    method: 'POST',
    data: {customerId, backCycleStart, backCycleEnd}
  })
}
