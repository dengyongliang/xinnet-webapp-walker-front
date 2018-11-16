<template lang="pug">
.contRoles
  <!-- 标题区 -->
  h1.pageTitle.clear 角色管理
    .tR
      Button(@click="") + 新建角色
  .secMain
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
      loadingBtn: false,
      columns: [
        {
          title: '角色名称',
          key: 'createTime',
          className: 'col1'
        },
        {
          title: '人数',
          key: 'name',
          className: 'col2'
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
      }
    }
  },
  methods: {
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
