'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/role'

// 角色列表
export const ROLE_LIST = (pageNum, pageSize) => {
  return axios({
    url: action.ROLE_LIST,
    method: 'POST',
    data: {pageNum, pageSize}
  })
}
// 查询权限列表
export const MENUS = (roleId) => {
  return axios({
    url: action.MENUS,
    method: 'POST',
    data: {roleId}
  })
}
// 创建角色
export const ROLE_CREATE = (menuIds, roleName) => {
  return axios({
    url: action.ROLE_CREATE,
    method: 'POST',
    data: {menuIds, roleName}
  })
}
// 修改角色
export const ROLE_UPDATE = (menuIds, roleId, roleName) => {
  return axios({
    url: action.ROLE_UPDATE,
    method: 'POST',
    data: {menuIds, roleId, roleName}
  })
}
// 删除角色
export const ROLE_DELETE = (roleId) => {
  return axios({
    url: action.ROLE_DELETE,
    method: 'POST',
    data: {roleId}
  })
}
