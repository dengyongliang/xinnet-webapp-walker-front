'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/monitor'

// 监控通知管理列表
export const MAIL_MANAGE = (pageNum, pageSize, createTimeBegin, createTimeEnd, type) => {
  return axios({
    url: action.MAIL_MANAGE,
    method: 'post',
    data: {pageNum, pageSize, createTimeBegin, createTimeEnd, type}
  })
}
// 监控通知通知标记已读
export const MAIL_RECORD_READ = (id) => {
  return axios({
    url: action.MAIL_RECORD_READ,
    method: 'post',
    data: {id}
  })
}
// 监控通知通知设置(新增或更新)
export const NOTIFY_SET = (notifyInfo) => {
  return axios({
    url: action.NOTIFY_SET,
    method: 'post',
    data: {notifyInfo}
  })
}
// 监控通知通知设置详情
export const NOTIFY_SET_DETAIL = () => {
  return axios({
    url: action.NOTIFY_SET_DETAIL,
    method: 'post',
    data: {}
  })
}
// 域名监控日志管理列表
export const DOMAIN_MONITOR_MANAGE = (pageNum, pageSize, domainName, createTimeBegin, createTimeEnd, levelType) => {
  return axios({
    url: action.DOMAIN_MONITOR_MANAGE,
    method: 'post',
    data: {pageNum, pageSize, domainName, createTimeBegin, createTimeEnd, levelType}
  })
}
// 员工监控日志管理列表
export const USER_MONITOR_MANAGE = (pageNum, pageSize, userName, createTimeBegin, createTimeEnd, type) => {
  return axios({
    url: action.USER_MONITOR_MANAGE,
    method: 'post',
    data: {pageNum, pageSize, userName, createTimeBegin, createTimeEnd, type}
  })
}
// 域名监控日志导出
export const EXPORT_MONITOR_LOG = () => {
  return axios({
    url: action.EXPORT_MONITOR_LOG,
    method: 'post',
    data: {}
  })
}
// 员工监控日志导出
export const EXPORT_USER_LOG = () => {
  return axios({
    url: action.EXPORT_USER_LOG,
    method: 'post',
    data: {}
  })
}
// 自有域名监控-监控通知管理列表
export const MAIL_MANAGE_TOP = () => {
  return axios({
    url: action.MAIL_MANAGE_TOP,
    method: 'post',
    data: {}
  })
}
// 自有域名监控-域名监控列表
export const DOMAIN_MONITOR = (pageNum, pageSize, domainName, groupIds, serviceState, monitorLog) => {
  return axios({
    url: action.DOMAIN_MONITOR,
    method: 'post',
    data: {pageNum, pageSize, domainName, groupIds, serviceState, monitorLog}
  })
}
// 自有域名监控-域名监控详情(域名信息)
export const DOMAIN_MONITOR_DETAIL = (domainName) => {
  return axios({
    url: action.DOMAIN_MONITOR_DETAIL,
    method: 'post',
    data: {domainName}
  })
}
// 自有域名监控-域名监控详情(域名监控日志)
export const DOMAIN_MONITOR_LOG = (pageNum, pageSize, domainName, createTimeBegin, createTimeEnd, type) => {
  return axios({
    url: action.DOMAIN_MONITOR_LOG,
    method: 'post',
    data: {pageNum, pageSize, domainName, createTimeBegin, createTimeEnd, type}
  })
}
// 自有域名监控-域名监控详情(域名监控日志导出)
// export const EXPORT_DOMAIN_LOG = () => {
//   return axios({
//     url: action.EXPORT_DOMAIN_LOG,
//     method: 'post',
//     data: {}
//   })
// }
// 监控通知通知详情
export const MAIL_RECORD_DETAIL = (id) => {
  return axios({
    url: action.MAIL_RECORD_DETAIL,
    method: 'post',
    data: {id}
  })
}
