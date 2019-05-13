'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 结算
export const ORDER_PAYMENT = '/client/order/orderPayment' + suffix // ORDER_PAYMENT
// 订单确认
export const ORDER_CONFIRM = '/client/order/orderConfirm' + suffix // QUERY_ORDER_CONFIRM
// 订单结算
export const ORDER_SETTLEMENT = '/client/order/orderSettlement' + suffix
// 订单管理
export const ORDER_MANAGE = '/client/order/orderManage' + suffix // QUERY_ORDER_LIST
// 导出订单管理
export const EXPORT_ORDER = '/client/order/exportOrder' + suffix // EXPORT_ORDER_LIST
