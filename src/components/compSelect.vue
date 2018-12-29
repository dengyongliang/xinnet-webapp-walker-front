<template lang="pug">
  div.compSelect(style="display:inline-block")
    slot(name="left")
    Select(v-model="value",:filterable="filterable",:style="styles",:name="name",@on-change="selectChange",:placeholder="placeholder",:class="{ 'error': showError }", :label-in-value="labelInValue")
      Option(v-if="!optionGroup", v-for="item in list",:value="item.value", @click.native="getMoreParams(item)") {{ item.label }}

      OptionGroup(v-if="optionGroup", :label="item.label", v-for="item in list")
        Option(v-if="item.children.length>0", v-for="item2 in item.children",:value="item2.value", @click.native="getMoreParams(item2)") {{ item2.label }}
    slot(name="right")
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
    label: {
      type: String,
      default: ''
    },
    optionGroup: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    labelInValue: {
      type: Boolean,
      default: false
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
      default: 'select'
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
      type: String,
      default: ''
    },
    defaultLabel: {
      type: String,
      default: ''
    },
    defaultCode: {
      type: String,
      default: ''
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      showError: false,
      errorText: `请选择${this.label}！`,
      param: {}
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    selectChange (val) {
      this.showError = false
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod(this.value)
      }
    },
    getMoreParams (param) {
      this.param = param
    }
  },
  beforeMount () {
  },
  mounted () {
    if (this.defaultValue !== '') {
      this.value = this.defaultValue
    }
    if (this.defaultLabel !== '') {
      this.param.label = this.defaultLabel
    }
    if (this.defaultCode !== '') {
      this.param.code = this.defaultCode
    }
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
