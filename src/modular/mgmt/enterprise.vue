<template lang="pug">
.contEnterprise
  <!-- 标题区 -->
  h1.pageTitle.clear 企业管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="企业名称",name="",ref="",v-model.trim="value")
      Button(type="primary", @click="",:loading="loadingBtn") 查询
      Button(@click="") + 添加企业
  .secMain
    <!-- 列表主体 -->
    comp-list-style1

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

</template>

<script>
import compListStyle1 from '@/components/compListStyle1'
export default {
  components: {
    compListStyle1
  },
  data () {
    return {
      value: '',
      loadingBtn: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchUserData () {

    },
    pageChange: function (curPage) {

    },
    drawerChange () {

    }
  },
  computed: {
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
