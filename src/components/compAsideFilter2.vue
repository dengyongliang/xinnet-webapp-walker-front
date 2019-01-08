<template lang="pug">
div
  RadioGroup(v-model="value", @on-change="radioChange")
    Radio(v-for="item in filterData", :label="item.label", v-if="item.label!=='custom'") {{item.value}}
    Radio(v-for="item in filterData", :label="item.label", v-if="item.label==='custom'", disabled)
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
      time: [],
      value2: ''
    }
  },
  methods: {
    radioChange (val) {
      this.filterData.map((v, i)=>{
        if (v.label === this.value) {
          this.$set(v, 'checked', true)
        } else {
          this.$set(v, 'checked', false)
        }
      })
      this.value2 = this.value
    },
    handleClose (event, name) {
      const index = this.filterData.findIndex((item)=>(item.value === name))
      this.$set(this.filterData[index], 'checked', false)
      this.value = ''
      this.value2 = ''
    },
    dataChange (show) {
      // 日期关闭并有有效值
      if (!show && this.time[0]!=="" && this.time[1]!=="") {
        this.value = 'custom'
        this.value2 = this.time[0]+','+this.time[1]
        for (var i=0; i<this.filterData.length; i++) {
          if (this.filterData[i].label === 'custom') {
            this.$set(this.filterData[i], 'checked', true)
            this.$set(this.filterData[i], 'value', (this.time[0]+'-'+this.time[1]))
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
      for (var i=0; i<this.filterData.length; i++) {
        if (this.filterData[i].checked) {
          this.value = this.filterData[i].label
          this.value2 = this.filterData[i].label
        }
      }
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