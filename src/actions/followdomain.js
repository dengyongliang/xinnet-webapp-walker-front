'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 关注域名管理-域名列表
export const FOLLOW_DOMAIN_LIST = '/client/followdomain/followDomainList' + suffix
// 关注域名管理-导出域名
export const FOLLOW_DOMAIN_EXPORT = '/client-api/client/followdomain/followDomainExport' + suffix
// 关注域名管理-详情
export const FOLLOW_DOMAIN_INFO = '/client/followdomain/followDomainInfo' + suffix
// 关注域名管理-域名监控记录
export const FOLLOW_RECORD_LIST = '/client/followdomain/followRecordList' + suffix
// 关注域名管理-导出域名监控记录
export const FOLLOW_RECORD_EXPORT = '/client-api/client/followdomain/followRecordExport' + suffix
// 关注域名管理-品牌列表
export const FOLLOW_BRAND_LIST = '/client/followdomain/followBrandList' + suffix
// 关注域名管理-统计关注域名
export const REPORT_FOLLOW_RECORD = '/client/followdomain/reportfollowRecord' + suffix
// 关注域名报告-异常域名清单
export const EXCEP_FOLLOW_RECORD_LIST = '/client/followdomain/excepfollowRecordList' + suffix
// 关注域名报告-异常域名清单
export const EXCEP_FOLLOW_RECORD_EXPORT = '/client-api/client/followdomain/excepfollowRecordExport' + suffix
// 监控域名管理-设置品牌
export const CREATE_BRAND = '/client/followdomain/createBrand' + suffix
// 监控域名管理-修改品牌
export const UPDATE_BRAND = '/client/followdomain/updateBrand' + suffix
// 监控域名管理-删除品牌
export const DELETE_BRAND = '/client/followdomain/deleteBrand' + suffix
// 监控域名管理-添加域名
export const CREATE_DOMAIN = '/client/followdomain/createDomain' + suffix
// 监控域名管理-移除域名
export const DELETE_DOMAIN = '/client/followdomain/deleteDomain' + suffix
// 监控域名管理-查询品牌
export const QUERY_BRAND = '/client/followdomain/queryBrand' + suffix
