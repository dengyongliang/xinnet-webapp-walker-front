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
// 关注商标监控查询
export const FOLLOW_TRADEMARK_SEARCH = '/client/follow/trademark/search' + suffix
// 近似商标监控查询
export const SIMILAR_TRADEMARK_SEARCH = '/client/similar/trademark/search' + suffix
// 主体监控查询
export const BODY_TRADEMARK_SEARCH = '/client/body/trademark/search' + suffix
// 关注商标列表取消关注
export const FOLLOW_TRADEMARK_UNFOLLOW = '/client/follow/trademark/unfollow' + suffix
// 近似商标列表取消监控
export const SIMILAR_TRADEMARK_UNFOLLOW = '/client/similar/trademark/unfollow' + suffix
// 主体监控取消监控
export const BODY_TRADEMARK_UNFOLLOW = '/client/body/trademark/unfollow' + suffix
// 近似商标监控详情
export const SIMILAR_TRADEMARK_DETAIL = '/client/similar/trademark/detail' + suffix
// 近似商标监控详情列表
export const SIMILAR_TRADEMARK_LIST = '/client/similar/trademark/list' + suffix
// 主体监控详情查询
export const BODY_TRADEMARK_LIST = '/client/body/trademark/list' + suffix
// 近似商标详情关注商标(含全部关注)
export const FOLLOW_TRADEMARK_SIMILAR_FOLLOW = '/client/follow/trademark/similar_follow' + suffix
// 主体监控详情关注商标
export const FOLLOW_TRADEMARK_BODY_FOLLOW = '/client/follow/trademark/body_follow' + suffix
// 关注商标通知设置
export const FOLLOW_TRADEMARK_ADD_NOTIFY = '/client/follow/trademark/add_notify' + suffix
// 主体监控添加
export const BODY_TRADEMARK_INSERT = '/client/body/trademark/insert' + suffix
// 近似商标监控添加关键词
export const SIMILAR_TRADEMARK_INSERT = '/client/similar/trademark/insert' + suffix
// 近似商标监控修改关键词
export const SIMILAR_TRADEMARK_UPDATE = '/client/similar/trademark/update' + suffix
// 近似商标监控详情回显
export const SIMILAR_TRADEMARK_QUERY = '/client/similar/trademark/query' + suffix
// 关注商标通知设置回显
export const FOLLOW_TRADEMARK_SEARCH_NOTIFY = '/client/follow/trademark/search_notify' + suffix
