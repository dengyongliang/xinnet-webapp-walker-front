<template lang="pug">
.contRoles
  <!-- 标题区 -->
  h1.pageTitle.clear 角色管理
    .tR
      Button(@click="showDrawerRole({type:'new'})") + 新建角色
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 权限 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerRolesSet", @on-close="", :title="drawerT", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-roles-set(
      @refreshData="searchListData",
      v-if="refresh",
      :on-close="closeDrawer",
      :roleData = 'rolesData'
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compRolesSet from '@/components/compRolesSet'
export default {
  components: {
    compRolesSet
  },
  data () {
    return {
      refresh: false,
      loadingBtn: false,
      drawerRolesSet: false,
      rolesData: {},
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
                    this.showDrawerRole({
                      type: 'modify',
                      roleName: this.list[params.index].roleName,
                      roleId: this.list[params.index].id,
                    })
                  }
                }
              }, '修改权限'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.showDelRole(this.list[params.index].id)
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
      },
      drawerT: ''
    }
  },
  methods: {
    searchListData () {
      this.drawerRolesSet = false
      this.queryRoleList(this.queryParam({pageNum:1}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryRoleList(this.queryParam({pageNum:curPage}))
    },
    showDelRole (roleId) {
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否要删除此角色！</p>',
        loading: true,
        onOk: () => {
          let vm = this
          let params = {
            param: {
              roleId: roleId
            },
            callback: function (response) {
              vm.$Modal.remove()
              if( response.data.code === '1000' ){
                vm.$Message.success('删除成功')
                // 删除成功，重新加载用户列表数据
                vm.page.pageNo = 1
                vm.loadingTable = true
                vm.searchListData()
              } else {
                if (response.data.code === '100') {
                  vm.$Message.error('角色下有用户，不可删除')
                } else if (response.data.code === '200') {
                  vm.$Message.error('角色不存在')
                } else {
                  vm.$Message.error('删除失败')
                }
              }
            }
          }
          this.roleDelete(params)
        },
        onCancel: () => {
        }
      })
    },
    showDrawerRole (paramObj) {
      if (paramObj.type === 'new') {
        this.drawerT = '新建角色'
        paramObj.roleName = ''
        paramObj.roleId = ''
      } else {
        this.drawerT = '修改角色'
      }
      let vm = this
      let params = {
        param: {
        },
        callback: function (response) {
          let obj = {
            type: paramObj.type,
            roleName: paramObj.roleName,
            roleId: paramObj.roleId,
            list: vm.GLOBALS.CONVERT_TREE(response.data.data,
              {
                title: 'id',
                label: 'menuName',
                children: 'subMenus',
                checked: 'checked'
              }
            )
          }
          vm.rolesData = obj
          vm.drawerRolesSet = true
        }
      }
      if (paramObj.roleId) {
        params.param.roleId = paramObj.roleId
      }
      console.log(params.param)
      this.queryRoleMenus(params)
    },
    drawerChange () {
      if (this.drawerRolesSet) {
        this.refresh = true
      } else {
        this.refresh = false
        this.rolesData = {}
      }
    },
    closeDrawer () {
      this.drawerRolesSet = false
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
      queryRoleList: types.QUERY_ROLE_LIST,
      queryRoleMenus: types.QUERY_ROLE_MENUS,
      roleDelete: types.ROLE_DELETE,
    })
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
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
