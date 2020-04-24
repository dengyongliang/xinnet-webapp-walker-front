'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 查询
export const TRADEMARK_SEARCH = '/client/trademark/search' + suffix
// 详情
export const TRADEMARK_INFO = '/client/trademark/info' + suffix
// 商标列表
export const TRADEMARK_LIST = '/client/trademark/tradeMarkList' + suffix
// 国际分类排序（商标管理列表的搜索项使用）
export const TRADEMARK_SORT = '/client/trademark/sort' + suffix
// 删除商标
export const DELETE_TRADEMARK = '/client/trademark/deleteTradeMark' + suffix
// 商标检查（添加商标前的搜索功能使用）
export const TRADEMARK_CHECK = '/client/trademark/check' + suffix
// 添加商标
export const CREATE_TRADEMARK = '/client/trademark/createTradeMark' + suffix
// 申请商标
export const APP_TRADEMARK = '/client/trademark/appTradeMark' + suffix
