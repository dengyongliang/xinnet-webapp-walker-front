<template lang="pug">
.contRoles
  <!-- 标题区 -->
  h1.pageTitle.clear 角色管理
    .tR
      Button(@click="") + 新建角色
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
export default {
  components: {
  },
  data () {
    return {
      loadingBtn: false,
      columns: [
        {
          title: '角色名称',
          key: 'roleName',
          className: 'col1'
        },
        {
          title: '人数',
          key: 'userCount',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.list[params.index].userCount + ' 人')
            ])
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {

                  }
                }
              }, '修改权限'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {

                  }
                }
              }, '删除角色')
            ])
          }
        }
      ],
      list: [],
      loadingTable: true,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryRoleList(this.queryParam({pageNum:curPage}))
    },
    queryParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingTable = true
      let vm = this
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20
        },
        callback: function(response){
          vm.loadingTable = false
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
      queryRoleList: types.QUERY_ROLE_LIST
    })
  },
  computed: {
  },
  beforeMount () {
    this.queryRoleList(this.queryParam({pageNum:1}))
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
