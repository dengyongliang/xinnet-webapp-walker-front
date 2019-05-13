'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 工单管理
export const WORK_ORDER_MANAGE = '/client/workOrder/workOrderManage' + suffix // QUERY_WORK_ORDER_MANAGE_LIST
// 工单提交
export const WORK_ORDER_SUBMIT = '/client/workOrder/workOrderSubmit' + suffix // SUBMIT_WORK_ORDER
// 工单详情
export const WORK_ORDER_DETAIL = '/client/workOrder/workOrderDetail' + suffix // QUERY_WORK_ORDER_DETAIL
