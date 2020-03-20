<template lang="pug">
div(class="compDatePicker")
  slot(name="left")
  DatePicker(
    :type="types",
    :placeholder="placeholder",
    :validate="validate",
    v-model = "value",
    :style="styles",
    :format="format",
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
    defaultValue: {
      type: Array,
      default: function () {
        return []
      }
    },
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
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    types: {
      type: String,
      default: 'daterange'
    }
  },
  data () {
    return {
      value: this.types === 'date' ? '' : [],
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

  },
  mounted () {
    if (this.defaultValue.length > 0) {
      console.log(this.defaultValue)
      this.value = this.defaultValue
    }
  },
  watch: {
    defaultValue: {
      handler (newV, oldV) {
        if (this.types === 'date') {
          this.value = newV.join('')
        } else {
          this.value = newV
        }
      },
      deep: true
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
