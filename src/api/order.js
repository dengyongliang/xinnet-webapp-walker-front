'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/order'

// 结算
export const ORDER_PAYMENT = (jsonObj) => {
  return axios({
    url: action.ORDER_PAYMENT,
    method: 'POST',
    data: {jsonObj}
  })
}
// 订单确认
export const ORDER_CONFIRM = (templateId, groupId, jsonObj) => {
  return axios({
    url: action.ORDER_CONFIRM,
    method: 'POST',
    data: {templateId, groupId, jsonObj}
  })
}
// 订单结算
export const ORDER_SETTLEMENT = () => {
  return axios({
    url: action.ORDER_SETTLEMENT,
    method: 'POST',
    data: {}
  })
}
// 订单管理
export const ORDER_MANAGE = (pageNum, pageSize, createTimeBegin, createTimeEnd, orderGoodsInfo, orderGoodsType, orderMode, orderPayType, orderType) => {
  return axios({
    url: action.ORDER_MANAGE,
    method: 'POST',
    data: {pageNum, pageSize, createTimeBegin, createTimeEnd, orderGoodsInfo, orderGoodsType, orderMode, orderPayType, orderType}
  })
}
// 导出订单管理
export const EXPORT_ORDER = () => {
  return axios({
    url: action.EXPORT_ORDER,
    method: 'POST',
    data: {}
  })
}
