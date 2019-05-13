'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 角色列表
export const ROLE_LIST = '/client/role/roleList' + suffix // QUERY_ROLE_LIST
// 查询权限列表
export const MENUS = '/client/role/menus' + suffix // QUERY_ROLE_MENUS
// 创建角色
export const ROLE_CREATE = '/client/role/roleCreate' + suffix
// 修改角色
export const ROLE_UPDATE = '/client/role/roleUpdate' + suffix
// 删除角色
export const ROLE_DELETE = '/client/role/roleDelete' + suffix
