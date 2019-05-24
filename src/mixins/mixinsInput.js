export default {
  components: {
  },
  props: {
    name: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String
    },
    styles: {
      type: String,
      default: 'width:240px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    propsShow: {
      type: Boolean,
      default: true// 父组件是否需子组件显示错误信息
    },
    // errorInCompInput: {
    //   type: Boolean,
    //   default: true
    // },
    onErrorparent: {
      type: Function
    },
    onFocusparent: {
      type: Function
    },
    defaultValue: String,
    maxLength: Number,
    placeholder: String,
    show: {
      type: Boolean,
      default: true
    },
    validate: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      errorText: '',
      showError: false
    }
  },
  computed: {

  },
  beforeMount () {
    if (this.defaultValue) {
      this.value = this.defaultValue
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
      this.errorText = v.text ? v.text : ''
    },
    onFocus (e) {
      this.errorText = ''
      this.showError = false
      if (typeof this.onFocusparent !== 'undefined') {
        this.onFocusparent()
      }
    },
    onBlur (e) {
      let val = this.value
      let validate = this.validate
      if (val !== '') {
        if (validate === 'number') {
          if (isNaN(val)) {
            this.showError = true
            this.errorText = '只允许输入数字！'
          }
        } else if (validate === 'email') {
          if (val !== '' && !this.GLOBALS.IS_EMAIL_AVAILABLE(val)) {
            this.showError = true
            this.errorText = '请输入正确的邮件地址，如xinnet@xinnet.com！'
          }
          if (val !== '' && !this.GLOBALS.IS_EMAIL_AVAILABLE(val) && val > 64) {
            this.showError = true
            this.errorText = '最多允许输入64个字符！！'
          }
        } else if (validate === 'mobile') {
          if (val !== '' && !this.GLOBALS.IS_PHONE_AVAILABLE(val)) {
            this.showError = true
            this.errorText = '请输入11位的手机号码！'
          }
        } else if (validate === 'hasChinese') {
          if (val !== '' && !this.GLOBALS.IS_HAS_CHINESE(val)) {
            this.showError = true
            this.errorText = '必须包含中文！'
          }
        } else if (validate === 'hasEn') {
          if (val !== '' && !this.GLOBALS.IS_HAS_EN(val)) {
            this.showError = true
            this.errorText = '必须包含英文！'
          }
        }
      }
      if (this.errorText) {
        if (typeof this.onErrorparent !== 'undefined') {
          this.onErrorparent(this.errorText)
        }
      }
    }
  },
  watch: {
    defaultValue (val) {
      this.value = val
    }
  }
}
