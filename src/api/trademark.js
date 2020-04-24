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
