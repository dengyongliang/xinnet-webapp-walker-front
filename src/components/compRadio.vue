<template lang="pug">
  div.compRadio(style="display:inline-block")
    RadioGroup(v-model="value",@on-change="onChange",ref="radio",:name="name")
      Radio(v-for="item in list", :label="item.value.toString()", :key="item.value", :disabled="typeof(item.disabled)!=='undefined'?item.disabled:isDisabled",@click.native="getMoreParams(item)") {{item.label}}
    Alert(type="error",show-icon, style="display:inline-block",v-show="showError") {{errorText}}
</template>

<script>
export default {
  name: 'compSelect',
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
          data: []
        }
      }
    },
    from: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'radio'
    },
    defaultValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      time: '',
      showError: false,
      errorText: `请选择${this.label}！`,
      param: {}
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    onChange (v) {
      console.log(v)
      this.showError = false
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod({value: v})
      }
    },
    getMoreParams (param) {
      this.param = param
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
