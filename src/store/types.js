export const LOGIN_VERIFICATIONCODE = 'loginVerificationCode'
export const LOGIN_SUBMIT = 'loginSubmit'
export const LOGIN_OUT = 'loginOut'
export const SHOW_BODY_SPIN = 'showBodySpin'
export const GET_CURRENT_USER_DATA = 'getCurrentUserData'
export const SET_CURRENT_USER_DATA = 'setCurrentUserData'
export const GET_OLD_PHONE_CODE = 'getOldPhoneCode'
export const GET_UPDATE_PHONE_CODE = 'getUpdatePhoneCode'
export const CHECK_OLD_PHONE_CODE = 'checkOldPhoneCode'
export const GET_USER_ROLES = 'getUserRoles'
export const GET_USERS = 'getUsers'
export const GET_COMPANYS = 'getCompanys'
export const GET_USER_AUTH_GROUPS = 'getUserAuthGroups'
export const SET_USER_ROLES = 'setUserRoles'
export const SET_USERS = 'setUsers'
export const SET_COMPANYS = 'setCompanys'
export const SET_USER_AUTH_GROUPS = 'setUserAuthGroups'
export const SET_USER_AUTH_GROUPS_ORIGINAL = 'userAuthGroupsOriginal'
export const SET_LOGINED = 'setLogined'
export const SET_PAY_ORDERS = 'setPayOrders'
export const SET_PAY_ORDERS_FINISH = 'setPayOrdersFinish'
export const CLEAR_PAY_DATA = 'clearPayData'
export const ORDER_SETTLEMENT = 'orderSettlement'
export const BUY_BACKEND_LOCK = 'buyBackendLock'
export const RENEW_BACKEND_LOCK = 'renewBackendLock'
export const GET_DOMAIN_MGMT_V_CODE = 'getDomainMgmtVCode'

// 激活
export const CHECK_VALID_USER = 'checkValidUser'
export const SET_ACTIVATION_DATA = 'setActivationData'
export const CLEAR_ACTIVATION_DATA = 'clearActivationData'
export const ACTIVATION_VERIFICATIONCODE = 'activationVerificationCode'
export const SUBMIT_ACTIVATION_USER_INFO = 'submitActivationUserInfo'
export const SUBMIT_ACTIVATION_USER_PWD = 'submitActivationUserPwd'
// 管家管理的客户列表
export const QUERY_USER_CUSTOMERS_LIST = 'queryUserCustomersList'
export const CHANGE_CUSTOMERS = 'changeCustomers'

// 财务管理
export const FINANCE_PAY_STATISTICS = 'financePayStatistics'
export const FINANCE_PAY_STATISTICS_TREND = 'financePayStatisticsTrend'
export const QUERY_FINANCE_CUSTOMER_FLOW_LIST = 'queryFinanceCustomerFlowList'
export const QUERY_PAY_STATISTICS_BALANCE = 'queryPayStatisticsBalance'
export const PAY_STATISTICS_UNBILLED = 'payStatisticsUnBilled'
export const PAY_STATISTICS_HISTORY_BILL = 'payStatisticsHistoryBill'

// 角色管理
export const QUERY_ROLE_LIST = 'queryRoleList'
export const QUERY_ROLE_MENUS = 'queryRoleMenus'
export const ROLE_CREATE = 'roleCreate'
export const ROLE_UPDATE = 'roleUpdate'
export const ROLE_DELETE = 'roleDelete'

// 企业管理
export const QUERY_COMPANY_LIST = 'queryCompanyList'
export const CREATE_COMPANY = 'createCompany'
export const QUERY_COMPANY_INFO = 'queryCompanyInfo'
export const CREATE_GROUP = 'createGroup'
export const UPDATE_GROUP = 'updateGroup'
export const DELETE_GROUP = 'deleteGroup'
export const UPDATE_COMPANY = 'updateCompany'
export const DELETE_COMPANY = 'deleteCompany'

// 账号管理
export const QUERY_USER_LIST = 'queryUserList'
export const UPDATE_USER_INFO = 'updateUserInfo'
export const UPDATE_USER_TEL = 'updateUserTel'
export const UPDATE_USER_MOBILE = 'updateUserMobile'
export const UPDATE_USER_PASSWORD = 'updateUserPassword'
export const ADD_USER = 'addUser'
export const DELETE_USER_INFO = 'deleteUserInfo'
export const QUERY_USER_INFO = 'queryUserInfo'
export const UPDATE_USER_AUTH = 'updateUserAuth'
export const UPDATE_USER = 'updateUser'

// 订单管理
export const QUERY_ORDER_LIST = 'queryOrderList'
export const EXPORT_ORDER_LIST = 'exportOrderList'

// 工单管理
export const QUERY_WORK_ORDER_MANAGE_LIST = 'queryWorkOrderManageList'
export const SUBMIT_WORK_ORDER = 'submitWorkOrder'
export const QUERY_WORK_ORDER_DETAIL = 'queryWorkOrderDetail'
export const QUERY_USER_COMPANYS = 'queryUserCompanys'

// 域名管理
export const QUERY_TEMPLATE_LIST = 'queryTemplateList'
export const CREATE_TEMPLATE = 'createTemplate'
export const UPDATE_TEMPLATE = 'updateTemplate'
export const SUBMIT_TEMPLATE = 'submitTemplate'
export const DELETE_TEMPLATE = 'deleteTemplate'
export const QUERY_TEMPLATE_INFO = 'queryTemplateInfo'
export const QUERY_VERIFY_INFO = 'queryVerifyInfo'
export const QUERY_CHANGE_LIST = 'queryChangeList'
export const QUERY_TRANSFER_IN_LIST = 'queryTransferInList'
export const QUERY_TEMPLATES = 'queryTemplates'
export const QUERY_ORDER_CONFIRM = 'queryOrderConfirm'
export const SUBMIT_CHANGE = 'submitChange'
export const QUERY_CHANGE_INFO = 'queryChangeInfo'
export const SUBMIT_TRANSFER_IN = 'submitTransferIn'
export const QUERY_DOMAIN_VERIFY_LIST = 'queryDomainVerifyList'
export const SUBMIT_DOMAIN_VERIFY = 'submitDomainVerify'
export const UPDATE_DOMAIN_AUDIT_STATUS = 'updateDomainAuditStatus'
export const QUERY_DOMAIN_SAFE_LIST = 'queryDomainSafeList'
export const SET_PROTECT_LEVEL = 'setProtectLevel'
export const SET_AUTO_RENEW = 'setAutoRenew'
export const SET_PROHIBIT_UPDATE = 'setProhibitUpdate'
export const QUERY_DOMAIN_LIST = 'queryDomainList'
export const QUERY_DOMAIN_MANAGE_DETAIL = 'queryDomainManageDetail'
export const SET_DOMAIN_GROUP = 'setDomainGroup'
export const SUBMIT_MOD_DOMAIN_REG_USER = 'submitModDomainRegUser'
export const SUBMIT_MOD_DOMAIN_ADM_USER = 'submitModDomainAdmUser'
export const SET_DOMAIN_DNS = 'setDomainDns'
export const ORDER_PAY_DOMAIN_RENEW = 'orderPayDomainRenew'
export const OVERVIEW_DOMAIN_STATISTICS = 'overviewDomainStatistics'
export const OVERVIEW_DOMAIN_COUNT_STATISTICS = 'overviewDomainCountStatistics'
export const OVERVIEW_TEMPLATE_STATISTICS = 'overviewTemplateStatistics'
export const OVERVIEW_BACKEND_LOCK_STATISTICS = 'overviewBackendLockStatistics'
export const OVERVIEW_DOMAIN_VERIFY_STATISTICS = 'overviewDomainVerifyStatistics'
export const OVERVIEW_DOMAIN_RENEW_STATISTICS = 'overviewDomainRenewStatistics'
export const OVERVIEW_DOMAIN_TRANSFER_IN_STATISTICS = 'overviewDomainTransferInStatistics'
export const OVERVIEW_DOMAIN_CHANGE_STATISTICS = 'overviewDomainChangeStatistics'

// 首页
export const INDEX_MY_COMPANY = 'indexMyCompany'
export const INDEX_MY_KEEPER = 'indexMyKeeper'
export const INDEX_DOMAIN_STATISTICS = 'indexDomainStatistics'
export const INDEX_COMPANY_STATISTICS = 'indexCompanyStatistics'
export const INDEX_USER_STATISTICS = 'indexUserStatistics'
export const INDEX_PAY_STATISTICS_UNBILLED = 'indexPayStatisticsUnBilled'
export const INDEX_PAY_STATISTICS_HISTORY_BILL = 'indexPayStatisticsHistoryBill'
export const INDEX_ACCOUNT_STATISTICS = 'indexAccountStatistics'

// 监控通知
export const QUERY_MAIL_MANAGE = 'queryMailManage'
// 监控通知通知标记已读
export const SET_MAIL_RECORD_READ = 'setMailRecordRead'
// 监控通知通知设置(新增或更新)
export const SET_NOTIFY = 'setNotify'
// 监控通知通知设置详情
export const QUERY_NOTIFY_DETAIL = 'queryNotifyDetail'

// 域名监控日志管理列表
export const QUERY_DOMAIN_MONITOR_MANAGE = 'queryDomainMonitorManage'
// 员工监控日志管理列表
export const QUERY_USER_MONITOR_MANAGE = 'queryUserMonitorManage'
// 自有监控报告数量预览
export const QUERY_DOMAIN_MONITOR_CHANGE_REPORT = 'queryDomainMonitorChangeReport'
// 自有监控报告域名安全
export const QUERY_DOMAIN_MONITOR_SAFE_REPORT = 'queryDomainMonitorSafeReport'
// 自有监控报告到期时间
export const QUERY_DOMAIN_MONITOR_EXPIRE_REPORT = 'queryDomainMonitorExpireReport'

// 域名资产报告(资产概况)
export const QUERY_DOMAIN_ASSETS_VIEW_REPORT = 'queryDomainAssetsViewReport'
// 域名资产报告(域名所属公司柱状图)
export const QUERY_DOMAIN_COMPANY_VIEW_REPORT = 'queryDomainCompanyViewReport'
// 域名资产报告(域名后缀分布柱状图)
export const QUERY_DOMAIN_SUFFIX_VIEW_REPORT = 'queryDomainSuffixViewReport'
// 域名资产报告(域名安全保护一般保护概览柱状图)
export const QUERY_DOMAIN_SAFE_NORMAL_REPORT = 'queryDomainSafeNormalReport'
// 域名资产报告(域名安全保护重要保护概览柱状图)
export const QUERY_DOMAIN_SAFE_IMPORTANT_REPORT = 'queryDomainSafeImportantReport'
// 域名资产报告(域名安全保护统计)
export const QUERY_DOMAIN_SAFE_RATE_REPORT = 'queryDomainSafeRateReport'

// 自有监控
// 监控通知管理列表
export const QUERY_MAIL_MANAGE_TOP = 'queryMailManageTop'
// 域名监控列表
export const QUERY_DOMAIN_MONITOR = 'queryDomainMonitor'
// 域名监控详情(域名信息)
export const QUERY_DOMAIN_MONITOR_DETAIL = 'queryDomainMonitorDetail'
// 域名监控详情(域名监控日志)
export const QUERY_DOMAIN_MONITOR_LOG = 'queryDomainMonitorLog'
