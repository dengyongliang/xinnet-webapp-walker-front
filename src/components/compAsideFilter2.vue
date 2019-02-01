<template lang="pug">
div
  RadioGroup(v-model="value", @on-change="radioChange")
    Radio(v-for="item in filterData", :label="item.label", :key="item.label", v-if="item.label!=='custom'") {{item.value}}
    Radio(v-for="item in filterData", :label="item.label", :key="item.label", v-if="item.label==='custom'", disabled)
      DatePicker(type="daterange",placeholder="",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",:confirm="true", @on-open-change="dataChange")
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
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
      value: '',
      time: []
    }
  },
  methods: {
    radioChange (val) {
      this.filterData.map((v, i) => {
        if (v.label === this.value) {
          this.$set(v, 'checked', true)
        } else {
          this.$set(v, 'checked', false)
        }
      })
    },
    handleClose (event, name) {
      const index = this.filterData.findIndex((item) => (item.value === name))
      this.$set(this.filterData[index], 'checked', false)
      this.value = ''
    },
    dataChange (show) {
      // 日期关闭并有有效值
      if (!show && this.time[0] !== '' && this.time[1] !== '') {
        this.value = 'custom'
        for (var i = 0; i < this.filterData.length; i++) {
          if (this.filterData[i].label === 'custom') {
            this.$set(this.filterData[i], 'checked', true)
            this.$set(this.filterData[i], 'value', (this.time[0] + '-' + this.time[1]))
          } else {
            this.$set(this.filterData[i], 'checked', false)
          }
        }
      }
    }
  },
  computed: {

  },
  beforeMount () {
    if (this.filterData.length > 0) {
      for (var i = 0; i < this.filterData.length; i++) {
        if (this.filterData[i].checked) {
          this.value = this.filterData[i].label
        }
      }
    }
  },
  mounted () {
  },
  watch: {
    filterData: {
      handler (newV, oldV) {
        if (newV.length > 0) {
          let flag = false
          for (var i = 0; i < newV.length; i++) {
            if (newV[i].checked) {
              this.value = newV[i].label
              flag = true
            }
          }
          // 重置时没有选中项，默认值置为空
          if (!flag) {
            this.value = ''
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style>

</style>
