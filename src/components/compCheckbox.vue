<template lang="pug">
div.compCheckbox(style="display:inline-block")
  CheckboxGroup(v-model="value")
    Checkbox(v-for="item in list", :label="item.label")
      span {{item.value}}
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
    isDisabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: function () {
        return {
          data: [
            {
              label: 'box1',
              value: 'box1'
            },
            {
              label: 'box2',
              value: 'box2'
            }
          ]
        }
      }
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    defaultValue: {
      type: Array,
      default: function () {
        return {
          data: [
          ]
        }
      }
    }
  },
  data () {
    return {
      value: [],
      showError: false,
      errorText: `请选择${this.label}！`
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    onChange (v) {
      this.showError = false
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod(this.value)
      }
    }
  },
  beforeMount () {
    if (this.defaultValue !== '') {
      this.value = this.defaultValue
    }
  },
  mounted () {

  },
  computed: {
  },
  watch: {
    defaultValue (val) {
      this.value = val
    }
  }
}
</script>
