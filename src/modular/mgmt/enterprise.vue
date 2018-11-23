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
    comp-list-style1(:list="list")

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compListStyle1 from '@/components/compListStyle1'
export default {
  components: {
    compListStyle1
  },
  data () {
    return {
      value: '',
      loadingBtn: false,
      list: [],
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

    },
    queryParam (obj) {
      this.page.pageNo = obj.pageNum
      let vm = this
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          companyName: this.value
        },
        callback: function(response){
          if (response.data.code === '1000'){
            vm.list = response.data.data.list
            vm.page.pageItems = response.data.data.totalNum
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
  },
  beforeMount () {
    this.queryCompanyList(this.queryParam({pageNum:1}))
  },
  watch: {
  }
}
</script>

<style scoped>
.contEnterprise .secMain{
  background:none;
}
.contEnterprise .ivu-page{
  text-align:center;
  margin:0 20px 20px 20px;
}
</style>
