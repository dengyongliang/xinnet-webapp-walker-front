"use strict"
const TITLE = `行者`
const regPw = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/
const IS_PHONE_AVAILABLE = (str) => {
  var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}
const IS_EMAIL_AVAILABLE = (val) => {　　
  var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")  　　
  if (!reg.test(val)) {
    return false
  } else {
    return true
  }
}
const CRT_TIME_FORMAT = (val) => {
  if (val != null) {
    var date = new Date(val);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  } else {
    return ''
  }
}
const BUSINESS_LIST = {
  register: '域名注册',
  renew: '域名续费',
  repurchase: '域名回购',
  protection: '域名保护',
  transferIn: '域名转入'
}
const ORDER_GOODS_TYPE = {
  1: '域名注册',
  2: '域名续费',
  3: '域名回购',
  4: '域名保护',
  5: '域名转入'
}
const PAY_TYPE = {
  1: '预付款存入',
  2: '信用消费',
  3: '预付款消费',
  4: '退款',
  5: '结款',
  6: '信用额度增加'
}
const QUESTION_TYPE = {
  1: '委托注册',
  2: '域名回购',
  3: '安全问题',
  4: '财务问题',
  5: '托管域名信息修改及续费',
  6: '域名赎回',
  7: '注册局锁',
  8: '其它问题'
}
const QUESTION_MODIFY_TYPE = {
  1: '续费',
  2: '解析设置',
  3: '修改DNS',
  4: '修改域名信息',
  5: '过户',
  6: '其它'
}
const SECURITY_TYPE = {
  1: '域名解析被篡改',
  2: '账号登录异常',
  3: '域名过期未续费',
  4: '其他问题'
}
const REAL_NAME_VERIFY_STATUS = {
  0: '未提交资料',
  1: '审核中',
  2: '审核通过',
  3: '审核拒绝'
}
function ADD_DAY (day) {
  var now = new Date
  now.setDate(now.getDate() - day)
  return now
}
function CONVERT_TREE_CHECKED_TRUE (tree, key) {
  const result = []
  // 遍历 tree
  tree.forEach((item) => {
    item.checked = true
    let children = item[ key ]
    // 如果有子节点，递归
    if (children) {
      CONVERT_TREE_CHECKED_TRUE(children, key)
    }
    result.push(item)
  })
  return result
}
function CONVERT_TREE_CHECKED_FALSE (tree, key) {
  const result = []
  // 遍历 tree
  tree.forEach((item) => {
    item.checked = false
    let children = item[ key ]
    // 如果有子节点，递归
    if (children) {
      CONVERT_TREE_CHECKED_FALSE(children, key)
    }
    result.push(item)
  })
  return result
}
/**
 * tree 数据转换
 * @param  {Array} tree 待转换的 tree
 * @param  {Object} map  键值对映射
 * @return {Array}      转换后的 tree
 */
function CONVERT_TREE (tree, map) {
  const result = []
  // 遍历 tree
  tree.forEach((item) => {
    // 读取 map 的键值映射
    const title = item[ map.title ]
    const label = item[ map.label ]
    const checked = item[ map.checked ] ? true : false
    const disabled = item.lv===1 ? (map.disabled_lv1===true ? true : false) : (map.disabled_lv2===true ? true : false)
    let children = item[ map.children ]
    // 如果有子节点，递归
    if (children) {
      children = CONVERT_TREE(children, map)
    }
    result.push({
      title,
      label,
      expand: true,
      checked,
      disabled,
      children
    })
  })
  return result
}
/**
 * roles 数据转换
 * @param  {Array} roles 待转换的 roles
 * @param  {Object} map  键值对映射
 * @return {Array}      转换后的 roles
 */
function CONVERT_ROLES (roles, map) {
  const result = []
  // 遍历 roles
  roles.forEach((item) => {
    // 读取 map 的键值映射
    const label = item[ map.label ]+'_'+item[ map.code ]
    const value = item[ map.value ]
    if (typeof map.disabled !== 'undefined') {
      var disabled = item[ map.disabled ] ? true : false
    } else {
      var disabled = false
    }
    result.push({
      label,
      value,
      disabled
    })
  })
  return result
}
function CONVERT_SELECT (data, map) {
  const result = []
  data.forEach((item) => {
    const label = item[ map.label ]
    const code = item[map.code]
    const value = item[ map.value ] + ''
    // if (typeof map.code!=='undefined') {
    //   value = item[ map.value ]+'_'+item[ map.code ]
    // }
    result.push({
      label,
      value,
      code
    })
  })
  return result
}
function CONVERT_SELECT_GROUP (data, map) {
  const result = []
  data.forEach((item) => {
    const value = item[ map.value ]
    const label = item[ map.label ]
    let children = item[ map.children ]

    if (children) {
      children = CONVERT_SELECT_GROUP(children, map)
    } else {
      children = []
    }
    result.push({
      value,
      label,
      children
    })
  })
  return result
}

export default
{
  TITLE,
  regPw,
  IS_PHONE_AVAILABLE,
  IS_EMAIL_AVAILABLE,
  CRT_TIME_FORMAT,
  BUSINESS_LIST,
  ORDER_GOODS_TYPE,
  PAY_TYPE,
  ADD_DAY,
  CONVERT_TREE,
  CONVERT_ROLES,
  CONVERT_TREE_CHECKED_TRUE,
  CONVERT_TREE_CHECKED_FALSE,
  QUESTION_TYPE,
  QUESTION_MODIFY_TYPE,
  SECURITY_TYPE,
  CONVERT_SELECT,
  REAL_NAME_VERIFY_STATUS,
  CONVERT_SELECT_GROUP
}