'use strict'
const IS_PWD_AVAILABLE = (val) => {
  var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/
  if (!reg.test(val)) {
    return false
  } else {
    return true
  }
}
const IS_PHONE_AVAILABLE = (str) => {
  var myreg = /^[1][0-9]{10}$/
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}
const IS_DOMAIN_AVAILABLE = (val) => {
  var reg = /^[0-9a-zA-Z\u4e00-\u9faf]+[0-9a-zA-Z\u4e00-\u9faf-]*\.[a-zA-Z\u4e00-\u9faf]{2,20}(?:\.[a-zA-Z\u4e00-\u9faf]{2,20})?$/
  if (!reg.test(val)) {
    return false
  } else {
    return true
  }
}
const IS_EMAIL_AVAILABLE = (val) => {
  var reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
  if (!reg.test(val)) {
    return false
  } else {
    return true
  }
}
// 是否包含中文
const IS_HAS_CHINESE = (val) => {
  let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
  if (reg.test(val)) {
    return true
  } else {
    return false
  }
}
// 是否包含英文
const IS_HAS_EN = (val) => {
  let reg = new RegExp('[A-Za-z]+', 'g')
  if (reg.test(val)) {
    return true
  } else {
    return false
  }
}
const IS_ALL_ENGLISH = (val) => {
  var re = new RegExp('^[a-zA-Z]+$')
  if (re.test(val)) {
    return true
  } else {
    return false
  }
}
const IS_ALL_CHINESE = (val) => {
  var re = new RegExp('^[\\u4E00-\\u9FFF]+$')
  if (re.test(val)) {
    return true
  } else {
    return false
  }
}
const REG_CH_EN_NUM = (val) => {
  var re = new RegExp('^[A-z0-9\\u4e00-\\u9fa5]*$')
  if (re.test(val)) {
    return true
  } else {
    return false
  }
}
const REG_CH_EN_NUM_MIDLINE = (val) => {
  var re = new RegExp('^[A-z0-9-\\u4e00-\\u9fa5]*$')
  if (re.test(val)) {
    return true
  } else {
    return false
  }
}
const TRIM_ALL = (val) => {
  return val.replace(/\s+/g, '')
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
    // const checked = item[ map.checked ] ? true : false
    let checked = item[ map.checked ]
    // const disabled = item.groups ? (map.disabled_lv1 === true ? true : false) : (map.disabled_lv2 === true ? true : false)
    const disabled = item.groups ? map.disabled_lv1 : map.disabled_lv2
    let children = item[ map.children ]

    // 如果有子节点，递归
    if (children) {
      // iview 父节点没有checked字段，所以默认设为false
      // 设为true, 会影响子节点的选中状态
      checked = false
      children = CONVERT_TREE(children, map)
    }
    result.push({
      title: title,
      label: label,
      expand: true,
      checked: checked,
      disabled: disabled,
      children: children
    })
  })
  console.log(result)
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
    const label = item[ map.label ] + '_' + item[ map.code ]
    const value = item[ map.value ]
    let disabled = false
    if (typeof map.disabled !== 'undefined') {
      // var disabled = item[ map.disabled ] ? true : false
      disabled = item[ map.disabled ]
    }
    result.push({
      label,
      value,
      disabled
    })
  })
  return result
}
function CONVERT_RADIO (roles, map) {
  const result = []
  // 遍历 roles
  roles.forEach((item) => {
    // 读取 map 的键值映射
    const label = item[ map.label ]
    const code = item[ map.code ]
    const value = item[ map.value ]
    let disabled = false
    if (typeof map.disabled !== 'undefined') {
      // 1 可以选，0 不可以选
      disabled = !item[map.disabled]
    }
    result.push({
      label,
      code,
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
function CONVERT_CHECKBOX (data, map) {
  const result = []
  data.forEach((item) => {
    const label = item[ map.label ]
    const value = item[ map.value ] + ''
    const checked = item[ map.checked ]

    result.push({
      label,
      value,
      checked
    })
  })
  return result
}
export default
{
  IS_PWD_AVAILABLE,
  IS_DOMAIN_AVAILABLE,
  IS_PHONE_AVAILABLE,
  IS_EMAIL_AVAILABLE,
  IS_HAS_CHINESE,
  IS_HAS_EN,
  IS_ALL_CHINESE,
  IS_ALL_ENGLISH,
  REG_CH_EN_NUM,
  REG_CH_EN_NUM_MIDLINE,
  TRIM_ALL,
  CONVERT_TREE,
  CONVERT_ROLES,
  CONVERT_TREE_CHECKED_TRUE,
  CONVERT_TREE_CHECKED_FALSE,
  CONVERT_SELECT,
  CONVERT_SELECT_GROUP,
  CONVERT_CHECKBOX,
  CONVERT_RADIO
}
