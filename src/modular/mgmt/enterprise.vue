<template lang="pug">
.contEnterprise
  <!-- 标题区 -->
  h1.pageTitle.clear 企业管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="企业名称",name="",ref="",v-model.trim="value")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
      Button(@click="drawerCompanyCreate=true") + 添加企业
  .secMain
    <!-- 列表主体 -->
    comp-list-style1(:list="list", @refreshData="searchListData")

  <!-- 创建企业 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerCompanyCreate", title="创建企业", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-company-create(
      v-if="drawerCompanyCreate",
      :on-close="closeDrawer",
      :orgFile = "orgFile"
    )

</template>

<script>
import { mapState } from 'vuex'
import compListStyle1 from '@/components/compListStyle1'
import compCompanyCreate from '@/components/compCompanyCreate'
export default {
  components: {
    compListStyle1,
    compCompanyCreate
  },
  data () {
    return {
      value: '',
      refresh: false,
      loadingBtn: false,
      drawerCompanyCreate: false,
      list: [],
      orgFile: ''
    }
  },
  methods: {
    searchListData () {
      this.queryList()
    },
    closeDrawer () {
      this.drawerCompanyCreate = false
    },
    drawerChange () {
      if (!this.drawerCompanyCreate) {
        this.searchListData()
      }
    },
    queryList () {
      this.$store.dispatch('COMPANY_LIST', {companyName: this.value}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.list = response.data.data
        } else {
          this.$Message.error('查询失败')
        }
      }).catch(() => {})
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
    this.queryList()
  },
  watch: {
  }
}
</script>

<style scoped>
.contEnterprise .secMain{
  background:none;
}
</style>
