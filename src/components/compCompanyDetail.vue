<template lang="pug">
.compCompanyCreate
  Tabs(v-model="value",:animated="false")
    TabPane.tabPane1(label="基本资料",name="name1",)
      comp-company-detail-info(@getBaseInfo="baseInfo", :detailData="detailData")
    TabPane.tabPane2(label="分组管理",name="name2",)
      comp-company-detail-group(:detailData="detailData", :groupData="groupData")
</template>

<script>
import compCompanyDetailInfo from './compCompanyDetailInfo'
import compCompanyDetailGroup from './compCompanyDetailGroup'
export default {
  components: {
    compCompanyDetailInfo,
    compCompanyDetailGroup
  },
  props: {
    refresh: {
      type: Boolean,
      default: false
    },
    orgFile: {
      type: String,
      default: ''
    },
    detailData: {
      type: Object,
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
      loadingBtn: false,
      baseInfoData: {},
      groupData: []
    }
  },
  methods: {
    baseInfo (obj) {
      this.$emit('resetDetailData', obj)
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    this.value = this.detailData.tabIdx
    this.groupData = this.detailData.groups.map((v) => {
      v.status = 'view'
      return v
    })
  },
  watch: {
  }
}
</script>
<style scoped>

</style>
