<template lang="pug">
  div.compTag(style="display:inline-block")
    Tag(
      v-for="item in list",
      :key="item.label",
      :name="item.value",
      closable,
      @on-close="handleClose"
    ) {{ item.value }}
</template>

<script>
export default {
  name: 'compSelect',
  props: {
    name: {
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
      default: 'tag'
    },
    onCallbackchange: {
      type: Function
    }
  },
  data () {
    return {
      value: '',
      time: '',
      showError: false,
      errorText: `请选择${this.label}！`
    }
  },
  methods: {
    handleAdd (type, idx) {
      if (this.count.length) {
        this.count.push(this.count[this.count.length - 1] + 1)
      } else {
        this.count.push(0)
      }
      if (this.onCallbackchange && typeof this.onCallbackchange === 'function') {
        this.onCallbackchange(this.value)
      }
    },
    handleClose (event, name) {
      const index = this.list.findIndex((item) => (item.value === name))
      // 改变原数组，以便同步更新checkbox选中项
      this.list.splice(index, 1)
    }
  },
  beforeMount () {
  },
  mounted () {

  },
  computed: {
  },
  watch: {

  }
}
</script>
