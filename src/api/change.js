'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/change'
// 过户域名列表
export const CHANGE_LIST = (pageNum, pageSize, domainName, changeStatus, createTimeBegin, createTimeEnd) => {
  return axios({
    url: action.CHANGE_LIST,
    method: 'POST',
    data: {pageNum, pageSize, domainName, changeStatus, createTimeBegin, createTimeEnd}
  })
}
// 域名提交过户
export const SUBMIT_CHANGE = (templateId, domainNames) => {
  return axios({
    url: action.SUBMIT_CHANGE,
    method: 'POST',
    data: {templateId, domainNames}
  })
}
// 过户域名详情
export const CHANGE_INFO = (changeId) => {
  return axios({
    url: action.CHANGE_INFO,
    method: 'POST',
    data: {changeId}
  })
}
