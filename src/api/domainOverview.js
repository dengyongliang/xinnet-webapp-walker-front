'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/domainOverview'

// 域名总览-域名统计
export const DOMAIN_STATISTICS = (depositFlag) => {
  return axios({
    url: action.DOMAIN_STATISTICS,
    method: 'POST',
    data: {depositFlag}
  })
}
// 域名总览-数量变化总览
export const DOMAIN_COUNT_STATISTICS = (days) => {
  return axios({
    url: action.DOMAIN_COUNT_STATISTICS,
    method: 'POST',
    data: {days}
  })
}
// 域名总览-实名模板统计
export const TEMPLATE_STATISTICS = () => {
  return axios({
    url: action.TEMPLATE_STATISTICS,
    method: 'GET',
    data: {}
  })
}
// 域名总览-注册居锁统计
export const BACKEND_LOCK_STATISTICS = () => {
  return axios({
    url: action.BACKEND_LOCK_STATISTICS,
    method: 'GET',
    data: {}
  })
}
// 域名总览-实名认证统计
export const DOMAIN_VERIFY_STATISTICS = () => {
  return axios({
    url: action.DOMAIN_VERIFY_STATISTICS,
    method: 'GET',
    data: {}
  })
}
// 域名总览-急需续费域名统计
export const DOMAIN_RENEW_STATISTICS = () => {
  return axios({
    url: action.DOMAIN_RENEW_STATISTICS,
    method: 'GET',
    data: {}
  })
}
// 域名总览-转入中域名统计
export const DOMAIN_TRANSFER_IN_STATISTICS = () => {
  return axios({
    url: action.DOMAIN_TRANSFER_IN_STATISTICS,
    method: 'GET',
    data: {}
  })
}
// 域名总览-过户中域名统计
export const DOMAIN_CHANGE_STATISTICS = () => {
  return axios({
    url: action.DOMAIN_CHANGE_STATISTICS,
    method: 'GET',
    data: {}
  })
}
