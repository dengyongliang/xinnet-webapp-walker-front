'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 管家管理的客户列表
export const USER_CUSTOMERS = '/client/user/userCustomers' + suffix // QUERY_USER_CUSTOMERS_LIST
// 激活-step1
export const VALID_USER = '/account/user/validUser' + suffix // CHECK_VALID_USER
// 激活账号-基本信息
export const ACTIVATION_USER_INFO = '/account/user/activationUserInfo' + suffix // SUBMIT_ACTIVATION_USER_INFO
// 激活账号-密码
export const ACTIVATION_USER_PWD = '/account/user/activationUserPwd' + suffix // SUBMIT_ACTIVATION_USER_PWD
// 登出
export const LOGOUT = '/user/logout' + suffix // LOGIN_OUT
// 登录
export const LOGIN = '/user/login' + suffix // LOGIN_SUBMIT
// 获取当前账号信息
export const MY_USER_INFO = '/client/user/myUserInfo' + suffix // GET_CURRENT_USER_DATA
// 管家切换管理的客户
export const CHANGE_CUSTOMERS = '/client/user/changeCustomers' + suffix // CHANGE_CUSTOMERS
// 账号列表
export const USER_LIST = '/client/user/userList' + suffix // QUERY_USER_LIST
// 修改账号信息
export const UPDATE_USER_INFO = '/client/user/updateUserInfo' + suffix // UPDATE_USER_INFO
// 修改密码
export const UPDATE_USER_PASSWORD = '/client/user/updateUserPassword' + suffix
// 客户可用角色列表
export const USER_ROLES = '/client/user/userRoles' + suffix // GET_USER_ROLES
// 客户可用用户列表
export const USERS = '/client/user/users' + suffix // GET_USERS
// 客户可用企业列表
export const COMPANYS = '/client/user/companys' + suffix // GET_COMPANYS
// 账号管理-按域名管理权筛选
export const USER_AUTH_GROUPS = '/client/user/userAuthGroups' + suffix // GET_USER_AUTH_GROUPS
// 账号管理-按公司筛选
export const USER_COMPANYS = '/client/user/userCompanys' + suffix // QUERY_USER_COMPANYS
// 新建账号
export const ADD_USER = '/client/user/addUser' + suffix
// 删除账号
export const DELETE_USER_INFO = '/client/user/deleteUserInfo' + suffix
// 账号详情
export const USER_INFO = '/client/user/userInfo' + suffix // QUERY_USER_INFO
// 修改角色权限
export const UPDATE_USER_AUTH = '/client/user/updateUserAuth' + suffix
// 修改员工信息
export const UPDATE_USER = '/client/user/updateUser' + suffix
// 验证手机号码
export const CHECK_USER_PHONE = '/account/user/checkUserPhone' + suffix
// 验证当前用户登录状态及权限
export const CHECK_USER_AUTH = '/account/user/checkUserAuth' + suffix
// 找回密码-重置密码
export const RESET_USER_PWD = '/account/user/resetUserPwd' + suffix
