'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/transferin'

// 转入域名列表
export const TRANSFER_IN_LIST = (pageNum, pageSize, domainName, transferStatus, createTimeBegin, createTimeEnd) => {
  return axios({
    url: action.TRANSFER_IN_LIST,
    method: 'GET',
    data: {pageNum, pageSize, domainName, transferStatus, createTimeBegin, createTimeEnd}
  })
}
// 域名提交转入
export const SUBMIT_TRANSFER_IN = () => {
  return axios({
    url: action.SUBMIT_TRANSFER_IN,
    method: 'POST',
    data: {}
  })
}
