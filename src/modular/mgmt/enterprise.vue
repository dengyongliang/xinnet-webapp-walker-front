<template lang="pug">
.contEnterprise
  <!-- 标题区 -->
  h1.pageTitle.clear 企业管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="企业名称",name="",ref="",v-model.trim="value")
      Button(type="primary", @click="",:loading="loadingBtn") 查询
      Button(@click="drawerCompanyCreate=true") + 添加企业
  .secMain
    <!-- 列表主体 -->
    comp-list-style1(:list="list")

  <!-- 创建企业 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerCompanyCreate", title="创建企业", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-company-create(
      v-if="refresh",
      :on-close="closeDrawer",
      :orgFile = "orgFile"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
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
      orgFile:'http://183.84.10.181/walker/customer/e59202b3-2dcb-4f14-bab9-db914400eaac.jpg',
    }
  },
  methods: {
    searchListData () {
      this.queryCompanyList(this.queryParam())
    },
    closeDrawer () {
      this.drawerCompanyCreate = false
    },
    drawerChange () {
      if (this.drawerCompanyCreate) {
        this.refresh = true
      } else {
        this.refresh = false
        this.searchListData()
      }
    },
    queryParam () {
      let vm = this
      let params = {
        param: {
          companyName: this.value
        },
        callback: function(response){
          if (response.data.code === '1000'){
            vm.list = response.data.data
          } else {
            if (response.data.code === '900') {
              vm.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    ...mapActions({
      queryCompanyList: types.QUERY_COMPANY_LIST
    })
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
    this.queryCompanyList(this.queryParam())
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
