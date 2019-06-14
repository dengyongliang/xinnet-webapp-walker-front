<template lang="pug">
    div(style="inline-block",class="compThreeInput")
      slot(name="left")
      Input(
        type="text",
        :name="name1",
        :placeholder="placeholder1",
        :label="label1",
        :style="styles1",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="input1",
        :maxlength = "maxLength1",
        v-model = "value1",
        :required = "required1",
        :disabled = "disabled",
        :validate="validate1",
        :class="{ 'error': showError1 }"
      )
      span.text -
      Input(
        type="text",
        :name="name2",
        :placeholder="placeholder2",
        :label="label2",
        :style="styles2",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="input2",
        :maxlength = "maxLength2",
        v-model = "value2",
        :required = "required2",
        :disabled = "disabled",
        :validate="validate2",
        :class="{ 'error': showError2 }"
      )
      span.text -
      Input(
        type="text",
        :name="name3",
        :placeholder="placeholder3",
        :label="label3",
        :style="styles3",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="input3",
        :maxlength = "maxLength3",
        v-model = "value3",
        :required = "required3",
        :disabled = "disabled",
        :validate="validate3",
        :class="{ 'error': showError3 }"
      )
      slot(name="right")
      Alert(type="error",show-icon, style="display:inline-block",v-show="showError1 || showError2 || showError3",ref="msgError") {{errorText}}
</template>

<script>
export default {
  name: 'compThreeInput',
  props: {
    name1: {
      type: String,
      default: ''
    },
    name2: {
      type: String,
      default: ''
    },
    name3: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    label1: {
      type: String,
      default: ''
    },
    label2: {
      type: String,
      default: ''
    },
    label3: {
      type: String,
      default: ''
    },
    placeholder1: {
      type: String,
      default: ''
    },
    placeholder2: {
      type: String,
      default: ''
    },
    placeholder3: {
      type: String,
      default: ''
    },
    styles1: {
      type: String,
      default: 'width:40px'
    },
    styles2: {
      type: String,
      default: 'width:60px'
    },
    styles3: {
      type: String,
      default: 'width:152px'
    },
    defaultValue1: {
      type: String,
      default: ''
    },
    defaultValue2: {
      type: String,
      default: ''
    },
    defaultValue3: {
      type: String,
      default: ''
    },
    minLength1: {
      type: Number,
      default: 2
    },
    maxLength1: {
      type: Number,
      default: 3
    },
    minLength2: {
      type: Number,
      default: 3
    },
    maxLength2: {
      type: Number,
      default: 4
    },
    minLength3: {
      type: Number,
      default: 5
    },
    maxLength3: {
      type: Number,
      default: 8
    },
    required1: {
      type: Boolean,
      default: true
    },
    required2: {
      type: Boolean,
      default: true
    },
    required3: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validate1: {
      type: String,
      default: 'number'
    },
    validate2: {
      type: String,
      default: 'number'
    },
    validate3: {
      type: String,
      default: 'number'
    }
  },
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      errorText: '',
      showError1: false,
      showError2: false,
      showError3: false,
      type: 'threeInput'
    }
  },
  methods: {
    showValidateResult (v) {
      this['showError' + v.num] = true
      this.errorText = v.text
    },
    onFocus (e) {
      this.errorText = ''
      this.showError1 = false
      this.showError2 = false
      this.showError3 = false
    },
    onBlur (e) {
      if (this.value1 !== '' && isNaN(this.value1)) {
        this.showError1 = true
        this.errorText = `${this.label1}只允许输入数字`
      } else if (this.value1.length < this.minLength1) {
        this.showError1 = true
        this.errorText = `${this.label1}最少${this.minLength1}位`
      }
      if (this.value2 !== '' && isNaN(this.value2)) {
        this.showError2 = true
        this.errorText += this.errorText.length ? ` - ${this.label2}只允许输入数字` : `${this.label2}只允许输入数字`
      } else if (this.value2.length < this.minLength2) {
        this.showError2 = true
        this.errorText += this.errorText.length ? ` - ${this.label2}最少${this.minLength2}位` : `${this.label2}最少${this.minLength2}位`
      }
      if (this.value3 !== '' && isNaN(this.value3)) {
        this.showError3 = true
        this.errorText += this.errorText.length ? ` - ${this.label3}只允许输入数字` : `${this.label3}只允许输入数字`
      } else if (this.value3.length < this.minLength3) {
        this.showError3 = true
        this.errorText += this.errorText.length ? ` - ${this.label3}最少${this.minLength3}位` : `${this.label3}最少${this.minLength3}位`
      }
    }
  },
  computed: {
  },
  beforeMount () {
    this.value1 = this.defaultValue1
    this.value2 = this.defaultValue2
    this.value3 = this.defaultValue3
  },
  watch: {
    defaultValue1 (val) {
      this.value1 = val
    },
    defaultValue2 (val) {
      this.value2 = val
    },
    defaultValue3 (val) {
      this.value3 = val
    }
  }
}
</script>
<style scoped>
span.text{
  padding:0 10px 0 5px!important;
}
</style>
