<template lang="pug">
.compAsideFilter3
  ul.ulLv1
    li(v-for="(item, index) in filterData")
      a(@click="showLv2(index)") {{item.value}} >
      .tag
        Tag(
          ref="tag",
          v-for="group in item.groups",
          :key="group.label",
          :name="group.value+'_'+index",
          v-if="group.checked",
          closable,
          @on-close="handleClose"
        ) {{ group.value }}

  Drawer(title="", width="220", :closable="false", v-model="showDrawer", :inner="true", :transfer="false", :mask="false", :scrollable="true")
    h3.h3T
      a.back(@click="hideLv2") < 完成
    .lv2(v-if="showDrawer")
      Checkbox.checkBoxAll(
        :indeterminate="indeterminate",
        :value="checkAll",
        @click.prevent.native="handleCheckAll"
      ) 全选
      CheckboxGroup(v-model="valueLv2", @on-change="checkboxChange")
        Checkbox(v-for="item in dataLv2", :label="item.label", :key="item.label")
          span {{item.value}}
</template>

<script>
export default {
  components: {

  },
  props: {
    from: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function
    },
    filterData: {
      type: Array,
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
      valueLv2: [],
      dataLv2: [],
      index: 0,
      showDrawer: false,
      indeterminate: false,
      checkAll: false
    }
  },
  methods: {
    handleClose (event, name) {
      let v = name.split('_')[0]
      let i = name.split('_')[1] * 1
      const index = this.filterData[i].groups.findIndex((item) => (item.value === v))
      this.$set(this.filterData[i].groups[index], 'checked', false)
      // this.$emit('changeData', {from: this.from, index: i, data:this.filterData, len: this.$refs.tag.length-1})
    },
    hideLv2 () {
      this.$set(this.filterData[this.index], 'groups', this.dataLv2)
      this.showDrawer = false
    },
    showLv2 (index) {
      this.index = index
      this.dataLv2 = this.filterData[index].groups
      let arr = []
      this.len = this.dataLv2.length
      for (var i = 0; i < this.len; i++) {
        if (this.dataLv2[i].checked) {
          arr.push(this.dataLv2[i].label)
        }
      }
      this.valueLv2 = arr
      this.showDrawer = true
      console.log(this.dataLv2)
      // 重置全选状态
      this.resetCheckAllState(this.valueLv2)
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.valueLv2 = this.dataLv2.map((v) => {
          return v.label
        })
        this.dataLv2.map((v, i) => {
          this.$set(v, 'checked', true)
        })
      } else {
        this.valueLv2 = []
        this.dataLv2.map((v, i) => {
          this.$set(v, 'checked', false)
        })
      }
    },
    checkboxChange (data) {
      this.resetCheckAllState(data)
      this.dataLv2.map((v, i) => {
        if (this.valueLv2.indexOf(v.label) >= 0) {
          this.$set(v, 'checked', true)
        } else {
          this.$set(v, 'checked', false)
        }
      })
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
    this.value = this.filterData.map((v) => {
      let arr = []
      for (var i = 0; i < v.groups.length; i++) {
        if (v.groups[i].checked) {
          arr.push(v.groups[i].label)
        }
      }
      return arr
    })
  },
  mounted () {
  },
  watch: {
    filterData: {
      handler (newV, oldV) {
        this.value = newV.map((v) => {
          let arr = []
          for (var i = 0; i < v.groups.length; i++) {
            if (v.groups[i].checked) {
              arr.push(v.groups[i].label)
            }
          }
          return arr
        })
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style>

</style>
