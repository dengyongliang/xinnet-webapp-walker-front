'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/user'

// 管家管理的客户列表
export const USER_CUSTOMERS = () => {
  return axios({
    url: action.USER_CUSTOMERS,
    method: 'get',
    data: {}
  })
}
// 激活-step1
export const VALID_USER = (userCode, userName) => {
  return axios({
    url: action.VALID_USER,
    method: 'get',
    data: {userCode, userName}
  })
}
// 激活账号-基本信息
export const ACTIVATION_USER_INFO = (userCode, userSex, userTel, userMobile, verificationCode, qq, wx) => {
  return axios({
    url: action.ACTIVATION_USER_INFO,
    method: 'get',
    data: {userCode, userSex, userTel, userMobile, verificationCode, qq, wx}
  })
}
// 激活账号-密码
export const ACTIVATION_USER_PWD = (userCode, password) => {
  return axios({
    url: action.ACTIVATION_USER_PWD,
    method: 'get',
    data: {userCode, password}
  })
}
// 登出
export const LOGOUT = () => {
  return axios({
    url: action.LOGOUT,
    method: 'get',
    data: {}
  })
}
// 登录
export const LOGIN = (account, password, verificationCode) => {
  return axios({
    url: action.LOGIN,
    method: 'get',
    data: {account, password, verificationCode}
  })
}
// 获取当前账号信息
export const MY_USER_INFO = () => {
  return axios({
    url: action.MY_USER_INFO,
    method: 'get',
    data: {}
  })
}
// 管家切换管理的客户
export const CHANGE_CUSTOMERS = (customerId) => {
  return axios({
    url: action.CHANGE_CUSTOMERS,
    method: 'get',
    data: {customerId}
  })
}
// 账号列表
export const USER_LIST = (pageNum, pageSize, domainCompanyId, domainGroupId, companyId, userCode) => {
  return axios({
    url: action.USER_LIST,
    method: 'get',
    data: {pageNum, pageSize, domainCompanyId, domainGroupId, companyId, userCode}
  })
}
// 修改账号信息
export const UPDATE_USER_INFO = (userCode, userTel, userMobile, verificationCode) => {
  return axios({
    url: action.UPDATE_USER_INFO,
    method: 'get',
    data: {userCode, userTel, userMobile, verificationCode}
  })
}
// 修改密码
export const UPDATE_USER_PASSWORD = (userCode, newPassword, verificationCode) => {
  return axios({
    url: action.UPDATE_USER_PASSWORD,
    method: 'get',
    data: {userCode, newPassword, verificationCode}
  })
}
// 客户可用角色列表
export const USER_ROLES = () => {
  return axios({
    url: action.USER_ROLES,
    method: 'get',
    data: {}
  })
}
// 客户可用用户列表
export const USERS = () => {
  return axios({
    url: action.USERS,
    method: 'get',
    data: {}
  })
}
// 客户可用企业列表
export const COMPANYS = () => {
  return axios({
    url: action.COMPANYS,
    method: 'get',
    data: {}
  })
}
// 账号管理-按域名管理权筛选
export const USER_AUTH_GROUPS = () => {
  return axios({
    url: action.USER_AUTH_GROUPS,
    method: 'get',
    data: {}
  })
}
// 账号管理-按公司筛选
export const USER_COMPANYS = () => {
  return axios({
    url: action.USER_COMPANYS,
    method: 'get',
    data: {}
  })
}
// 新建账号
export const ADD_USER = (roleId, groups, userName, userEmail, companyId) => {
  return axios({
    url: action.ADD_USER,
    method: 'get',
    data: {roleId, groups, userName, userEmail, companyId}
  })
}
// 删除账号
export const DELETE_USER_INFO = (userCode) => {
  return axios({
    url: action.DELETE_USER_INFO,
    method: 'get',
    data: {userCode}
  })
}
// 账号详情
export const USER_INFO = (userCode) => {
  return axios({
    url: action.USER_INFO,
    method: 'get',
    data: {userCode}
  })
}
// 修改角色权限
export const UPDATE_USER_AUTH = (userCode, roleId, groups) => {
  return axios({
    url: action.UPDATE_USER_AUTH,
    method: 'get',
    data: {userCode, roleId, groups}
  })
}
// 修改员工信息
export const UPDATE_USER = (userMobile, userCode, userTel, userEmail, companyId) => {
  return axios({
    url: action.UPDATE_USER,
    method: 'get',
    data: {userMobile, userCode, userTel, userEmail, companyId}
  })
}
// 验证手机号码
export const CHECK_USER_PHONE = (userMobile) => {
  return axios({
    url: action.CHECK_USER_PHONE,
    method: 'get',
    data: {userMobile}
  })
}
// 验证当前用户登录状态及权限
export const CHECK_USER_AUTH = (authPath) => {
  return axios({
    url: action.CHECK_USER_AUTH,
    method: 'get',
    data: {authPath}
  })
}
// 找回密码-重置密码
export const RESET_USER_PWD = (userMobile, verificationCode, password) => {
  return axios({
    url: action.RESET_USER_PWD,
    method: 'get',
    data: {userMobile, verificationCode, password}
  })
}
