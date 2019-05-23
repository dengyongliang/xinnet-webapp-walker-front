'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 模板列表
export const TEMPLATE_LIST = '/client/template/templateList' + suffix // QUERY_TEMPLATE_LIST
// 创建模板
export const CREATE_TEMPLATE = '/client/template/createTemplate' + suffix
// 上传模板资料
export const UPLOAD_FILE = '/client-api/client/template/uploadfile' + suffix
// 提交模板资料
export const TEMPLATE_VERIFY = '/client/template/templateVerify' + suffix // SUBMIT_TEMPLATE
// 删除模板
export const DELETE_TEMPLATE = '/client/template/deleteTemplate' + suffix
// 修改模板
export const UPDATE_TEMPLATE = '/client/template/updateTemplate' + suffix
// 模板详情
export const TEMPLATE_INFO = '/client/template/templateInfo' + suffix // QUERY_TEMPLATE_INFO
// 资料详情
export const TEMPLATE_VERIFY_INFO = '/client/template/verifyInfo' + suffix // QUERY_VERIFY_INFO
// 客户可用模板列表
export const TEMPLATES = '/client/template/templates' + suffix // QUERY_TEMPLATES
