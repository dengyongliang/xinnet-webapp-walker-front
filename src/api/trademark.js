'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/trademark'

// 查询
export const TRADEMARK_SEARCH = (searchType, keyWords, intCls, pageNum, pageSize) => {
  return axios({
    url: action.TRADEMARK_SEARCH,
    method: 'POST',
    data: {searchType, keyWords, intCls, pageNum, pageSize}
  })
}
// 详情
export const TRADEMARK_INFO = (regNo, intCls) => {
  return axios({
    url: action.TRADEMARK_INFO,
    method: 'POST',
    data: {regNo, intCls}
  })
}
// 商标列表
export const TRADEMARK_LIST = (keyWords, currentStatus, brandId, intCls, pageNum, pageSize) => {
  return axios({
    url: action.TRADEMARK_LIST,
    method: 'POST',
    data: {keyWords, currentStatus, brandId, intCls, pageNum, pageSize}
  })
}
// 国际分类排序（商标管理列表的搜索项使用）
export const TRADEMARK_SORT = () => {
  return axios({
    url: action.TRADEMARK_SORT,
    method: 'POST',
    data: {}
  })
}
// 删除商标
export const DELETE_TRADEMARK = (id) => {
  return axios({
    url: action.DELETE_TRADEMARK,
    method: 'POST',
    data: {id}
  })
}
// 商标检查（添加商标前的搜索功能使用）
export const TRADEMARK_CHECK = (regNos, keyWords) => {
  return axios({
    url: action.TRADEMARK_CHECK,
    method: 'POST',
    data: {regNos, keyWords}
  })
}
// 添加商标
export const CREATE_TRADEMARK = (brandId, regNos) => {
  return axios({
    url: action.CREATE_TRADEMARK,
    method: 'POST',
    data: {brandId, regNos}
  })
}
// 申请商标
export const APP_TRADEMARK = (tmName, contactor, phoneNum, email, description) => {
  return axios({
    url: action.APP_TRADEMARK,
    method: 'POST',
    data: {tmName, contactor, phoneNum, email, description}
  })
}

// 关注商标监控-查询
export const FOLLOW_TRADEMARK_SEARCH = (keyWords, currentStatus, brandId, intCls, pageNum, pageSize) => {
  return axios({
    url: action.FOLLOW_TRADEMARK_SEARCH,
    method: 'POST',
    data: {keyWords, currentStatus, brandId, intCls, pageNum, pageSize}
  })
}

// 近似商标监控-查询
export const SIMILAR_TRADEMARK_SEARCH = (keyWords, brandId, pageNum, pageSize) => {
  return axios({
    url: action.SIMILAR_TRADEMARK_SEARCH,
    method: 'POST',
    data: {keyWords, brandId, pageNum, pageSize}
  })
}

// 主体监控-查询
export const BODY_TRADEMARK_SEARCH = (applicantCn, pageNum, pageSize) => {
  return axios({
    url: action.BODY_TRADEMARK_SEARCH,
    method: 'POST',
    data: {applicantCn, pageNum, pageSize}
  })
}

// 主体监控-查询
export const BODY_TRADEMARK_UNFOLLOW = (ids) => {
  return axios({
    url: action.BODY_TRADEMARK_UNFOLLOW,
    method: 'POST',
    data: {ids}
  })
}

// 近似商标列表取消监控
export const SIMILAR_TRADEMARK_UNFOLLOW = (ids) => {
  return axios({
    url: action.SIMILAR_TRADEMARK_UNFOLLOW,
    method: 'POST',
    data: {ids}
  })
}

// 关注商标列表取消关注
export const FOLLOW_TRADEMARK_UNFOLLOW = (ids) => {
  return axios({
    url: action.FOLLOW_TRADEMARK_UNFOLLOW,
    method: 'POST',
    data: {ids}
  })
}

// 近似商标监控详情
export const SIMILAR_TRADEMARK_DETAIL = (id) => {
  return axios({
    url: action.SIMILAR_TRADEMARK_DETAIL,
    method: 'POST',
    data: {id}
  })
}

// 近似商标监控详情列表
export const SIMILAR_TRADEMARK_LIST = (id, issueNumber, intClass, order, orderType, pageNum, pageSize) => {
  return axios({
    url: action.SIMILAR_TRADEMARK_LIST,
    method: 'POST',
    data: {id, issueNumber, intClass, order, orderType, pageNum, pageSize}
  })
}

// 近似商标监控详情列表
export const BODY_TRADEMARK_LIST = (monitorBodyId, keyWords, intClass, orderType, pageNum, pageSize) => {
  return axios({
    url: action.BODY_TRADEMARK_LIST,
    method: 'POST',
    data: {monitorBodyId, keyWords, intClass, orderType, pageNum, pageSize}
  })
}

// 近似商标详情关注商标(含全部关注)
export const FOLLOW_TRADEMARK_SIMILAR_FOLLOW = (ids, brandId) => {
  return axios({
    url: action.FOLLOW_TRADEMARK_SIMILAR_FOLLOW,
    method: 'POST',
    data: {ids, brandId}
  })
}

// 主体监控详情关注商标
export const FOLLOW_TRADEMARK_BODY_FOLLOW = (regNo, intCls, brandId) => {
  return axios({
    url: action.FOLLOW_TRADEMARK_BODY_FOLLOW,
    method: 'POST',
    data: {regNo, intCls, brandId}
  })
}

// 关注商标通知设置
export const FOLLOW_TRADEMARK_ADD_NOTIFY = (notifyWay, notifyUsers) => {
  return axios({
    url: action.FOLLOW_TRADEMARK_ADD_NOTIFY,
    method: 'POST',
    data: {notifyWay, notifyUsers}
  })
}

// 主体监控添加
export const BODY_TRADEMARK_INSERT = (applicantCn) => {
  return axios({
    url: action.BODY_TRADEMARK_INSERT,
    method: 'POST',
    data: {applicantCn}
  })
}
// 近似商标监控添加关键词
export const SIMILAR_TRADEMARK_INSERT = (monitorType, keyWords, monitorCondition, intClasses, brandId, excludeApplicant) => {
  return axios({
    url: action.SIMILAR_TRADEMARK_INSERT,
    method: 'POST',
    data: {monitorType, keyWords, monitorCondition, intClasses, brandId, excludeApplicant}
  })
}

// 近似商标监控修改关键词
export const SIMILAR_TRADEMARK_UPDATE = (id, brandId, excludeApplicant) => {
  return axios({
    url: action.SIMILAR_TRADEMARK_UPDATE,
    method: 'POST',
    data: {id, brandId, excludeApplicant}
  })
}

// 近似商标监控详情回显
export const SIMILAR_TRADEMARK_QUERY = (id) => {
  return axios({
    url: action.SIMILAR_TRADEMARK_QUERY,
    method: 'POST',
    data: {id}
  })
}
// 关注商标通知设置回显
export const FOLLOW_TRADEMARK_SEARCH_NOTIFY = () => {
  return axios({
    url: action.FOLLOW_TRADEMARK_SEARCH_NOTIFY,
    method: 'POST',
    data: {}
  })
}
