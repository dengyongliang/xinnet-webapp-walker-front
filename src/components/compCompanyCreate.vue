<template lang="pug">
.compCompanyCreate
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1",)
      comp-company-create-info(@getBaseInfo="baseInfo")
    TabPane.tabPane2(label="分组管理",name="name2",:disabled="tabDisabled")
      comp-company-create-group(:baseInfoData="baseInfoData")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compCompanyCreateInfo from './compCompanyCreateInfo'
import compCompanyCreateGroup from './compCompanyCreateGroup'
export default {
  components: {
    compCompanyCreateInfo,
    compCompanyCreateGroup
  },
  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      loadingBtn: false,
      tabDisabled: true,
      baseInfoData: {}
    }
  },
  methods: {
    baseInfo (obj) {
      this.tabDisabled = false
      this.value = 'name2'
      this.baseInfoData = obj
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped>

</style>
