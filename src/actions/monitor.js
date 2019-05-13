'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 监控通知管理列表
export const MAIL_MANAGE = '/client/monitor/mailManage' + suffix // QUERY_MAIL_MANAGE
// 监控通知通知标记已读
export const MAIL_RECORD_READ = '/client/monitor/mailRecordRead' + suffix // SET_MAIL_RECORD_READ
// 监控通知通知设置(新增或更新)
export const NOTIFY_SET = '/client/monitor/notifySet' + suffix // SET_NOTIFY
// 监控通知通知设置详情
export const NOTIFY_SET_DETAIL = '/client/monitor/notifySetDetail' + suffix // QUERY_NOTIFY_DETAIL
// 域名监控日志管理列表
export const DOMAIN_MONITOR_MANAGE = '/client/monitor/domainMonitorManage' + suffix // QUERY_DOMAIN_MONITOR_MANAGE
// 员工监控日志管理列表
export const USER_MONITOR_MANAGE = '/client/monitor/userMonitorManage' + suffix // QUERY_USER_MONITOR_MANAGE
// 域名监控日志导出
export const EXPORT_MONITOR_LOG = '/client/monitor/exportDomainLog' + suffix // EXPORT_MONITOR_DOMAIN_LOG
// 员工监控日志导出
export const EXPORT_USER_LOG = '/client/monitor/exportUserLog' + suffix // EXPORT_MONITOR_USER_LOG
// 自有域名监控-监控通知管理列表
export const MAIL_MANAGE_TOP = '/client/monitor/mailManageTop' + suffix // QUERY_MAIL_MANAGE_TOP
// 自有域名监控-域名监控列表
export const DOMAIN_MONITOR = '/client/monitor/domainMonitor' + suffix // QUERY_DOMAIN_MONITOR
// 自有域名监控-域名监控详情(域名信息)
export const DOMAIN_MONITOR_DETAIL = '/client/monitor/domainMonitorDetail' + suffix // QUERY_DOMAIN_MONITOR_DETAIL
// 自有域名监控-域名监控详情(域名监控日志)
export const DOMAIN_MONITOR_LOG = '/client/monitor/domainMonitorLog' + suffix // QUERY_DOMAIN_MONITOR_LOG
// 自有域名监控-域名监控详情(域名监控日志导出)
export const EXPORT_DOMAIN_LOG = '/client/monitor/exportDomainLog' + suffix // EXPORT_DOMAIN_LOG
