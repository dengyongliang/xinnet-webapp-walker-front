'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 转入域名列表
export const TRANSFER_IN_LIST = '/client/transferin/transferInList' + suffix // QUERY_TRANSFER_IN_LIST
// 域名提交转入
export const SUBMIT_TRANSFER_IN = '/client/transferin/submitTransferIn' + suffix
