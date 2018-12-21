'use strict'
// 管家管理的客户列表
export const QUERY_USER_CUSTOMERS_LIST = 'http://localhost:5500/static/data/userCustomers.js'
// 激活-step1
export const CHECK_VALID_USER = 'http://localhost:5500/static/data/myUserInfo.js'
// 激活验证码
export const ACTIVATION_VERIFICATIONCODE = 'http://localhost:5500/static/data/myUserInfo.js'
// 激活账号-基本信息
export const SUBMIT_ACTIVATION_USER_INFO = 'http://localhost:5500/static/data/myUserInfo.js'
// 激活账号-密码
export const SUBMIT_ACTIVATION_USER_PWD = 'http://localhost:5500/static/data/myUserInfo.js'
// 登出
export const LOGIN_OUT = 'http://localhost:5500/static/data/myUserInfo.js'
// 登录
export const LOGIN_SUBMIT = 'http://localhost:5500/static/data/myUserInfo.js'
// 登录_获取验证码
export const LOGIN_VERIFICATIONCODE = 'http://localhost:5500/static/data/myUserInfo.js'
// 获取当前账号信息
export const GET_CURRENT_USER_DATA = 'http://localhost:5500/static/data/myUserInfo.js'
// 财务-消费统计
export const FINANCE_PAY_STATISTICS = 'http://localhost:5500/static/data/payStatistics.js'
// 财务-消费趋势
export const FINANCE_PAY_STATISTICS_TREND = 'http://localhost:5500/static/data/payStatisticsTrend.js'
// 财务-账单流水
export const QUERY_FINANCE_CUSTOMER_FLOW_LIST = 'http://localhost:5500/static/data/getCustomerFlowList.js'
// 财务-账单流水导出
export const EXPORT_FINANCE_CUSTOMER_FLOW_LIST = 'http://localhost:5500/static/data/getCustomerFlowList.js'
// 财务-信用额度统计
export const QUERY_PAY_STATISTICS_BALANCE = 'http://localhost:5500/static/data/payStatisticsBalance.js'
// 财务-未出账单
export const PAY_STATISTICS_UNBILLED = 'http://localhost:5500/static/data/payStatisticsUnBilled.js'
// 财务-往期账单
export const PAY_STATISTICS_HISTORY_BILL = 'http://localhost:5500/static/data/payStatisticsHistoryBill.js'
// 管家切换管理的客户
export const CHANGE_CUSTOMERS = 'http://localhost:5500/static/data/payStatisticsHistoryBill.js'
// 角色列表
export const QUERY_ROLE_LIST = 'http://localhost:5500/static/data/roleList.js'
// 企业列表
export const QUERY_COMPANY_LIST = 'http://localhost:5500/static/data/companyList.js'
// 账号列表
export const QUERY_USER_LIST = 'http://localhost:5500/static/data/userList.js'
// 修改账号信息
export const UPDATE_USER_INFO = 'http://localhost:5500/static/data/userList.js'
// 查询权限列表
export const QUERY_ROLE_MENUS = 'http://localhost:5500/static/data/roles.js'
// 创建角色
export const ROLE_CREATE = 'http://localhost:5500/static/data/userList.js'
// 修改角色
export const ROLE_UPDATE = 'http://localhost:5500/static/data/userList.js'
// 删除角色
export const ROLE_DELETE = 'http://localhost:5500/static/data/userList.js'
// 发送原手机号的验证码
export const GET_OLD_PHONE_CODE = 'http://localhost:5500/static/data/roleList.js'
// 发送修改手机号码验证码
export const GET_UPDATE_PHONE_CODE = 'http://localhost:5500/static/data/roleList.js'
// 验证原手机号的验证码
export const CHECK_OLD_PHONE_CODE = 'http://localhost:5500/static/data/roleList.js'
// 修改密码
export const UPDATE_USER_PASSWORD = 'http://localhost:5500/static/data/roleList.js'
// 订单管理
export const QUERY_ORDER_LIST = 'http://localhost:5500/static/data/orderList.js'
// 导出订单管理
export const EXPORT_ORDER_LIST = 'http://localhost:5500/static/data/orderList.js'
// 客户可用角色列表
export const GET_USER_ROLES = 'http://localhost:5500/static/data/userRoles.js'
// 客户可用用户列表
export const GET_USERS = 'http://localhost:5500/static/data/users.js'
// 客户可用企业列表
export const GET_COMPANYS = 'http://localhost:5500/static/data/companys.js'
// 账号管理-按域名管理权筛选
export const GET_USER_AUTH_GROUPS = 'http://localhost:5500/static/data/userAuthGroups.js'
// 账号管理-按公司筛选
export const QUERY_USER_COMPANYS = 'http://localhost:5500/static/data/userCompanys.js'
// 新建账号
export const ADD_USER = 'http://localhost:5500/static/data/userAuthGroups.js'
// 工单管理
export const QUERY_WORK_ORDER_MANAGE_LIST = 'http://localhost:5500/static/data/workOrderManage.js'
// 工单提交
export const SUBMIT_WORK_ORDER = 'http://localhost:5500/static/data/workOrderManage.js'
// 工单详情
export const QUERY_WORK_ORDER_DETAIL = 'http://localhost:5500/static/data/workOrderDetail.js'
// 删除账号
export const DELETE_USER_INFO = 'http://localhost:5500/static/data/workOrderDetail.js'
// 账号详情
export const QUERY_USER_INFO = 'http://localhost:5500/static/data/userInfo.js'
// 修改角色权限
export const UPDATE_USER_AUTH = 'http://localhost:5500/static/data/userInfo.js'
// 修改员工信息
export const UPDATE_USER = 'http://localhost:5500/static/data/userInfo.js'
// 创建企业
export const CREATE_COMPANY = 'http://localhost:5500/static/data/userInfo.js'
// 企业详情
export const QUERY_COMPANY_INFO = 'http://localhost:5500/static/data/companyInfo.js'
// 创建分组
export const CREATE_GROUP = 'http://localhost:5500/static/data/companyInfo.js'
// 修改分组
export const UPDATE_GROUP = 'http://localhost:5500/static/data/companyInfo.js'
// 删除分组
export const DELETE_GROUP = 'http://localhost:5500/static/data/companyInfo.js'
// 修改企业
export const UPDATE_COMPANY = 'http://localhost:5500/static/data/companyInfo.js'
// 修改企业
export const DELETE_COMPANY = 'http://localhost:5500/static/data/companyInfo.js'
// 模板列表
export const QUERY_TEMPLATE_LIST = 'http://localhost:5500/static/data/templateList.js'
// 创建模板
export const CREATE_TEMPLATE = 'http://localhost:5500/static/data/templateList.js'
// 提交模板资料
export const SUBMIT_TEMPLATE = 'http://localhost:5500/static/data/templateList.js'
// 删除模板
export const DELETE_TEMPLATE = 'http://localhost:5500/static/data/templateList.js'
// 修改模板
export const UPDATE_TEMPLATE = 'http://localhost:5500/static/data/templateList.js'
// 模板详情
export const QUERY_TEMPLATE_INFO = 'http://localhost:5500/static/data/templateInfo.js'
// 资料详情
export const QUERY_VERIFY_INFO = 'http://localhost:5500/static/data/verifyInfo.js'
// 过户域名列表
export const QUERY_CHANGE_LIST = 'http://localhost:5500/static/data/changeList.js'
// 转入域名列表
export const QUERY_TRANSFER_IN_LIST = 'http://localhost:5500/static/data/transferInList.js'
// 客户可用模板列表
export const QUERY_TEMPLATES = 'http://localhost:5500/static/data/templates.js'
// 订单确认
export const QUERY_ORDER_CONFIRM = 'http://localhost:5500/static/data/orderConfirm.js'
// 域名提交过户
export const SUBMIT_CHANGE = 'http://localhost:5500/static/data/orderConfirm.js'
// 过户域名详情
export const QUERY_CHANGE_INFO = 'http://localhost:5500/static/data/changeInfo.js'
// 订单结算
export const ORDER_SETTLEMENT = 'http://localhost:5500/static/data/changeInfo.js'
// 域名提交转入
export const SUBMIT_TRANSFER_IN = 'http://localhost:5500/static/data/changeInfo.js'
// 域名实名制列表
export const QUERY_DOMAIN_VERIFY_LIST = 'http://localhost:5500/static/data/domainVerifyList.js'
// 提交域名实名资料
export const SUBMIT_DOMAIN_VERIFY = 'http://localhost:5500/static/data/domainVerifyList.js'
// 更新域名审核状态
export const UPDATE_DOMAIN_AUDIT_STATUS = 'http://localhost:5500/static/data/domainVerifyList.js'
// 域名安全服务列表
export const QUERY_DOMAIN_SAFE_LIST = 'http://localhost:5500/static/data/domainSafeList.js'
// 设置域名保护级别
export const SET_PROTECT_LEVEL = 'http://localhost:5500/static/data/domainSafeList.js'
// 设置域名自动续费
export const SET_AUTO_RENEW = 'http://localhost:5500/static/data/domainSafeList.js'
// 设置域名禁止更新
export const SET_PROHIBIT_UPDATE = 'http://localhost:5500/static/data/domainSafeList.js'
// 购买域名注册局锁定
export const BUY_BACKEND_LOCK = 'http://localhost:5500/static/data/domainSafeList.js'
// 续费域名注册局锁定
export const RENEW_BACKEND_LOCK = 'http://localhost:5500/static/data/domainSafeList.js'
// 域名管理列表
export const QUERY_DOMAIN_LIST = 'http://localhost:5500/static/data/domainList.js'


