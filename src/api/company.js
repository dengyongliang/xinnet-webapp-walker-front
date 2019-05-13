'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/company'
// 创建企业
export const COMPANY_CREATE = (logoFile, name, contactor, mobile, email, tel) => {
  return axios({
    url: action.COMPANY_CREATE,
    method: 'GET',
    data: {logoFile, name, contactor, mobile, email, tel}
  })
}
// 企业详情
export const COMPANY_INFO = (companyId) => {
  return axios({
    url: action.COMPANY_INFO,
    method: 'GET',
    data: {companyId}
  })
}
// 上传LOGO
export const UPLOAD_LOGO = () => {
  return axios({
    url: action.UPLOAD_LOGO,
    method: 'GET',
    data: {}
  })
}
// 创建分组
export const GROUP_CREATE = (companyId, manageId, name) => {
  return axios({
    url: action.GROUP_CREATE,
    method: 'GET',
    data: {companyId, manageId, name}
  })
}
// 修改分组
export const GROUP_UPDATE = (manageId, groupId, name) => {
  return axios({
    url: action.GROUP_UPDATE,
    method: 'GET',
    data: {manageId, groupId, name}
  })
}
// 删除分组
export const GROUP_DELETE = (groupId) => {
  return axios({
    url: action.GROUP_DELETE,
    method: 'GET',
    data: {groupId}
  })
}
// 修改企业
export const COMPANY_UPDATE = (companyId, logoFile, name, contactor, mobile, email, tel) => {
  return axios({
    url: action.COMPANY_UPDATE,
    method: 'GET',
    data: {companyId, logoFile, name, contactor, mobile, email, tel}
  })
}
// 修改企业
export const COMPANY_DELETE = (companyId) => {
  return axios({
    url: action.COMPANY_DELETE,
    method: 'GET',
    data: {companyId}
  })
}
// 企业列表
export const COMPANY_LIST = (companyName) => {
  return axios({
    url: action.COMPANY_LIST,
    method: 'GET',
    data: {companyName}
  })
}
