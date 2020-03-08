<template lang="pug">
div(class="compDatePicker")
  slot(name="left")
  DatePicker(
    type="date",
    :placeholder="placeholder",
    :validate="validate",
    v-model = "value",
    :style="styles",
    @on-change="onChange",
    :class="{ 'error': showError }"
  )
  slot(name="right")
  Alert(type="error",show-icon, style="display:inline-block",v-show="showError",ref="msgError") {{errorText}}
</template>

<script>
export default {
  name: 'compDatePicker',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    defaultValue: String,
    maxLength: Number,
    placeholder: String,
    styles: {
      type: String,
      default: 'width:240px'
    },
    validate: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      value: '',
      errorText: '',
      showError: false
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
      this.errorText = v.text ? v.text : ''
    },
    onChange () {
      this.showError = false
    }
  },
  computed: {
  },
  beforeMount () {
    if (this.defaultValue) {
      this.value = this.defaultValue
    }
  },
  watch: {
    defaultValue (val) {
      this.value = val
    }
  }
}
</script>

<style>
.compDatePicker .iconleft{
  position:absolute;
  top: 15px;
  left:20px;
  z-index:1;
  color:#bcbcbc;
}
.compDatePicker .error .ivu-input{
  border-color: #f00!important;
}
</style>
