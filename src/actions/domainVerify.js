'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 域名实名制列表
export const DOMAIN_VERIFY_LIST = '/client/domainVerify/domainVerifyList' + suffix // QUERY_DOMAIN_VERIFY_LIST
// 提交域名实名资料
export const UPLOAD_DOMAIN_VERIFY = '/client/domainVerify/uploadDomainVerify' + suffix // SUBMIT_DOMAIN_VERIFY
// 上传域名实名资料
export const UPLOAD_FILE = '/client/domainVerify/uploadfile' + suffix // UPLOAD_FILE_DOMAIN_VERIFY
// 更新域名审核状态
export const UPDATE_DOMAIN_AUDIT_STATUS = '/client/domainVerify/updateDomainAuditStatus' + suffix
