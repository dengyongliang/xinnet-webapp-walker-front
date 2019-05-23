'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 创建企业
export const COMPANY_CREATE = '/client/company/companyCreate' + suffix // CREATE_COMPANY
// 企业详情
export const COMPANY_INFO = '/client/company/companyInfo' + suffix // QUERY_COMPANY_INFO
// 上传LOGO
export const UPLOAD_LOGO = '/client-api/client/company/uploadlogo' + suffix // UPLOAD_COMPANY_LOGO
// 创建分组
export const GROUP_CREATE = '/client/company/groupCreate' + suffix // CREATE_GROUP
// 修改分组
export const GROUP_UPDATE = '/client/company/groupUpdate' + suffix // UPDATE_GROUP
// 删除分组
export const GROUP_DELETE = '/client/company/groupDelete' + suffix // DELETE_GROUP
// 修改企业
export const COMPANY_UPDATE = '/client/company/companyUpdate' + suffix // UPDATE_COMPANY
// 修改企业
export const COMPANY_DELETE = '/client/company/companyDelete' + suffix // DELETE_COMPANY
// 企业列表
export const COMPANY_LIST = '/client/company/companyList' + suffix // QUERY_COMPANY_LIST
