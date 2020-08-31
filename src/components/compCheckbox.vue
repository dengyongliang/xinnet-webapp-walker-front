<template lang="pug">
div.compCheckbox(style="display:inline-block")
  CheckboxGroup(v-model="value", @on-change="onChange",)
    Checkbox(v-for="item in list", :label="item.label", :key="item.label", :disabled="disabled")
      span {{item.value}}
    Alert(type="error",show-icon, style="display:inline-block",v-show="showError") {{errorText}}
  <div style="border-top: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;" v-show="showall && !disabled">
      Checkbox(:indeterminate="indeterminate", :disabled="disabled", :value="checkAll", @click.prevent.native="handleCheckAll") 全选
  </div>
</template>

<script>
export default {
  name: 'compCheckbox',
  props: {
    onParentmethod: {
      type: Function
    },
    name: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 99999
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    defaultValue: {
      type: Array,
      default: function () {
        return []
      }
    },
    showall: {
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
      errorText: `请选择${this.label}！`,
      indeterminate: false,
      checkAll: false
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    onChange (data) {
      this.showError = false
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod({from: this.from, value: this.value, index: this.index})
      }
      if (data.length === this.list.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    handleCheckAll () {
      this.showError = false
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.value = this.list.map((v) => {
          return v.label
        })
      } else {
        this.value = []
      }
    }
  },
  beforeMount () {
    if (this.defaultValue.length) {
      this.value = this.defaultValue
    }
  },
  mounted () {

  },
  computed: {
  },
  watch: {
    defaultValue (val) {
      if (val.length) {
        this.value = val
      } else {
        this.value = []
      }
    }
  }
}
</script>
