<template lang="pug">
div
  Checkbox.checkBoxAll(
    :indeterminate="indeterminate",
    :value="checkAll",
    @click.prevent.native="handleCheckAll"
  ) 全选

  CheckboxGroup(v-model="value", @on-change="checkboxChange",)
    Checkbox(v-for="item in filterData", :label="item.label", :key="item.label")
      span {{item.value}}
  Tag(
    v-for="item in filterData",
    :key="item.label",
    :name="item.value",
    v-if="item.checked",
    closable,
    @on-close="handleClose"
  ) {{ item.value }}
</template>

<script>
export default {
  components: {

  },
  props: {
    onClose: {
      type: Function
    },
    filterData: {
      type: Array,
      len: 0,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
      value: [],
      indeterminate: false,
      checkAll: false
    }
  },
  methods: {
    checkboxChange (data) {
      // this.resetCheckAllState(data)
      this.filterData.map((v, i) => {
        if (data.indexOf(v.label) >= 0) {
          this.$set(v, 'checked', true)
        } else {
          this.$set(v, 'checked', false)
        }
      })
    },
    handleClose (event, name) {
      const index = this.filterData.findIndex((item) => (item.value === name))
      this.$set(this.filterData[index], 'checked', false)

      let arr = []
      for (var i = 0; i < this.filterData.length; i++) {
        if (this.filterData[i].checked) {
          arr.push(this.filterData[i].label)
        }
      }
      this.value = arr
      // this.resetCheckAllState(this.value)
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.value = this.filterData.map((v) => {
          return v.label
        })
        this.filterData.map((v, i) => {
          this.$set(v, 'checked', true)
        })
      } else {
        this.value = []
        this.filterData.map((v, i) => {
          this.$set(v, 'checked', false)
        })
      }
    },
    resetCheckAllState (data) {
      if (this.len === 0 && data.length === this.len) {
        this.indeterminate = false
        this.checkAll = false
      } else if (this.len > 0 && data.length === this.len) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    }
  },
  computed: {

  },
  beforeMount () {
    this.len = this.filterData.length

    if (this.len > 0) {
      let arr = []
      for (var i = 0; i < this.len; i++) {
        if (this.filterData[i].checked) {
          arr.push(this.filterData[i].label)
        }
      }
      this.value = arr
    }
  },
  mounted () {
  },
  watch: {
    filterData: {
      handler (newV, oldV) {
        this.len = newV.length

        if (this.len > 0) {
          let arr = []
          for (var i = 0; i < this.len; i++) {
            if (newV[i].checked) {
              arr.push(newV[i].label)
            }
          }
          this.value = arr
        }
        this.resetCheckAllState(this.value)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style>

</style>
