<template lang="pug">
.contAccountMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 账号管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="姓名/用户名/手机/邮箱",name="",ref="",v-model.trim="value")
      Button(type="primary", @click="",:loading="loadingBtn") 查询
      Button(@click="") + 添加员工
  .secMain.clear
    .filter
      Collapse(v-model="colllapseValue")
        Panel(name="1") 按公司筛选
          div(slot="content")
            Tree(:data="data1", show-checkbox, ref="Tree")
        Panel(name="2") 按域名管理权限筛选
          div(slot="content")
            Tree(:data="data2", show-checkbox)
      button(@click='getCheckedNodes') 获取被选中的节点
      button(@click="getSelectedNodes") 获取被勾选的节点
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
      <!-- 翻页区 -->
      Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 添加员工 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerAddStaff", title="添加员工", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-account-add-staff(
      v-if="refresh",
      :on-close="closeDrawer"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compAccountAddStaff from '@/components/compAccountAddStaff'
export default {
  components: {
    compAccountAddStaff
  },
  data () {
    return {
      refresh: true,
      value: '',
      colllapseValue: '',
      loadingBtn: false,
      drawerAddStaff: true,
      columns: [
        {
          title: '姓名',
          key: 'userName',
          className: 'col1'
        },
        {
          title: '角色',
          key: 'roleName',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.list[params.index].roles[0].roleName)
            ])
          }
        },
        {
          title: '所属公司',
          key: 'companyName',
          className: 'col3'
        },
        {
          title: '状态',
          key: 'status',
          className: 'col4',
          render: (h, params) => {
            if (this.list[params.index].status === 1) {
              return h('div', [
                h('span', {}, '已激活')
              ])
            }
            if (this.list[params.index].status === 2) {
              return h('div', [
                h('span', {}, '未激活')
              ])
            }
            if (this.list[params.index].status === 3) {
              return h('div', [
                h('span', {}, '已停用')
              ])
            }
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
      loadingTable: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      data1: [
          {
              title: 'parent 1',
              expand: true,
              children: [
                  {
                      title: 'parent 1-1',
                      expand: true,
                      children: [
                          {
                              title: 'leaf 1-1-1'
                          },
                          {
                              title: 'leaf 1-1-2'
                          }
                      ]
                  },
                  {
                      title: 'parent 1-2',
                      expand: true,
                      children: [
                          {
                              title: 'leaf 1-2-1'
                          },
                          {
                              title: 'leaf 1-2-1'
                          }
                      ]
                  }
              ]
          }
      ],
      data2: [
          {
              title: 'parent 1',
              expand: true,
              children: [
                  {
                      title: 'parent 1-1',
                      expand: true,
                      children: [
                          {
                              title: 'leaf 1-1-1'
                          },
                          {
                              title: 'leaf 1-1-2'
                          }
                      ]
                  },
                  {
                      title: 'parent 1-2',
                      expand: true,
                      children: [
                          {
                              title: 'leaf 1-2-1'
                          },
                          {
                              title: 'leaf 1-2-1'
                          }
                      ]
                  }
              ]
          }
      ]
    }
  },
  methods: {
    pageChange () {
    },
    getCheckedNodes(){
      console.log(this.$refs.Tree.getCheckedNodes());
    },
    getSelectedNodes(){
      console.log(this.$refs.Tree.getSelectedNodes());
    },
    closeDrawer () {

    },
    drawerChange () {

    },
    queryParam (obj) {
      this.page.pageNo = obj.pageNum
      let vm = this
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20
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
      queryUserList: types.QUERY_USER_LIST
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
    this.queryUserList(this.queryParam({pageNum:1}))
  },
  watch: {
  }
}
</script>

<style scoped>
.contAccountMgmt .secMain{
  background:none;
}
.contAccountMgmt .filter{
  float:left;
  width:220px;
  background:#fff;
  margin-right:20px;
}

.contAccountMgmt .secTable{
  overflow:hidden;
  background:none;
}
.contAccountMgmt .ivu-page{
  padding-top:20px;
}
</style>
