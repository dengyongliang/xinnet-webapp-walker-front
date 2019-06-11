'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'

// 激活验证码
export const ACTIVATION_CODE = '/server/message/send/activationCode' + suffix // ACTIVATION_VERIFICATIONCODE
// 登录_获取验证码
export const CLIENT_LOGIN = '/server/message/send/clientLogin' + suffix // LOGIN_VERIFICATIONCODE
// 发送原手机号的验证码
export const SEND_OLD_PHONE_CODE = '/server/message/send/oldPhoneCode' + suffix // GET_OLD_PHONE_CODE
// 发送修改手机号码验证码
export const UPDATE_PHONE_CODE = '/server/message/send/updatePhoneCode' + suffix // GET_UPDATE_PHONE_CODE
// 验证原手机号的验证码
export const CHECK_OLD_PHONE_CODE = '/server/message/check/oldPhoneCode' + suffix // CHECK_OLD_PHONE_CODE
// 发送验证码到域名分组管理人手机
export const DOMAIN_MANAGE = '/server/message/send/domainManage' + suffix // GET_DOMAIN_MGMT_V_CODE
// 发送修改密码验证码
export const SEND_UPDATE_PASSWORD = '/server/message/send/updatePassword' + suffix
// 验证修改密码验证码
export const CHECK_UPDATE_PASSWORD = '/server/message/check/updatePassword' + suffix
// 找回密码-发送验证码
export const SEND_FORGET_PASSWORD = '/server/message/send/forgetPassword' + suffix
// 找回密码-校验手机验证码
export const CHECK_FORGET_PASSWORD = '/server/message/check/forgetPassword' + suffix
