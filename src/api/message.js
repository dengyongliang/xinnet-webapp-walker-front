'use strict'
import axios from '@/global/axios.js'
import * as action from '@/actions/message'

// 激活验证码
export const ACTIVATION_CODE = (userMobile) => {
  return axios({
    url: action.ACTIVATION_CODE,
    method: 'GET',
    data: {userMobile}
  })
}
// 登录_获取验证码
export const CLIENT_LOGIN = (userCode) => {
  return axios({
    url: action.CLIENT_LOGIN,
    method: 'GET',
    data: {userCode}
  })
}
// 发送原手机号的验证码
export const SEND_OLD_PHONE_CODE = () => {
  return axios({
    url: action.SEND_OLD_PHONE_CODE,
    method: 'GET',
    data: {}
  })
}
// 发送修改手机号码验证码
export const UPDATE_PHONE_CODE = (userMobile) => {
  return axios({
    url: action.UPDATE_PHONE_CODE,
    method: 'GET',
    data: {userMobile}
  })
}
// 验证原手机号的验证码
export const CHECK_OLD_PHONE_CODE = (verificationCode) => {
  return axios({
    url: action.CHECK_OLD_PHONE_CODE,
    method: 'GET',
    data: {verificationCode}
  })
}
// 发送验证码到域名分组管理人手机
export const DOMAIN_MANAGE = (domainId) => {
  return axios({
    url: action.DOMAIN_MANAGE,
    method: 'GET',
    data: {domainId}
  })
}
