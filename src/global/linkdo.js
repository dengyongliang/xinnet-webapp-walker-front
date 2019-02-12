'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 管家管理的客户列表
export const QUERY_USER_CUSTOMERS_LIST = '/client/user/userCustomers' + suffix
// 激活-step1
export const CHECK_VALID_USER = '/account/user/validUser' + suffix
// 激活验证码
export const ACTIVATION_VERIFICATIONCODE = '/server/message/send/activationCode' + suffix
// 激活账号-基本信息
export const SUBMIT_ACTIVATION_USER_INFO = '/account/user/activationUserInfo' + suffix
// 激活账号-密码
export const SUBMIT_ACTIVATION_USER_PWD = '/account/user/activationUserPwd' + suffix
// 登出
export const LOGIN_OUT = '/user/logout' + suffix
// 登录
export const LOGIN_SUBMIT = '/user/login' + suffix
// 登录_获取验证码
export const LOGIN_VERIFICATIONCODE = '/server/message/send/clientLogin' + suffix
// 获取当前账号信息
export const GET_CURRENT_USER_DATA = '/client/user/myUserInfo' + suffix
// 财务-消费统计
export const FINANCE_PAY_STATISTICS = '/client/finance/payStatistics' + suffix
// 财务-消费趋势
export const FINANCE_PAY_STATISTICS_TREND = '/client/finance/payStatisticsTrend' + suffix
// 财务-账单流水
export const QUERY_FINANCE_CUSTOMER_FLOW_LIST = '/client/finance/getCustomerFlowList' + suffix
// 财务-账单流水导出
export const EXPORT_FINANCE_CUSTOMER_FLOW_LIST = '/client/finance/exportCustomerFlow' + suffix
// 财务-信用额度统计
export const QUERY_PAY_STATISTICS_BALANCE = '/client/finance/payStatisticsBalance' + suffix
// 财务-未出账单
export const PAY_STATISTICS_UNBILLED = '/client/finance/payStatisticsUnBilled' + suffix
// 财务-往期账单
export const PAY_STATISTICS_HISTORY_BILL = '/client/finance/payStatisticsHistoryBill' + suffix
// 管家切换管理的客户
export const CHANGE_CUSTOMERS = '/client/user/changeCustomers' + suffix
// 角色列表
export const QUERY_ROLE_LIST = '/client/role/roleList' + suffix
// 企业列表
export const QUERY_COMPANY_LIST = '/client/company/companyList' + suffix
// 账号列表
export const QUERY_USER_LIST = '/client/user/userList' + suffix
// 修改账号信息
export const UPDATE_USER_INFO = '/client/user/updateUserInfo' + suffix
// 查询权限列表
export const QUERY_ROLE_MENUS = '/client/role/menus' + suffix
// 创建角色
export const ROLE_CREATE = '/client/role/roleCreate' + suffix
// 修改角色
export const ROLE_UPDATE = '/client/role/roleUpdate' + suffix
// 删除角色
export const ROLE_DELETE = '/client/role/roleDelete' + suffix
// 发送原手机号的验证码
export const GET_OLD_PHONE_CODE = '/server/message/send/oldPhoneCode' + suffix
// 发送修改手机号码验证码
export const GET_UPDATE_PHONE_CODE = '/server/message/send/updatePhoneCode' + suffix
// 验证原手机号的验证码
export const CHECK_OLD_PHONE_CODE = '/server/message/check/oldPhoneCode' + suffix
// 修改密码
export const UPDATE_USER_PASSWORD = '/client/user/updateUserPassword' + suffix
// 订单管理
export const QUERY_ORDER_LIST = '/client/order/orderManage' + suffix
// 导出订单管理
export const EXPORT_ORDER_LIST = '/client/order/exportOrder' + suffix
// 客户可用角色列表
export const GET_USER_ROLES = '/client/user/userRoles' + suffix
// 客户可用用户列表
export const GET_USERS = '/client/user/users' + suffix
// 客户可用企业列表
export const GET_COMPANYS = '/client/user/companys' + suffix
// 账号管理-按域名管理权筛选
export const GET_USER_AUTH_GROUPS = '/client/user/userAuthGroups' + suffix
// 账号管理-按公司筛选
export const QUERY_USER_COMPANYS = '/client/user/userCompanys' + suffix
// 新建账号
export const ADD_USER = '/client/user/addUser' + suffix
// 工单管理
export const QUERY_WORK_ORDER_MANAGE_LIST = '/client/workOrder/workOrderManage' + suffix
// 工单提交
export const SUBMIT_WORK_ORDER = '/client/workOrder/workOrderSubmit' + suffix
// 工单详情
export const QUERY_WORK_ORDER_DETAIL = '/client/workOrder/workOrderDetail' + suffix
// 删除账号
export const DELETE_USER_INFO = '/client/user/deleteUserInfo' + suffix
// 账号详情
export const QUERY_USER_INFO = '/client/user/userInfo' + suffix
// 修改角色权限
export const UPDATE_USER_AUTH = '/client/user/updateUserAuth' + suffix
// 修改员工信息
export const UPDATE_USER = '/client/user/updateUser' + suffix
// 创建企业
export const CREATE_COMPANY = '/client/company/companyCreate' + suffix
// 企业详情
export const QUERY_COMPANY_INFO = '/client/company/companyInfo' + suffix
// 上传LOGO
export const UPLOAD_COMPANY_LOGO = '/client/company/uploadlogo' + suffix
// 创建分组
export const CREATE_GROUP = '/client/company/groupCreate' + suffix
// 修改分组
export const UPDATE_GROUP = '/client/company/groupUpdate' + suffix
// 删除分组
export const DELETE_GROUP = '/client/company/groupDelete' + suffix
// 修改企业
export const UPDATE_COMPANY = '/client/company/companyUpdate' + suffix
// 修改企业
export const DELETE_COMPANY = '/client/company/companyDelete' + suffix
// 模板列表
export const QUERY_TEMPLATE_LIST = '/client/template/templateList' + suffix
// 创建模板
export const CREATE_TEMPLATE = '/client/template/createTemplate' + suffix
// 上传模板资料
export const UPLOAD_FILE_TEMPLATE = '/client/template/uploadfile' + suffix
// 提交模板资料
export const SUBMIT_TEMPLATE = '/client/template/templateVerify' + suffix
// 删除模板
export const DELETE_TEMPLATE = '/client/template/deleteTemplate' + suffix
// 修改模板
export const UPDATE_TEMPLATE = '/client/template/updateTemplate' + suffix
// 模板详情
export const QUERY_TEMPLATE_INFO = '/client/template/templateInfo' + suffix
// 资料详情
export const QUERY_VERIFY_INFO = '/client/template/verifyInfo' + suffix
// 过户域名列表
export const QUERY_CHANGE_LIST = '/client/change/changeList' + suffix
// 转入域名列表
export const QUERY_TRANSFER_IN_LIST = '/client/transferin/transferInList' + suffix
// 客户可用模板列表
export const QUERY_TEMPLATES = '/client/template/templates' + suffix
// 订单确认
export const QUERY_ORDER_CONFIRM = '/client/order/orderConfirm' + suffix
// 域名提交过户
export const SUBMIT_CHANGE = '/client/change/submitChange' + suffix
// 过户域名详情
export const QUERY_CHANGE_INFO = '/client/change/changeInfo' + suffix
// 订单结算
export const ORDER_SETTLEMENT = '/client/order/orderSettlement' + suffix
// 域名提交转入
export const SUBMIT_TRANSFER_IN = '/client/transferin/submitTransferIn' + suffix
// 域名管理列表
export const QUERY_DOMAIN_LIST = '/client/domain/domainList' + suffix
// 域名管理-详情管理
export const QUERY_DOMAIN_MANAGE_DETAIL = '/client/domain/domainManage' + suffix
// 域名管理-设置域名分组
export const SET_DOMAIN_GROUP = '/client/domain/setDomainGroup' + suffix
// 域名管理-修改所有人信息
export const SUBMIT_MOD_DOMAIN_REG_USER = '/client/domain/modDomainRegUser' + suffix
// 域名管理-修改管理人信息
export const SUBMIT_MOD_DOMAIN_ADM_USER = '/client/domain/modDomainAdmUser' + suffix
// 域名管理-设置域名DNS
export const SET_DOMAIN_DNS = '/client/domain/setDomainDns' + suffix
// 发送验证码到域名分组管理人手机
export const GET_DOMAIN_MGMT_V_CODE = '/server/message/send/domainManage' + suffix
// 域名管理-续费
export const ORDER_PAY_DOMAIN_RENEW = '/client/domain/renew' + suffix
// 域名管理-导出管理列表
export const EXPORT_DOMAIN_LIST = '/client/domain/exportDomain' + suffix
// 域名总览-域名统计
export const OVERVIEW_DOMAIN_STATISTICS = '/client/domainOverview/domainStatistics' + suffix
// 域名总览-数量变化总览
export const OVERVIEW_DOMAIN_COUNT_STATISTICS = '/client/domainOverview/domainCountStatistics' + suffix
// 域名总览-实名模板统计
export const OVERVIEW_TEMPLATE_STATISTICS = '/client/domainOverview/templateStatistics' + suffix
// 域名总览-注册居锁统计
export const OVERVIEW_BACKEND_LOCK_STATISTICS = '/client/domainOverview/backendLockStatistics' + suffix
// 域名总览-实名认证统计
export const OVERVIEW_DOMAIN_VERIFY_STATISTICS = '/client/domainOverview/domainVerifyStatistics' + suffix
// 域名总览-急需续费域名统计
export const OVERVIEW_DOMAIN_RENEW_STATISTICS = '/client/domainOverview/domainRenewStatistics' + suffix
// 域名总览-转入中域名统计
export const OVERVIEW_DOMAIN_TRANSFER_IN_STATISTICS = '/client/domainOverview/domainTransferInStatistics' + suffix
// 域名总览-过户中域名统计
export const OVERVIEW_DOMAIN_CHANGE_STATISTICS = '/client/domainOverview/domainChangeStatistics' + suffix
// 首页-企业信息
export const INDEX_MY_COMPANY = '/client/index/myCompany' + suffix
// 首页-管家信息
export const INDEX_MY_KEEPER = '/client/index/myKeeper' + suffix
// 首页-域名统计
export const INDEX_DOMAIN_STATISTICS = '/client/index/domainStatistics' + suffix
// 首页-企业数量
export const INDEX_COMPANY_STATISTICS = '/client/index/companyStatistics' + suffix
// 首页-员工数量
export const INDEX_USER_STATISTICS = '/client/index/userStatistics' + suffix
// 首页-未出账单
export const INDEX_PAY_STATISTICS_UNBILLED = '/client/index/payStatisticsUnBilled' + suffix
// 首页-已出账单
export const INDEX_PAY_STATISTICS_HISTORY_BILL = '/client/index/payStatisticsHistoryBill' + suffix
// 首页-账户额度统计
export const INDEX_ACCOUNT_STATISTICS = '/client/index/accountStatistics' + suffix
// 监控通知管理列表
export const QUERY_MAIL_MANAGE = '/client/monitor/mailManage' + suffix
// 监控通知通知标记已读
export const SET_MAIL_RECORD_READ = '/client/monitor/mailRecordRead' + suffix

// 监控通知通知设置(新增或更新)
export const SET_NOTIFY = '/client/monitor/notifySet' + suffix
// 监控通知通知设置详情
export const QUERY_NOTIFY_DETAIL = '/client/monitor/notifySetDetail' + suffix
// 域名监控日志管理列表
export const QUERY_DOMAIN_MONITOR_MANAGE = '/client/monitor/domainMonitorManage' + suffix
// 员工监控日志管理列表
export const QUERY_USER_MONITOR_MANAGE = '/client/monitor/userMonitorManage' + suffix
// 域名监控日志导出
export const EXPORT_MONITOR_DOMAIN_LOG = '/client/monitor/exportDomainLog' + suffix
// 员工监控日志导出
export const EXPORT_MONITOR_USER_LOG = '/client/monitor/exportUserLog' + suffix
// 自有监控报告数量预览
export const QUERY_DOMAIN_MONITOR_CHANGE_REPORT = '/client/report/domainMonitorChangeReport' + suffix
// 自有监控报告域名安全
export const QUERY_DOMAIN_MONITOR_SAFE_REPORT = '/client/report/domainMonitorSafeReport' + suffix
// 自有监控报告到期时间
export const QUERY_DOMAIN_MONITOR_EXPIRE_REPORT = '/client/report/domainMonitorExpireReport' + suffix
// 域名资产报告(资产概况)
export const QUERY_DOMAIN_ASSETS_VIEW_REPORT = '/client/report/domainAssetsViewReport' + suffix
// 域名资产报告(域名所属公司柱状图)
export const QUERY_DOMAIN_COMPANY_VIEW_REPORT = '/client/report/domainCompanyViewReport' + suffix
// 域名资产报告(域名后缀分布柱状图)
export const QUERY_DOMAIN_SUFFIX_VIEW_REPORT = '/client/report/domainSuffixViewReport' + suffix
// 域名资产报告(域名安全保护一般保护概览柱状图)
export const QUERY_DOMAIN_SAFE_NORMAL_REPORT = '/client/report/domainSafeNormalReport' + suffix
// 域名资产报告(域名安全保护重要保护概览柱状图)
export const QUERY_DOMAIN_SAFE_IMPORTANT_REPORT = '/client/report/domainSafeImportantReport' + suffix
// 域名资产报告(域名安全保护统计)
export const QUERY_DOMAIN_SAFE_RATE_REPORT = '/client/report/domainSafeRateReport' + suffix
// 自有域名监控-监控通知管理列表
export const QUERY_MAIL_MANAGE_TOP = '/client/monitor/mailManageTop' + suffix
// 自有域名监控-域名监控列表
export const QUERY_DOMAIN_MONITOR = '/client/monitor/domainMonitor' + suffix
// 自有域名监控-域名监控详情(域名信息)
export const QUERY_DOMAIN_MONITOR_DETAIL = '/client/monitor/domainMonitorDetail' + suffix
// 自有域名监控-域名监控详情(域名监控日志)
export const QUERY_DOMAIN_MONITOR_LOG = '/client/monitor/domainMonitorLog' + suffix
// 自有域名监控-域名监控详情(域名监控日志导出)
export const EXPORT_DOMAIN_LOG = '/client/monitor/exportDomainLog' + suffix
// 域名预算报告总览
export const QUERY_DOMAIN_BUDGET_REPORT = '/client/report/domainBudgetReport' + suffix
// 域名预算报告-域名回购
export const QUERY_DOMAIN_REPURCHASE_REPORT = '/client/report/domainRepurchaseReport' + suffix
// 域名预算报告-域名续费及域名安全保护
export const QUERY_DOMAIN_RENEW_AND_SAFE_REPORT = '/client/report/domainRenewAndSafeReport' + suffix
// 域名预算报告-域名注册
export const QUERY_DOMAIN_REGISTER_REPORT = '/client/report/domainRegisterReport' + suffix
// 域名预算报告列表
export const QUERY_DOMAIN_BUDGET_REPORT_LIST = '/client/report/domainBudgetReportList' + suffix
// 域名消费报告-域名消费列表
export const QUERY_DOMAIN_CONSUMPTION_REPORT_LIST = '/client/report/domainConsumptionReportList' + suffix
// 域名消费报告-域名消费明细列表
export const QUERY_DOMAIN_CONSUMPTION_DETAIL_REPORT = '/client/report/domainConsumptionDetailReport' + suffix
// 域名消费报告-域名消费报告总览
export const QUERY_DOMAIN_CONSUMPTION_REPORT = '/client/report/domainConsumptionReport' + suffix
// 域名消费报告-域名每月消费类别及金额
export const QUERY_DOMAIN_CONSUMPTION_SORT_REPORT = '/client/report/domainConsumptionSortReport' + suffix
// 域名消费报告-域名企业消费类别柱状图
export const QUERY_DOMAIN_CONSUMPTION_COMPANY_SORT_REPORT = '/client/report/domainConsumptionCompanySortReport' + suffix
// 域名消费报告-域名企业消费月份柱状图
export const QUERY_DOMAIN_CONSUMPTION_COMPANY_MONTH_REPORT = '/client/report/domainConsumptionCompanyMonthReport' + suffix
// 域名消费报告-域名企业消费总览
export const QUERY_DOMAIN_CONSUMPTION_COMPANY_REPORT = '/client/report/domainConsumptionCompanyReport' + suffix
// 结算
export const ORDER_PAYMENT = '/client/order/orderPayment' + suffix
// 域名安全服务列表
export const QUERY_DOMAIN_SAFE_LIST = '/client/domainSafe/domainSafeList' + suffix
// 设置域名保护级别
export const SET_PROTECT_LEVEL = '/client/domainSafe/setProtectLevel' + suffix
// 设置域名自动续费
export const SET_AUTO_RENEW = '/client/domainSafe/setAutoRenew' + suffix
// 设置域名禁止更新
export const SET_PROHIBIT_UPDATE = '/client/domainSafe/setProhibitUpdate' + suffix
// 购买域名注册局锁定
export const BUY_BACKEND_LOCK = '/client/domainSafe/buyBackendLock' + suffix
// 续费域名注册局锁定
export const RENEW_BACKEND_LOCK = '/client/domainSafe/renewBackendLock' + suffix
// 域名实名制列表
export const QUERY_DOMAIN_VERIFY_LIST = '/client/domainVerify/domainVerifyList' + suffix
// 提交域名实名资料
export const SUBMIT_DOMAIN_VERIFY = '/client/domainVerify/uploadDomainVerify' + suffix
// 上传域名实名资料
export const UPLOAD_FILE_DOMAIN_VERIFY = '/client/domainVerify/uploadfile' + suffix
// 更新域名审核状态
export const UPDATE_DOMAIN_AUDIT_STATUS = '/client/domainVerify/updateDomainAuditStatus' + suffix
