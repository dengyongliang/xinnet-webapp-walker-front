'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/workOrder'

// 工单管理
export const WORK_ORDER_MANAGE = (pageNum, pageSize) => {
  return axios({
    url: action.WORK_ORDER_MANAGE,
    method: 'GET',
    data: {pageNum, pageSize}
  })
}
// 工单提交
export const WORK_ORDER_SUBMIT = (money, securityType, orderCode, updateType, questionType, domainName, description) => {
  return axios({
    url: action.WORK_ORDER_SUBMIT,
    method: 'GET',
    data: {money, securityType, orderCode, updateType, questionType, domainName, description}
  })
}
// 工单详情
export const WORK_ORDER_DETAIL = (id) => {
  return axios({
    url: action.WORK_ORDER_DETAIL,
    method: 'GET',
    data: {id}
  })
}
