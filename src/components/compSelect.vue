<template lang="pug">
  div.compSelect(style="display:inline-block")
    slot(name="left")
    Select(
      v-model="value",
      :filterable="filterable",
      :style="styles",
      :multiple="multiple",
      :name="name",
      @on-change="selectChange",
      :placeholder="placeholder",
      :class="{ 'error': showError }",
      :label-in-value="labelInValue",
      :disabled="disabled"
    )
      Option(
        v-if="!optionGroup",
        v-for="item in list",
        :value="item.value",
        :key="item.value",
        @click.native="getMoreParams(item)"
      ) {{ item.label }}

      OptionGroup(
        v-if="optionGroup",
        :label="item.label",
        :key="item.label",
        v-for="item in list"
      )
        Option(
          v-if="item.children.length > 0",
          v-for="item2 in item.children",
          :value="item2.value",
          :key="item2.value",
          @click.native="getMoreParams(item2, item)"
        ) {{item2.label}}
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      showError: false,
      errorText: `请选择${this.label}！`,
      param: {},
      group: {}
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
    getMoreParams (param, group) {
      this.param = param
      if (group) {
        this.group = group
      }
      console.log(this.group)
    }
  },
  beforeMount () {
  },
  mounted () {
    if (this.defaultValue !== '') {
      if (this.multiple) {
        this.value = this.defaultValue.split(',')
      } else {
        this.value = this.defaultValue
        this.param = this.list.filter((v) => {
          return this.defaultValue === v.value.toString()
        })[0]
        console.log(this.param)
      }
    }
    // if (this.defaultValue !== '') {
    //   this.value = this.defaultValue
    // }
    // if (this.defaultLabel !== '') {
    //   this.param.label = this.defaultLabel
    // }
    // if (this.defaultCode !== '') {
    //   this.param.code = this.defaultCode
    // }
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
