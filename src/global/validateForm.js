import GLOBAL from './global'
export default function validateFormResult (validateArray) {
  let len = validateArray.length
  let flag = true
  for (var i = 0; i < len; i++) {
    let v = validateArray[i]
    if (v.type === 'text' || v.type === 'textarea') {
      let value = v.value
      let required = v.required
      let label = v.label
      let validate = v.validate
      if (value === '' && required) {
        v.showValidateResult({text: '请输入' + (label || '') + '！'})
        flag = false
        // break
      } else {
        if (validate === 'number') {
          if (isNaN(value)) {
            v.showValidateResult({text: '只允许输入数字！'})
            flag = false
          }
        }
        if (validate === 'email') {
          if (!GLOBAL.IS_EMAIL_AVAILABLE(value)) {
            v.showValidateResult({text: '请输入正确的邮件地址，如xinnet@xinnet.com！'})
            flag = false
            // break
          }
        }
        if (validate === 'mobile') {
          if (!GLOBAL.IS_PHONE_AVAILABLE(value)) {
            v.showValidateResult({text: '请输入11位的手机号码！'})
            flag = false
            // break
          }
        }
      }
    } else if (v.type === 'select') {
      let value = v.value
      if (value === '') {
        v.showValidateResult()
        flag = false
        // break
      }
    } else if (v.type === 'cascader') {
      let value = v.value
      if (!value.length || (!value[0] && !value[1])) {
        v.showValidateResult()
        flag = false
        // break
      }
    } else if (v.type === 'upload') {
      console.log(v)
      let value = v.$refs.upload.fileList
      if (!value.length) {
        v.showValidateResult()
        flag = false
        // break
      }
    } else if (v.type === 'radio') {
      let value = v.value
      if (!value.length) {
        v.showValidateResult()
        flag = false
        // break
      }
    } else if (v.type === 'rePassword') {
      let password = v.$refs.password.value
      let rePassword = v.$refs.rePassword.value
      console.log(v.$refs.password)
      if (password === '') {
        v.showValidateResult1({text: '请输入密码！'})
        flag = false
      } else {
        if (!GLOBAL.IS_PWD_AVAILABLE(password)) {
          flag = false
          v.showValidateResult1({text: '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'})
        }
      }
      if (rePassword === '') {
        flag = false
        v.showValidateResult2({text: '请输入密码！'})
      } else {
        if (!GLOBAL.IS_PWD_AVAILABLE(rePassword)) {
          flag = false
          v.showValidateResult2({text: '密码由8-16位字母、数字、符号组成，区分大小写，且至少包含有字母、数字、符号、大小写中的两种组合！'})
        }
        if (GLOBAL.IS_PWD_AVAILABLE(rePassword) && password !== rePassword) {
          flag = false
          v.showValidateResult2({text: '重复输入密码与新密码不一致！'})
        }
      }
    } else if (v.type === 'threeInput') {
      if (!v.value1 || !v.value2 || !v.value3) {
        [v.showError1, v.showError2, v.showError3] = [true, true, true]
        v.errorText = `请填写！`
        flag = false
      } else {
        if (isNaN(v.value1)) {
          flag = false
          v.showError1 = true
          v.errorText = `${v.label1}只允许输入数字`
        }
        if (isNaN(v.value2)) {
          flag = false
          v.showError2 = true
          v.errorText += v.errorText.length ? ` - ${v.label2}只允许输入数字` : `${v.label2}只允许输入数字`
        }
        if (isNaN(v.value3)) {
          flag = false
          v.showError3 = true
          v.errorText += v.errorText.length ? ` - ${v.label3}只允许输入数字` : `${v.label3}只允许输入数字`
        }
      }
    }
  }
  return flag
}
