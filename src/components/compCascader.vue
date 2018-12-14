<template lang="pug">
  div.compCascader
    slot(name="left")
    Cascader(v-model="value",:filterable="filterable",:style="styles",:name="name",@on-change="selectChange",:placeholder="placeholder",:class="{ 'error': showError }", :disabled="disabled", :data="list")
    slot(name="right")
    Alert(type="error",show-icon, style="display:inline-block",v-show="showError") {{errorText}}
</template>

<script>
export default {
  name: 'compCascader',
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    type: {
      type: String,
      default: 'cascader'
    },
    styles: {
      type: String,
      default: 'width:240px'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    defaultValue: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: [],
      showError: false,
      errorText: '请选择'+ this.label +'！',
      param: {}
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    selectChange (val) {
      this.showError = false
    }
  },
  beforeMount () {
  },
  mounted () {
    this.value = this.defaultValue
  },
  computed: {
  },
  watch: {
    defaultValue: {
      handler(newV, oldV) {
        this.value = newV
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
