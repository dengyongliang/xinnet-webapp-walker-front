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
// 域名管理-详情管理
export const QUERY_DOMAIN_MANAGE_DETAIL = 'http://localhost:5500/static/data/domainManage.js'
// 域名管理-设置域名分组
export const SET_DOMAIN_GROUP = 'http://localhost:5500/static/data/domainManage.js'
// 域名管理-修改所有人信息
export const SUBMIT_MOD_DOMAIN_REG_USER = 'http://localhost:5500/static/data/domainManage.js'
// 域名管理-修改管理人信息
export const SUBMIT_MOD_DOMAIN_ADM_USER = 'http://localhost:5500/static/data/domainManage.js'
// 域名管理-设置域名DNS
export const SET_DOMAIN_DNS = 'http://localhost:5500/static/data/domainManage.js'
// 发送验证码到域名分组管理人手机
export const GET_DOMAIN_MGMT_V_CODE = 'http://localhost:5500/static/data/domainManage.js'
// 域名管理-续费
export const ORDER_PAY_DOMAIN_RENEW = 'http://localhost:5500/static/data/domainManage.js'
// 域名总览-域名统计
export const OVERVIEW_DOMAIN_STATISTICS = 'http://localhost:5500/static/data/domainStatistics.js'
// 域名总览-数量变化总览
export const OVERVIEW_DOMAIN_COUNT_STATISTICS = 'http://localhost:5500/static/data/domainCountStatistics.js'
// 域名总览-实名模板统计
export const OVERVIEW_TEMPLATE_STATISTICS = 'http://localhost:5500/static/data/templateStatistics.js'
// 域名总览-注册居锁统计
export const OVERVIEW_BACKEND_LOCK_STATISTICS = 'http://localhost:5500/static/data/backendLockStatistics.js'
// 域名总览-实名认证统计
export const OVERVIEW_DOMAIN_VERIFY_STATISTICS = 'http://localhost:5500/static/data/domainVerifyStatistics.js'
// 域名总览-急需续费域名统计
export const OVERVIEW_DOMAIN_RENEW_STATISTICS = 'http://localhost:5500/static/data/domainRenewStatistics.js'
// 域名总览-转入中域名统计
export const OVERVIEW_DOMAIN_TRANSFER_IN_STATISTICS = 'http://localhost:5500/static/data/domainTransferInStatistics.js'
// 域名总览-过户中域名统计
export const OVERVIEW_DOMAIN_CHANGE_STATISTICS = 'http://localhost:5500/static/data/domainChangeStatistics.js'

// 首页-企业信息
export const INDEX_MY_COMPANY = 'http://localhost:5500/static/data/indexMyCompany.js'
// 首页-管家信息
export const INDEX_MY_KEEPER = 'http://localhost:5500/static/data/indexMyKeeper.js'
// 首页-域名统计
export const INDEX_DOMAIN_STATISTICS = 'http://localhost:5500/static/data/indexDomainStatistics.js'
// 首页-企业数量
export const INDEX_COMPANY_STATISTICS = 'http://localhost:5500/static/data/indexCompanyStatistics.js'
// 首页-员工数量
export const INDEX_USER_STATISTICS = 'http://localhost:5500/static/data/indexUserStatistics.js'
// 首页-未出账单
export const INDEX_PAY_STATISTICS_UNBILLED = 'http://localhost:5500/static/data/indexPayStatisticsUnBilled.js'
// 首页-已出账单
export const INDEX_PAY_STATISTICS_HISTORY_BILL = 'http://localhost:5500/static/data/indexPayStatisticsHistoryBill.js'
// 首页-账户额度统计
export const INDEX_ACCOUNT_STATISTICS = 'http://localhost:5500/static/data/indexAccountStatistics.js'
// 监控通知通知设置(新增或更新)
export const SET_NOTIFY = 'http://localhost:5500/static/data/mailManage.js'
// 监控通知通知设置详情
export const QUERY_NOTIFY_DETAIL = 'http://localhost:5500/static/data/mailManage.js'
// 监控通知管理列表
export const QUERY_MAIL_MANAGE = 'http://localhost:5500/static/data/mailManage.js'
// 监控通知通知标记已读
export const SET_MAIL_RECORD_READ = 'http://localhost:5500/static/data/mailManage.js'
// 域名监控日志管理列表
export const QUERY_DOMAIN_MONITOR_MANAGE = 'http://localhost:5500/static/data/domainMonitorManage.js'
// 员工监控日志管理列表
export const QUERY_USER_MONITOR_MANAGE = 'http://localhost:5500/static/data/userMonitorManage.js'
// 自有监控报告数量预览
export const QUERY_DOMAIN_MONITOR_CHANGE_REPORT = 'http://localhost:5500/static/data/domainMonitorChangeReport.js'
// 自有监控报告域名安全
export const QUERY_DOMAIN_MONITOR_SAFE_REPORT = 'http://localhost:5500/static/data/domainMonitorSafeReport.js'
// 自有监控报告到期时间
export const QUERY_DOMAIN_MONITOR_EXPIRE_REPORT = 'http://localhost:5500/static/data/domainMonitorExpireReport.js'
// 域名资产报告(资产概况)
export const QUERY_DOMAIN_ASSETS_VIEW_REPORT = 'http://localhost:5500/static/data/domainAssetsViewReport.js'
// 域名资产报告(域名所属公司柱状图)
export const QUERY_DOMAIN_COMPANY_VIEW_REPORT = 'http://localhost:5500/static/data/domainCompanyViewReport.js'
// 域名资产报告(域名后缀分布柱状图)
export const QUERY_DOMAIN_SUFFIX_VIEW_REPORT = 'http://localhost:5500/static/data/domainSuffixViewReport.js'
// 域名资产报告(域名安全保护一般保护概览柱状图)
export const QUERY_DOMAIN_SAFE_NORMAL_REPORT = 'http://localhost:5500/static/data/domainSafeNormalReport.js'
// 域名资产报告(域名安全保护重要保护概览柱状图)
export const QUERY_DOMAIN_SAFE_IMPORTANT_REPORT = 'http://localhost:5500/static/data/domainSafeImportantReport.js'
// 域名资产报告(域名安全保护统计)
export const QUERY_DOMAIN_SAFE_RATE_REPORT = 'http://localhost:5500/static/data/domainSafeRateReport.js'
// 自有域名监控-监控通知管理列表
export const QUERY_MAIL_MANAGE_TOP = 'http://localhost:5500/static/data/mailManageTop.js'
// 自有域名监控-域名监控列表
export const QUERY_DOMAIN_MONITOR = 'http://localhost:5500/static/data/domainMonitor.js'
// 自有域名监控-域名监控详情(域名信息)
export const QUERY_DOMAIN_MONITOR_DETAIL = 'http://localhost:5500/static/data/domainMonitorDetail.js'
// 自有域名监控-域名监控详情(域名监控日志)
export const QUERY_DOMAIN_MONITOR_LOG = 'http://localhost:5500/static/data/domainMonitorLog.js'
