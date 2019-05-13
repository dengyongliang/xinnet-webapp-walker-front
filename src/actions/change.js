'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 过户域名列表
export const CHANGE_LIST = '/client/change/changeList' + suffix // QUERY_CHANGE_LIST
// 域名提交过户
export const SUBMIT_CHANGE = '/client/change/submitChange' + suffix
// 过户域名详情
export const CHANGE_INFO = '/client/change/changeInfo' + suffix // QUERY_CHANGE_INFO
