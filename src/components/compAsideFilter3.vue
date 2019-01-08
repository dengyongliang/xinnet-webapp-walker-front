<template lang="pug">
ul.ulLv1
  li(v-for="(item, index) in filterData")
    a(@click="showLv2Fun(index)") {{item.value}} >
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
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'

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
      value: []
    }
  },
  methods: {
    handleClose (event, name) {
      let v = name.split("_")[0]
      let i = name.split("_")[1] * 1
      const index = this.filterData[i].groups.findIndex((item)=>(item.value === v))
      this.$set(this.filterData[i].groups[index], 'checked', false)
      this.$emit("changeData", {from: this.from, index: i, data:this.filterData, len: this.$refs.tag.length-1})
    },
    showLv2Fun (index) {
      this.$emit("showLv2", {from: this.from, index: index})
    }
  },
  computed: {

  },
  beforeMount () {
    this.value = this.filterData.map((v)=>{
      let arr = []
      for (var i=0; i<v.groups.length; i++) {
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
      handler(newV, oldV) {
        this.value = newV.map((v)=>{
          let arr = []
          for (var i=0; i<v.groups.length; i++) {
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