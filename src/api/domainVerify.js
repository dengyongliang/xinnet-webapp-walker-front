'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/domainVerify'

// 域名实名制列表
export const DOMAIN_VERIFY_LIST = (pageNum, pageSize, domainName, groupIds, serviceState, rnvcStatus, dnvcStatus, verifyDay, verifyTimeBegin, verifyTimeEnd) => {
  return axios({
    url: action.DOMAIN_VERIFY_LIST,
    method: 'GET',
    data: {pageNum, pageSize, domainName, groupIds, serviceState, rnvcStatus, dnvcStatus, verifyDay, verifyTimeBegin, verifyTimeEnd}
  })
}
// 提交域名实名资料
export const UPLOAD_DOMAIN_VERIFY = (domainIds, registrantType, idCode, idType, idFileUrl, idFileName, templateId) => {
  return axios({
    url: action.UPLOAD_DOMAIN_VERIFY,
    method: 'POST',
    data: {domainIds, registrantType, idCode, idType, idFileUrl, idFileName, templateId}
  })
}
// 上传域名实名资料
export const UPLOAD_FILE = () => {
  return axios({
    url: action.UPLOAD_FILE,
    method: 'POST',
    data: {}
  })
}
// 更新域名审核状态
export const UPDATE_DOMAIN_AUDIT_STATUS = (domainIds) => {
  return axios({
    url: action.UPDATE_DOMAIN_AUDIT_STATUS,
    method: 'GET',
    data: {domainIds}
  })
}
