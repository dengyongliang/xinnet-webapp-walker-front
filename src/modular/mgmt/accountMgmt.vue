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
      <Table :columns="columns" :data="clientList" :loading="loadingTable"></Table>
      <!-- 翻页区 -->
      Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      value: '',
      colllapseValue: '',
      loadingBtn: false,
      columns: [
        {
          title: '姓名',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '角色',
          key: 'name',
          className: 'col2'
        },
        {
          title: '所属公司',
          key: 'name',
          className: 'col3'
        },
        {
          title: '状态',
          key: 'name',
          className: 'col4'
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
      clientList: [],
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
