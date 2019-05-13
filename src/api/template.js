'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/template'

// 模板列表
export const TEMPLATE_LIST = (pageNum, pageSize, templateName, verifyStatus) => {
  return axios({
    url: action.TEMPLATE_LIST,
    method: 'GET',
    data: {pageNum, pageSize, templateName, verifyStatus}
  })
}
// 创建模板
export const CREATE_TEMPLATE = (templateName, organizeNameCn, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, organizeNameUk, userSureNameUk, userNameUk, streetUk) => {
  return axios({
    url: action.CREATE_TEMPLATE,
    method: 'POST',
    data: {templateName, organizeNameCn, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, organizeNameUk, userSureNameUk, userNameUk, streetUk}
  })
}
// 上传模板资料
export const UPLOAD_FILE = () => {
  return axios({
    url: action.UPLOAD_FILE,
    method: 'POST',
    data: {}
  })
}
// 提交模板资料
export const TEMPLATE_VERIFY = (userCode, registrantType, idCode, idFileUrl, idFileName, idType) => {
  return axios({
    url: action.TEMPLATE_VERIFY,
    method: 'POST',
    data: {userCode, registrantType, idCode, idFileUrl, idFileName, idType}
  })
}
// 删除模板
export const DELETE_TEMPLATE = (templateId) => {
  return axios({
    url: action.DELETE_TEMPLATE,
    method: 'GET',
    data: {templateId}
  })
}
// 修改模板
export const UPDATE_TEMPLATE = (userCode, templateName, organizeNameCn, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, organizeNameUk, userSureNameUk, userNameUk, streetUk) => {
  return axios({
    url: action.UPDATE_TEMPLATE,
    method: 'POST',
    data: {userCode, templateName, organizeNameCn, userNameCn, countryCode, cityCode, streetCn, zipCode, email, phoneInter, phoneArea, phoneNumber, faxInter, faxArea, faxNumber, organizeNameUk, userSureNameUk, userNameUk, streetUk}
  })
}
// 模板详情
export const TEMPLATE_INFO = (templateId) => {
  return axios({
    url: action.TEMPLATE_INFO,
    method: 'GET',
    data: {templateId}
  })
}
// 资料详情
export const TEMPLATE_VERIFY_INFO = (templateId) => {
  return axios({
    url: action.TEMPLATE_VERIFY_INFO,
    method: 'GET',
    data: {templateId}
  })
}
// 客户可用模板列表
export const TEMPLATES = () => {
  return axios({
    url: action.TEMPLATES,
    method: 'GET',
    data: {}
  })
}
