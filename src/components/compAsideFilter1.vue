<template lang="pug">
div
  Checkbox.checkBoxAll(
    :indeterminate="indeterminate",
    :value="checkAll",
    @click.prevent.native="handleCheckAll"
  ) 全选

  CheckboxGroup(v-model="value", @on-change="checkboxChange",)
    Checkbox(v-for="item in filterData", :label="item.label",)
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
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'

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
      if (data.length === this.len) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
      this.filterData.map((v, i)=>{
        if (data.indexOf(v.label) >= 0) {
          this.$set(v, 'checked', true)
        } else {
          this.$set(v, 'checked', false)
        }
      })
    },
    handleClose (event, name) {
      const index = this.filterData.findIndex((item)=>(item.value === name))
      this.$set(this.filterData[index], 'checked', false)

      let arr = []
      for (var i=0; i<this.filterData.length; i++) {
        if (this.filterData[i].checked) {
          arr.push(this.filterData[i].label)
        }
      }
      this.value = arr

      if (this.value.length === this.len) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (this.value.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.value = this.filterData.map((v)=>{
          return v.label
        })
        this.filterData.map((v, i)=>{
          this.$set(v, 'checked', true)
        })
      } else {
        this.value = []
        this.filterData.map((v, i)=>{
          this.$set(v, 'checked', false)
        })
      }
    }
  },
  computed: {

  },
  beforeMount () {
    this.len = this.filterData.length

    if (this.filterData.length > 0) {
      let arr = []
      for (var i=0; i<this.filterData.length; i++) {
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

  }
}
</script>
<style>

</style>